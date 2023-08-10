import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsChatSquareTextFill, BsFillHeartFill, BsFillBellFill, BsFillPersonFill } from 'react-icons/bs';
import { IoLogOut } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AuthContext, ContextType } from '../../contexts/AuthProvider';
import axiosClient from '../../AxiosClient';
import Error from '../../components/error/Error';

import styles from './header.module.css';

interface Props {
    isAuthorized: boolean;
}

const Header = ({ isAuthorized }: Props) => {
    const navigate = useNavigate();
    const { setIsAuthorized } = useContext<ContextType>(AuthContext)
    const [error, setError] = useState<string | null>(null);
    const [isNavActive, setIsNavActive] = useState<boolean>(false);


    function toggleNotifications(): void {

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
                                <button title='Powiadomienia' onClick={toggleNotifications} className={styles.header__button}>
                                    <BsFillBellFill className={styles.header__icon} />
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
                                <button aria-label='powiadomienia' onClick={toggleNotifications} className={styles.header__button}>
                                    <BsFillBellFill className={styles.header__icon} />
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
        </>
    )
}

export default Header
