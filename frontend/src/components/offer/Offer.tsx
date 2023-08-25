import { useState, useEffect, useContext } from 'react';
import offerDateFormat from '../../utilities/offerDateFormat';
import { AuthContext, ContextType } from '../../contexts/AuthProvider';
import Error from '../error/Error';
import axiosClient from '../../AxiosClient';
import axios from 'axios';
import { IoLocationSharp } from 'react-icons/io5';
import { AiOutlineHeart, AiFillHeart, AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { useNavigate, Link } from 'react-router-dom';
import Popup from '../popup/Popup';


import styles from './offer.module.css';

interface Props {
    id: number;
    category_id: number;
    location_id: number;
    thumbnail: string;
    title: string;
    price: number;
    available: number;
    created_at: string;
    variant: 'standard' | 'myOffers' | 'toReturn';
}

const Offer = (props: Props) => {
    const navigate = useNavigate();
    const { isAuthorized } = useContext<ContextType>(AuthContext);
    const [showComponent, setShowComponent] = useState<boolean>(true);
    const [wasDeleted, setWasDeleted] = useState<boolean>(false);
    const [category, setCategory] = useState<string | null>(null);
    const [location, setLocation] = useState<string | null>(null);
    const [isLiked, setIsLiked] = useState<boolean | null>(null);
    const [isPending, setIsPending] = useState<boolean | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [notification, setNotification] = useState<string | null>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: `/category/${props.category_id}`,
            cancelToken: source.token
        })
            .then(res => {
                setCategory(res.data.name);
                axiosClient({
                    method: 'get',
                    url: `/location/${props.location_id}`,
                    cancelToken: source.token
                })
                    .then(res => {
                        setLocation(res.data.city);
                        if (isAuthorized) {
                            axiosClient({
                                method: 'get',
                                url: `/is-liked/${props.id}`,
                                cancelToken: source.token
                            })
                                .then(res => {
                                    setIsLiked(res.data.isLiked);
                                    if (props.variant === 'toReturn') {
                                        axiosClient({
                                            method: 'get',
                                            url: `/rental-status/${props.id}`,
                                            cancelToken: source.token
                                        })
                                            .then(res => {
                                                if (res.data === 'pending') {
                                                    setIsPending(true);
                                                }
                                                else {
                                                    setIsPending(false);
                                                }
                                            })
                                            .catch(err => setError('Coś poszło nie tak, spróbuj ponownie później...'));
                                    }
                                })
                                .catch(err => {
                                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                                })
                                .finally(() => setIsLoading(false));
                        }
                        else {
                            setIsLoading(false);
                        }
                    })
                    .catch(err => {
                        setError('Coś poszło nie tak, spróbuj ponownie później...');
                        if (!isAuthorized) {
                            setIsLoading(false);
                        }
                    });

            })
            .catch(err => setError('Coś poszło nie tak, spróbuj ponownie później...'));


        return () => {
            source.cancel();
        }
    }, []);

    function toggleLike(): void {
        if (isAuthorized) {
            axiosClient({
                method: 'post',
                url: `/toggle-like/${props.id}`
            })
                .then(res => {
                    if (res.status === 200) {
                        setIsLiked(false);
                        setNotification(res.data.message);
                        setTimeout(() => setNotification(null), 4000);
                    }
                    else if (res.status === 201) {
                        setIsLiked(true);
                        setNotification('Dodano do obserwowanych');
                        setTimeout(() => setNotification(null), 4000);
                    }
                })
                .catch(err => {
                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                });
        }
        else {
            navigate('/logowanie');
        }
    }

    function deleteOffer(): void {
        const confirmation = window.confirm('Czy na pewno chcesz usunąć ofertę? Jest to nie odwracalne!');

        if (confirmation) {
            axiosClient({
                method: 'delete',
                url: `/offers/${props.id}`
            })
                .then(res => {
                    setWasDeleted(true);
                    setTimeout(() => setShowComponent(false), 300);
                })
                .catch(err => setError('Coś poszło nie tak, spróbuj ponownie później...'))
        }
    }

    function returnProduct(): void {
        axiosClient({
            method: 'post',
            url: `/return-product/${props.id}`
        })
            .then(res => {
                setIsPending(true);
            })
            .catch(err => setError('Coś poszło nie tak, spróbuj ponownie później...'));
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <>
            {showComponent &&
                <article className={`${styles.offer} ${wasDeleted && styles.offer_deleted}`}>
                    {
                        !isLoading &&
                        <>
                            <div className={styles.offer__leftContainer}>
                                <div className={styles.offer__left}>
                                    <Link to={`/oferta/${props.id}`}>
                                        <img className={styles.offer__img} src={`${process.env.REACT_APP_API_URL}/storage/offers/${props.thumbnail}`} alt="miniatura oferty" />
                                    </Link>
                                    <p className={styles.offer__category}>{category}</p>
                                </div>
                                <div className={styles.offer__middle}>
                                    <h3 className={styles.offer__title}><Link style={{ textDecoration: 'none' }} to={`/oferta/${props.id}`}>{props.title}</Link></h3>
                                    <p className={styles.offer__price}>{props.price}zł/doba</p>
                                    <p className={styles.offer__location}><IoLocationSharp className={styles.offer__location__icon} /> {location}</p>
                                    <p className={styles.offer__date}>{offerDateFormat(props.created_at)}</p>
                                </div>
                            </div>
                            {
                                props.variant === 'standard' &&
                                <div className={styles.offer__right_home}>
                                    <button title={isLiked ? 'Usuń z obserwowanych' : 'Dodaj do obserwowanych'} onClick={toggleLike} className={styles.offer__like}>
                                        {
                                            !isAuthorized ? <AiOutlineHeart /> :
                                                isLiked ? <AiFillHeart /> : <AiOutlineHeart />
                                        }
                                    </button>
                                    {
                                        !props.available && <p className={styles.offer__unavailable}>Aktualnie zajęte</p>
                                    }
                                </div>
                            }
                            {
                                props.variant === 'myOffers' &&
                                <div className={styles.offer__right_myOffers}>
                                    <Link to={`/edytuj/${props.id}`} title='Edytuj ofertę' className={styles.offer__myOffersButton}>
                                        <AiFillEdit className={styles.offer__edit} />
                                    </Link>
                                    <button onClick={deleteOffer} title='Usuń ofertę' className={styles.offer__myOffersButton}>
                                        <AiFillDelete className={styles.offer__delete} />
                                    </button>
                                </div>
                            }
                            {
                                props.variant === 'toReturn' &&
                                <div className={styles.offer__right_toReturn}>
                                    <button onClick={returnProduct} disabled={(isPending !== null && isPending === true) && true} aria-disabled={(isPending !== null && isPending === true) && true} className={`${styles.offer__returnButton} ${(isPending !== null && isPending === true) && styles.offer__returnButton_pending}`}>{(isPending !== null && isPending === true) ? 'Oczekuje na potwierdzenie' : 'Oddaj'}</button>
                                </div>
                            }
                            <Popup type='good' active={notification ? true : false}>{notification}</Popup>
                        </>
                    }
                </article>
            }
        </>
    )
}

export default Offer;
