import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsChatSquareTextFill, BsFillHeartFill, BsFillBellFill, BsFillPersonFill } from 'react-icons/bs';
import { IoLogOut } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AuthContext, ContextType } from '../../contexts/AuthProvider';
import Error from '../../components/error/Error';
import axiosClient from '../../AxiosClient';
import axios from 'axios';
import styles from './header.module.css';
import offerDateFormat from '../../utilities/offerDateFormat';


interface Props {
    isAuthorized: boolean;
}

interface Notification {
    content: string;
    link: string | null;
    seen: number;
    user_id: number;
    created_at: string;
}

const Header = ({ isAuthorized }: Props) => {
    const navigate = useNavigate();
    const { setIsAuthorized } = useContext<ContextType>(AuthContext)
    const [error, setError] = useState<string | null>(null);
    const [isNavActive, setIsNavActive] = useState<boolean>(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [areNotificationsActive, setAreNotificationsActive] = useState<boolean>(false);
    const [notificationsNotSeen, setNotificationsNotSeen] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (isAuthorized) {
            const source = axios.CancelToken.source();

            axiosClient({
                method: 'get',
                url: '/me',
                cancelToken: source.token
            })
                .then(res => {
                    const channel = window.Echo.channel(`notifications.${res.data.id}`);
                    channel.listen('NotificationEvent', (notification: Notification) => {
                        setNotificationsNotSeen(prev => prev! + 1);
                        setNotifications(prev => {
                            return [notification, ...prev!];
                        })
                    });
                    axiosClient({
                        method: 'get',
                        url: '/my-notifications',
                        cancelToken: source.token
                    })
                        .then(res => {
                            setNotifications(res.data);
                            axiosClient({
                                method: 'get',
                                url: '/notifications-not-seen',
                                cancelToken: source.token
                            })
                                .then(res => {
                                    setNotificationsNotSeen(res.data.number);
                                })
                                .catch(err => setError('Coś poszło nie tak, spróbuj ponownie później...'));
                        })
                        .catch(err => setError('Coś poszło nie tak, spróbuj ponownie później...'));

                    return () => {
                        channel.stopListening('NotificationEvent');
                    }
                })
                .catch(err => setError('Coś poszło nie tak, spróbuj ponownie później...'));

            return () => {
                source.cancel();
            }
        }
    }, []);

    function notificationsOff(): void {
        setAreNotificationsActive(false);
        axiosClient({
            method: 'post',
            url: '/set-notifications-to-seen'
        })
            .then(res => {
                setNotificationsNotSeen(0);
                setNotifications(prev => {
                    const newNotifications = prev.map(notification => {
                        return { ...notification, seen: 1 };
                    })
                    return newNotifications;
                });
            })
            .catch(err => setError('Coś poszło nie tak, spróbuj ponownie później...'));
    }

    function logout(): void {
        axiosClient({
            method: 'post',
            url: '/logout'
        })
            .then(res => {
                localStorage.removeItem('token');
                setIsAuthorized(false);
                navigate('/logowanie');
            })
            .catch(err => {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            })
    }

    function navOff(): void {
        setIsNavActive(false);
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <>
            <header className={styles.header}>
                <Link to='/'><img className={styles.header__logo} src="img/favicon.png" alt="logo firmy" /></Link>
                <nav className={styles.header__right}>
                    {
                        isAuthorized ?
                            <>
                                <Link title='Wiadomości' to='/wiadomosci'>
                                    <BsChatSquareTextFill className={styles.header__icon} />
                                </Link>
                                <Link title='Obserwowane' to='/obserwowane'>
                                    <BsFillHeartFill className={styles.header__icon} />
                                </Link>
                                <button title='Powiadomienia' onClick={() => setAreNotificationsActive(true)} className={styles.header__button}>
                                    <BsFillBellFill className={styles.header__icon} />
                                    {
                                        notificationsNotSeen !== null &&
                                        notificationsNotSeen! > 0 &&
                                        <div className={styles.header__button__notificationCount}>{notificationsNotSeen}</div>
                                    }
                                </button>
                                <Link title='Konto' to='/konto'>
                                    <BsFillPersonFill className={styles.header__icon} />
                                </Link>
                                <button title='Wyloguj' onClick={logout} className={styles.header__button}>
                                    <IoLogOut className={styles.header__icon} />
                                </button>
                                <Link className={styles.header__rectangle} to='/utworz'>Dodaj ogłoszenie</Link>
                            </>
                            :
                            <>
                                <Link className={styles.header__rectangle} to='/logowanie'>Zaloguj się</Link>
                                <Link className={styles.header__rectangle} to='/rejestracja'>Załóż konto</Link>
                            </>
                    }
                </nav>
            </header>
            <header className={styles.headerMobile}>
                <div className={styles.headerMobile__top}>
                    <Link onClick={navOff} to='/'><img className={styles.header__logo} src="img/favicon.png" alt="logo firmy" /></Link>
                    <button onClick={() => setIsNavActive(prev => !prev)} className={styles.headerMobile__hamburger}>
                        {isNavActive ? <IoMdClose /> : <GiHamburgerMenu />}
                    </button>
                </div>
                <nav className={`${styles.headerMobile__nav} ${isNavActive && styles.headerMobile__nav_active}`}>
                    {
                        isAuthorized ?
                            <>
                                <Link onClick={navOff} aria-label='wiadomości' to='/wiadomosci'>
                                    <BsChatSquareTextFill className={styles.header__icon} />
                                </Link>
                                <Link onClick={navOff} aria-label='obserwowane' to='/obserwowane'>
                                    <BsFillHeartFill className={styles.header__icon} />
                                </Link>
                                <button aria-label='powiadomienia' onClick={() => setAreNotificationsActive(true)} className={styles.header__button}>
                                    <BsFillBellFill className={styles.header__icon} />
                                    {
                                        notificationsNotSeen !== null &&
                                        notificationsNotSeen! > 0 &&
                                        <div className={styles.header__button__notificationCount}>{notificationsNotSeen}</div>
                                    }
                                </button>
                                <Link onClick={navOff} aria-label='konto' to='/konto'>
                                    <BsFillPersonFill className={styles.header__icon} />
                                </Link>
                                <button aria-label='wyloguj' onClick={logout} className={styles.header__button}>
                                    <IoLogOut className={styles.header__icon} />
                                </button>
                                <Link onClick={navOff} className={styles.header__rectangle} to='/utworz'>Dodaj ogłoszenie</Link>
                            </>
                            :
                            <>
                                <Link onClick={navOff} className={styles.header__rectangle} to='/logowanie'>Zaloguj się</Link>
                                <Link onClick={navOff} className={styles.header__rectangle} to='/rejestracja'>Załóż konto</Link>
                            </>
                    }
                </nav>
            </header>
            {
                areNotificationsActive &&
                <>
                    <div className={styles.header__notifications}>
                        {
                            notifications.length > 0 &&
                            <>
                                {notifications.map((notification, index) => {
                                    return <p key={index} className={`${styles.header__notification} ${!notification.seen && styles.header__notification_new}`}>
                                        {
                                            notification.link ?
                                                <Link onClick={notificationsOff} className={styles.header__notification__link} to={notification.link}>{notification.content}</Link>
                                                :
                                                <span>{notification.content}</span>
                                        }
                                        <span>{offerDateFormat(notification.created_at)}</span>
                                    </p>
                                })}
                            </>
                        }
                    </div>
                    <div onClick={notificationsOff} className={styles.overlay}></div>
                </>
            }
        </>
    )
}

export default Header
