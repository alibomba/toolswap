import { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext, ContextType } from '../../contexts/AuthProvider';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../AxiosClient';
import axios from 'axios';
import Loading from '../../components/loading/Loading';
import Error from '../../components/error/Error';
import Offer from '../../components/offer/Offer';
import Stars from '../../components/stars/Stars';
import Pagination from '../../components/pagination/Pagination';
import Popup from '../../components/popup/Popup';
import styles from './profile.module.css';
import userJoinedDateFormat from '../../utilities/userJoinedDateFormat';

interface User {
    id: number;
    nickname: string;
    phone_number: string;
    location_id: string;
    profile_picture: string | null;
    email: string;
    created_at: string;
    updated_at: string;
}

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
    created_at: string;
    updated_at: string;
}

interface Link {
    url: string | null;
    label: string;
    active: boolean;
}

interface Response {
    current_page: number;
    data: Offer[];
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
}

interface Location {
    id: number;
    voivodeship: string;
    city: string;
    latitude: number;
    longitude: number;
    created_at: string;
    updated_at: string;
}


const Profile = () => {
    const { id } = useParams();
    const { isAuthorized, isLoading } = useContext<ContextType>(AuthContext);
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [offers, setOffers] = useState<Response | null>(null);
    const [location, setLocation] = useState<Location | null>(null);
    const [averageStars, setAverageStars] = useState<number | null>(null);
    const [isProfileMine, setIsProfileMine] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [isPageLoading, setIsPageLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [popupBad, setPopupBad] = useState<string | null>(null);
    const isMounted = useRef<boolean>(false);

    useEffect(() => {
        if (id) {
            const source = axios.CancelToken.source();
            isMounted.current = true;

            axiosClient({
                method: 'get',
                url: `/user/${id}`,
                cancelToken: source.token
            })
                .then(res => {
                    const userRes: User = res.data;
                    setUser(userRes);
                    axiosClient({
                        method: 'get',
                        url: `/location/${userRes.location_id}`,
                        cancelToken: source.token
                    })
                        .then(res => {
                            setLocation(res.data);
                            axiosClient({
                                method: 'get',
                                url: `/user-offers/${id}`,
                                cancelToken: source.token
                            })
                                .then(res => {
                                    setOffers(res.data);
                                    axiosClient({
                                        method: 'get',
                                        url: `/average-stars-user/${id}`,
                                        cancelToken: source.token
                                    })
                                        .then(res => {
                                            setAverageStars(res.data.average);
                                            if (isAuthorized) {
                                                axiosClient({
                                                    method: 'get',
                                                    url: `/is-profile-mine/${id}`,
                                                    cancelToken: source.token
                                                })
                                                    .then(res => {
                                                        setIsProfileMine(res.data.isMine);
                                                    })
                                                    .catch(err => setError('Coś poszło nie tak, spróbuj ponownie później...'))
                                                    .finally(() => setIsPageLoading(false));
                                            }
                                        })
                                        .catch(err => {
                                            if (err?.response?.status === 400) {
                                                setAverageStars(0);
                                                if (isAuthorized) {
                                                    axiosClient({
                                                        method: 'get',
                                                        url: `/is-profile-mine/${id}`,
                                                        cancelToken: source.token
                                                    })
                                                        .then(res => {
                                                            setIsProfileMine(res.data.isMine);
                                                        })
                                                        .catch(err => setError('Coś poszło nie tak, spróbuj ponownie później...'))
                                                        .finally(() => setIsPageLoading(false));
                                                }
                                            }
                                            else {
                                                setError('Coś poszło nie tak, spróbuj ponownie później...');
                                            }
                                        })
                                        .finally(() => {
                                            if (!isAuthorized) {
                                                setIsPageLoading(false);
                                            }
                                        });

                                })
                                .catch(err => setError('Coś poszło nie tak, spróbuj ponownie później...'));

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
                })

            return () => {
                source.cancel();
            }
        }
        else {
            navigate('/404');
        }
    }, []);

    useEffect(() => {
        if (isMounted.current && id) {
            const source = axios.CancelToken.source();

            axiosClient({
                method: 'get',
                url: `/user-offers/${id}?page=${page}`,
                cancelToken: source.token
            })
                .then(res => {
                    setOffers(res.data);
                })
                .catch(err => {
                    if (err?.response?.status === 404) {
                        navigate('/404');
                    }
                    else {
                        setError('Coś poszło nie tak, spróbuj ponownie później...');
                    }
                })

            return () => {
                source.cancel();
            }
        }
    }, [page]);

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


    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <>
            {
                (isLoading || isPageLoading) ? <Loading /> :
                    <main className={styles.main}>
                        <header className={styles.main__header}>
                            <div className={styles.header__top}>
                                <img className={styles.header__img} src={user && user.profile_picture ? `${process.env.REACT_APP_API_URL}/storage/pfp/${user.profile_picture}` : '/img/default-pfp.png'} alt={`profilowe użytkownika ${user!.nickname}`} />
                                <p className={styles.header__name}>{user!.nickname}</p>
                                {
                                    averageStars !== 0 && <Stars size='big' howMany={averageStars!} />
                                }
                            </div>
                            <p className={styles.header__paragraph}><b>Lokalizacja: </b>{location!.city}, {location!.voivodeship}</p>
                            <p className={styles.header__paragraph}><b>Dołączył w: </b>{userJoinedDateFormat(user!.created_at)}</p>
                            <div className={styles.header__buttons}>
                                {
                                    isProfileMine ? <Link className={styles.header__editProfile} to='/konto'>Edytuj profil</Link> :
                                        <>
                                            <a className={styles.header__callButton} href={`tel:${user!.phone_number}`}>Zadzwoń</a>
                                            <button onClick={sendMessage} className={styles.header__messageButton}>Wyślij wiadomość</button>
                                        </>
                                }
                            </div>
                        </header>
                        <main className={styles.main__main}>
                            <h2 className={styles.main__heading}>Ogłoszenia użytkownika</h2>
                            <div className={styles.main__offers}>
                                {
                                    offers!.data.length > 0 ?
                                        offers!.data.map(offer => {
                                            return (
                                                <Offer
                                                    key={offer.id}
                                                    id={offer.id}
                                                    category_id={offer.category_id}
                                                    location_id={offer.location_id}
                                                    thumbnail={offer.thumbnail}
                                                    title={offer.title}
                                                    price={offer.price}
                                                    available={offer.available}
                                                    created_at={offer.created_at}
                                                    variant='standard'
                                                />
                                            )
                                        })
                                        :
                                        <p className='noResults'>Brak ofert</p>
                                }
                            </div>
                            <Pagination
                                last_page={offers?.last_page}
                                setPage={setPage}
                                page={page}
                            />
                        </main>
                        <Popup type='bad' active={popupBad ? true : false}>{popupBad}</Popup>
                    </main>
            }
        </>
    )
}

export default Profile
