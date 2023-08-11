import { useState, FormEvent, useContext } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import Error from '../../components/error/Error';
import axiosClient from '../../AxiosClient';
import { AuthContext, ContextType } from '../../contexts/AuthProvider';

import styles from './login.module.css';
import Loading from '../../components/loading/Loading';

const Login = () => {
    const navigate = useNavigate();
    const { isAuthorized, isLoading, setIsAuthorized } = useContext<ContextType>(AuthContext);
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [loginError, setLoginError] = useState<string | null>(null);

    const passwordVisibilityToggle = (): void => {
        setIsPasswordVisible(prev => !prev);
    }

    function login(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const email = form.querySelector('#email') as HTMLInputElement;
        const password = form.querySelector('#password') as HTMLInputElement;

        axiosClient({
            method: 'post',
            url: '/login',
            data: {
                email: email.value,
                password: password.value
            }
        })
            .then(res => {
                localStorage.setItem('token', res.data.token);
                setIsAuthorized(true);
                navigate('/');
            })
            .catch(err => {
                if (err?.response?.status === 401) {
                    setLoginError('Niepoprawny login lub hasło');
                }
                else {
                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                }
            });
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <>
            {
                isLoading ? <Loading /> :
                    <>
                        {
                            isAuthorized ? <Navigate to='/' /> :
                                <div className={styles.main}>
                                    <img className={styles.img} src="img/favicon.png" alt="logo" />
                                    <h1 className={styles.heading}>Witaj</h1>
                                    <p className={styles.subtitle}>Zacznij wynajmować produkty i zarabiaj</p>
                                    <form onSubmit={login} className={styles.form}>
                                        <div className={styles.form__container}>
                                            <label htmlFor="email" className={styles.form__label}>Email</label>
                                            <input name='email' placeholder='user@example.com' id='email' type="text" className={styles.form__input} />
                                        </div>
                                        <div className={`${styles.form__container} ${styles.form__container_password}`}>
                                            <label htmlFor="password" className={styles.form__label}>Hasło</label>
                                            <input name='password' type={isPasswordVisible ? 'text' : 'password'} className={styles.form__input} id="password" />
                                            {isPasswordVisible ?
                                                <AiFillEye onClick={passwordVisibilityToggle} className={styles.form__container__eye} /> :
                                                <AiFillEyeInvisible onClick={passwordVisibilityToggle} className={styles.form__container__eye} />
                                            }
                                        </div>
                                        <button className={styles.form__button}>Zaloguj</button>
                                        {
                                            loginError && <p className={styles.form__error} role='alert' aria-live='assertive'>{loginError}</p>
                                        }
                                    </form>
                                    <p className={styles.bottomText}>Nie masz jeszcze konta? <Link className={styles.bottomText__link} to='/rejestracja'>Załóż konto</Link></p>
                                    <p className={styles.bottomText}><Link className={styles.bottomText__link} to='/'>Kontynuuj bez konta</Link></p>
                                </div>
                        }
                    </>
            }
        </>
    )
}

export default Login
