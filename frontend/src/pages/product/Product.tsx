import { useState, useEffect, useContext } from 'react';
import { AuthContext, ContextType } from '../../contexts/AuthProvider';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { IoLinkOutline } from 'react-icons/io5';
import { BsFillFlagFill } from 'react-icons/bs';
import Stars from '../../components/stars/Stars';
import Error from '../../components/error/Error';
import Loading from '../../components/loading/Loading';
import axiosClient from '../../AxiosClient';
import axios from 'axios';
import styles from './product.module.css';
import userJoinedDateFormat from '../../utilities/userJoinedDateFormat';
import Popup from '../../components/popup/Popup';
interface Offer {
    id: number;
    user_id: number;
    category_id: number;
    location_id: number;
    thumbnail: string;
    title: string;
    description: string;
    price: number;
    available: number;
    views: number;
    created_at: string;
    updated_at: string;
}

interface User {
    id: number;
    nickname: string;
    phone_number: string;
    location_id: number;
    profile_picture: string;
    email: string;
    created_at: string;
    updated_at: string;
}

interface Location {
    city: string;
    voivodeship: string;
}

interface Response {
    offer: Offer;
    user: User;
    location: Location;
    category: string;
}

const Product = () => {
    const { id } = useParams();
    const { isAuthorized, isLoading } = useContext<ContextType>(AuthContext);
    const navigate = useNavigate();
    const [offer, setOffer] = useState<Offer | undefined>(undefined);
    const [user, setUser] = useState<User | undefined>(undefined);
    const [location, setLocation] = useState<Location | undefined>(undefined);
    const [category, setCategory] = useState<string | undefined>(undefined);
    const [averageStarsOffer, setAverageStarsOffer] = useState<number | undefined>(undefined);
    const [averageStarsUser, setAverageStarsUser] = useState<number | undefined>(undefined);
    const [reviewStarCount, setReviewStarCount] = useState<number>(1);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
    const [isOfferLoading, setIsOfferLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [popup, setPopup] = useState<string | null>(null);
    const [popupBad, setPopupBad] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            const source = axios.CancelToken.source();

            axiosClient({
                method: 'get',
                url: `/offer-data/${id}`,
                cancelToken: source.token
            })
                .then(res => {
                    const response: Response = res.data;
                    setOffer(response.offer);
                    setUser(response.user);
                    setLocation(response.location);
                    setCategory(response.category);
                    axiosClient({
                        method: 'post',
                        url: `/add-view/${id}`,
                        cancelToken: source.token
                    })
                        .then(res => {
                            axiosClient({
                                method: 'get',
                                url: `/average-stars-offer/${id}`,
                                cancelToken: source.token
                            })
                                .then(res => {
                                    setAverageStarsOffer(res.data.average);
                                    axiosClient({
                                        method: 'get',
                                        url: `/average-stars-user/${response.user.id}`,
                                        cancelToken: source.token
                                    })
                                        .then(res => {
                                            setAverageStarsUser(res.data.average);
                                            if (isAuthorized) {
                                                axiosClient({
                                                    method: 'get',
                                                    url: `/is-liked/${id}`,
                                                    cancelToken: source.token
                                                })
                                                    .then(res => {
                                                        setIsLiked(res.data.isLiked);
                                                        axiosClient({
                                                            method: 'get',
                                                            url: `/is-subscribed/${id}`,
                                                            cancelToken: source.token
                                                        })
                                                            .then(res => {
                                                                setIsSubscribed(res.data.isSubscribed);
                                                            })
                                                            .catch(err => setError('Coś poszło nie tak, spróbuj ponownie później...'));

                                                    })
                                                    .catch(err => setError('Coś poszło nie tak, spróbuj ponownie później...'));
                                            }
                                        })
                                        .catch(err => setError('Coś poszło nie tak, spróbuj ponownie później...'))
                                        .finally(() => setIsOfferLoading(false));

                                })
                                .catch(err => setError('Coś poszło nie tak, spróbuj ponownie później...'))
                        })
                        .catch(err => setError('Coś poszło nie tak, spróbuj ponownie później...'));

                })
                .catch(err => {
                    if (err?.response?.status === 404) {
                        navigate('/404');
                    }
                    else {
                        setError('Coś poszło nie tak, spróbuj ponownie później...');
                    }
                });

        }
        else {
            navigate('/404');
        }
    }, []);

    function toggleLike(): void {
        if (isAuthorized) {
            axiosClient({
                method: 'post',
                url: `/toggle-like/${id}`
            })
                .then(res => {
                    if (res.status === 200) {
                        setPopup(res.data.message);
                        setIsLiked(false);
                    }
                    else if (res.status === 201) {
                        setPopup('Dodano do obserwowanych');
                        setIsLiked(true);
                    }
                    setTimeout(() => setPopup(null), 4000);
                })
                .catch(err => setError('Coś poszło nie tak, spróbuj ponownie później...'));

        }
        else {
            navigate('/logowanie');
        }
    }

    function notifyWhenAvailable(): void {
        if (isAuthorized) {
            axiosClient({
                method: 'post',
                url: `/subscribe/${id}`
            })
                .then(res => {
                    setIsSubscribed(true);
                    setPopup('Zostaniesz powiadomiony o dostępności tej oferty');
                    setTimeout(() => setPopup(null), 4000);
                })
                .catch(err => setError('Coś poszło nie tak, spróbuj ponownie później...'));

        }
        else {
            navigate('/logowanie');
        }
    }

    function sendMessage(): void {
        if (isAuthorized) {
            axiosClient({
                method: 'get',
                url: `/has-conversation-with/${user && user.id}`
            })
                .then(res => {
                    if (res.data.hasConversation) {
                        navigate('/wiadomosci');
                    }
                    else {
                        axiosClient({
                            method: 'post',
                            url: `/create-conversation/${user && user.id}`
                        })
                            .then(res => {
                                navigate('/wiadomosci');
                                console.log('wasd');
                            })
                            .catch(err => {
                                if (err?.response?.status === 400) {
                                    setPopupBad(err?.response?.data?.message);
                                    setTimeout(() => setPopupBad(null), 4000);
                                }
                                else {
                                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                                }
                            })
                    }
                })
                .catch(err => setError('Coś poszło nie tak, spróbuj ponownie później...'));

        }
        else {
            navigate('/logowanie');
        }
    }

    function sendReview(): void {
        if (isAuthorized) {
            axiosClient({
                method: 'post',
                url: `/send-review/${id}`,
                data: {
                    stars: reviewStarCount
                }
            })
                .then(res => {
                    setPopup(res.data.message);
                    setTimeout(() => setPopup(null), 4000);
                })
                .catch(err => {
                    if (err?.response?.status === 400) {
                        setPopupBad(err?.response?.data.message);
                        setTimeout(() => setPopupBad(null), 4000);
                    }
                    else {
                        setError('Coś poszło nie tak, spróbuj ponownie później...');
                    }
                });
        }
        else {
            navigate('/logowanie');
        }
    }

    function sendReport(): void {
        if (isAuthorized) {
            axiosClient({
                method: 'post',
                url: `/send-report/${id}`
            })
                .then(res => {
                    setPopup('Wysłano zgłoszenie');
                    setTimeout(() => setPopup(null), 4000);
                })
                .catch(err => {
                    if (err?.response?.status === 400) {
                        setPopupBad(err?.response?.data?.message);
                        setTimeout(() => setPopupBad(null), 4000);
                    }
                    else {
                        setError('Coś poszło nie tak, spróbuj ponownie później...');
                    }
                });

        }
        else {
            navigate('/logowanie');
        }
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <>
            {
                (isOfferLoading || isLoading) ? <Loading /> :
                    <main className={styles.main}>
                        <header className={styles.main__header}>
                            <div className={styles.header__top}>
                                <div className={styles.header__top__right}>
                                    <h1 className={styles.header__title}>{offer && offer.title}</h1>
                                    <Stars size='big' howMany={averageStarsOffer!} />
                                </div>
                                <button onClick={toggleLike} title={isLiked ? 'Usuń z obserwowanych' : 'Dodaj do obserwowanych'} className={styles.header__like}>
                                    {
                                        isLiked ? <AiFillHeart /> : <AiOutlineHeart />
                                    }
                                </button>
                            </div>
                            {
                                offer &&
                                !offer.available &&
                                <div className={styles.header__bottom}>
                                    <p className={styles.header__unavailable}>Zajęte</p>
                                    {
                                        isSubscribed ? <p className={styles.header__unavailable}>Zostaniesz powiadomiony</p> : <button onClick={notifyWhenAvailable} className={styles.header__notifyButton}>Powiadom mnie o dostępności</button>
                                    }
                                </div>
                            }
                            <div className={styles.header__metadata}>
                                <img className={styles.metadata__img} src={offer && offer.thumbnail} alt={offer && `miniatura oferty ${offer.title}`} />
                                <div className={styles.metadata__right}>
                                    <div className={styles.metadata__userInfo}>
                                        <img className={styles.userInfo__img} src={user && user.profile_picture ? `${process.env.REACT_APP_API_URL}/storage/pfp/${user.profile_picture}` : '/img/default-pfp.png'} alt={user && `zdjęcie profilowe użytkownika ${user.nickname}`} />
                                        <div className={styles.userInfo__right}>
                                            <p className={styles.userInfo__name}>{user && user.nickname}</p>
                                            <p className={styles.userInfo__date}>dołączył w: {user && userJoinedDateFormat(user.created_at)}</p>
                                            <Stars size='small' howMany={averageStarsUser!} />
                                        </div>
                                    </div>
                                    <div className={styles.metadata__buttons}>
                                        <a className={styles.metadata__callButton} href={user && `tel:${user.phone_number}`}>Zadzwoń</a>
                                        <button onClick={sendMessage} className={styles.metadata__messageButton}>Wyślij wiadomość</button>
                                    </div>
                                    <Link to={`/profil/${user!.id}`} className={styles.metadata__otherProducts}>
                                        <IoLinkOutline className={styles.metadata__otherProducts__icon} />
                                        <span className={styles.metadata__otherProducts__text}>Inne produkty tej osoby</span>
                                    </Link>
                                </div>
                            </div>
                        </header>
                        <main className={styles.main__main}>
                            <div className={styles.main__left}>
                                <h2 className={styles.main__heading}>{offer && offer.title}</h2>
                                <p className={styles.main__description}>{offer && offer.description}</p>
                            </div>
                            <div className={styles.main__right}>
                                <div className={styles.right__group}>
                                    <p className={styles.right__group__heading}>Cena:</p>
                                    <p className={styles.right__group__text}>{offer && offer.price}zł</p>
                                </div>
                                <div className={styles.right__group}>
                                    <p className={styles.right__group__heading}>Kategoria:</p>
                                    <p className={styles.right__group__text}>{category && category}</p>
                                </div>
                                <div className={styles.right__group}>
                                    <p className={styles.right__group__heading}>Lokalizacja:</p>
                                    <p className={styles.right__group__text}>{location && `${location.city}, ${location.voivodeship}`}</p>
                                </div>
                                <div className={styles.right__group}>
                                    <p className={styles.right__group__heading}>Wystaw opinię:</p>
                                    <Stars size='big' howMany={reviewStarCount} setHowMany={setReviewStarCount} />
                                    <button onClick={sendReview} className={styles.right__group__button}>Potwierdź</button>
                                </div>
                                <button onClick={sendReport} className={styles.main__right__reportButton}><BsFillFlagFill /> Zgłoś</button>
                            </div>
                        </main>
                        <footer className={styles.main__footer}>
                            <p><b>Wyświetlenia: </b>{offer && offer.views !== 0 ? offer.views : 'Brak'}</p>
                        </footer>
                        <Popup type='good' active={popup ? true : false}>{popup}</Popup>
                        <Popup type='bad' active={popupBad ? true : false}>{popupBad}</Popup>
                    </main>
            }
        </>
    )
}

export default Product
