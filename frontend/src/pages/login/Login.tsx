import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

import styles from './login.module.css';

const Login = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    const passwordVisibilityToggle = (): void => {
        setIsPasswordVisible(prev => !prev);
    }

    return (
        <>
            <div className={styles.main}>
                <img className={styles.img} src="img/favicon.png" alt="logo" />
                <h1 className={styles.heading}>Witaj</h1>
                <p className={styles.subtitle}>Zacznij wynajmować produkty i zarabiaj</p>
                <form className={styles.form}>
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
                </form>
                <p className={styles.bottomText}>Nie masz jeszcze konta? <Link className={styles.bottomText__link} to='/rejestracja'>Załóż konto</Link></p>
            </div>
        </>
    )
}

export default Login
