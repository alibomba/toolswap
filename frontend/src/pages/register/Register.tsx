import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

import styles from '../login/login.module.css';

interface State {
    first: boolean;
    second: boolean;
}

const Register = () => {
    const [arePasswordsVisible, setArePasswordsVisible] = useState<State>({
        first: false,
        second: false
    });

    const toggleFirst = (): void => {
        setArePasswordsVisible(prev => {
            return { ...prev, first: !prev.first };
        })
    }

    const toggleSecond = (): void => {
        setArePasswordsVisible(prev => {
            return { ...prev, second: !prev.second };
        })
    }

    return (
        <>
            <div className={styles.main}>
                <img className={styles.img} src="img/favicon.png" alt="logo" />
                <h1 className={styles.heading}>Witaj</h1>
                <p className={styles.subtitle}>Zacznij wynajmować produkty i zarabiaj</p>
                <form className={styles.form}>
                    <div className={styles.form__container}>
                        <label htmlFor="nickname" className={styles.form__label}>Nazwa użytkownika</label>
                        <input name='nickname' placeholder='Imię lub przezwisko' id='nickname' type="text" className={styles.form__input} />
                    </div>
                    <div className={styles.form__container}>
                        <label htmlFor="phone_number" className={styles.form__label}>Nr telefonu</label>
                        <input name='phone_number' placeholder='123 456 789' id='phone_number' type="text" className={styles.form__input} />
                    </div>
                    <div className={styles.form__container}>
                        <label htmlFor="city" className={styles.form__label}>Miasto</label>
                        <input name='city' placeholder='Warszawa' id='city' type="text" className={styles.form__input} />
                    </div>
                    <div className={styles.form__container}>
                        <label htmlFor="email" className={styles.form__label}>Email</label>
                        <input name='email' placeholder='user@example.com' id='email' type="text" className={styles.form__input} />
                    </div>
                    <div className={`${styles.form__container} ${styles.form__container_password}`}>
                        <label htmlFor="password" className={styles.form__label}>Hasło</label>
                        <input name='password' id='password' type={arePasswordsVisible.first ? 'text' : 'password'} className={styles.form__input} />
                        {arePasswordsVisible.first ?
                            <AiFillEye onClick={toggleFirst} className={styles.form__container__eye} /> :
                            <AiFillEyeInvisible onClick={toggleFirst} className={styles.form__container__eye} />
                        }
                    </div>
                    <div className={`${styles.form__container} ${styles.form__container_password}`}>
                        <label htmlFor="password_confirmation" className={styles.form__label}>Powtórz hasło</label>
                        <input name='password_confirmation' id='password_confirmation' type={arePasswordsVisible.second ? 'text' : 'password'} className={styles.form__input} />
                        {arePasswordsVisible.second ?
                            <AiFillEye onClick={toggleSecond} className={styles.form__container__eye} /> :
                            <AiFillEyeInvisible onClick={toggleSecond} className={styles.form__container__eye} />
                        }
                    </div>
                    <button className={styles.form__button}>Zarejestruj się</button>
                </form>
                <p className={styles.bottomText}>Masz już konto? <Link to='/logowanie' className={styles.bottomText__link}>Zaloguj się</Link></p>
            </div>
        </>
    )
}

export default Register
