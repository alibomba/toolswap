import { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import Error from '../../components/error/Error';

import styles from '../login/login.module.css';
import axiosClient from '../../AxiosClient';
import Popup from '../../components/popup/Popup';

interface State {
    first: boolean;
    second: boolean;
}

interface Response {
    city: string;
}

const Register = () => {
    const [arePasswordsVisible, setArePasswordsVisible] = useState<State>({
        first: false,
        second: false
    });

    const [validationError, setValidationError] = useState<string | null>(null);

    const [popup, setPopup] = useState<string | null>(null);

    const [city, setCity] = useState<string>('');

    const [dropdown, setDropdown] = useState<Response[]>([]);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (city) {
            axiosClient({
                method: 'get',
                url: `/location-autocomplete?phrase=${city}`
            })
                .then(res => {
                    setDropdown(res.data);
                })
                .catch(err => {
                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                    console.log(err);
                })
        }
    }, [city]);

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

    const register = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const nicknameInput = form.querySelector('[name="nickname"]') as HTMLInputElement;
        const phoneNumberInput = form.querySelector('[name="phone_number"]') as HTMLInputElement;
        const cityInput = form.querySelector('[name="city"]') as HTMLInputElement;
        const emailInput = form.querySelector('[name="email"]') as HTMLInputElement;
        const passwordInput = form.querySelector('[name="password"]') as HTMLInputElement;
        const passwordConfirmationInput = form.querySelector('[name="password_confirmation"]') as HTMLInputElement;

        // nickname validation
        if (!nicknameInput?.value) {
            setValidationError('Nazwa użytkownika jest wymagana!');
            return;
        }
        if (nicknameInput.value.length > 20) {
            setValidationError('Nazwa użytkownika może mieć maksymalnie 20 znaków!');
            return;
        }

        // phone number validation
        if (!phoneNumberInput?.value) {
            setValidationError('Numer telefonu jest wymagany!');
            return;
        }

        if (phoneNumberInput.value.length > 20) {
            setValidationError('Numer telefonu może mieć maksymalnie 20 znaków!');
            return;
        }

        if (!/^[+0-9][-0-9 ()]*[0-9]$/.test(phoneNumberInput.value)) {
            setValidationError('Podaj poprawny numer telefonu!');
            return;
        }

        // city validation
        if (!cityInput?.value) {
            setValidationError('Miejscowość jest wymagana!');
            return;
        }

        if (cityInput.value.length > 26) {
            setValidationError('Miejscowość może mieć maksymalnie 26 znaków!');
            return;
        }

        // email validation
        if (!emailInput?.value) {
            setValidationError('Adres e-mail jest wymagany!');
            return;
        }

        if (emailInput.value.length > 30) {
            setValidationError('Adres e-mail może mieć maksymalnie 30 znaków!');
            return;
        }

        if (!/^[\w\-]+(\.[\w\-]+)*@[\w\-]+(\.[\w\-]+)*(\.[A-Za-z]{2,})$/.test(emailInput.value)) {
            setValidationError('Podaj poprawny adres e-mail!');
            return;
        }

        // password validation
        if (!passwordInput?.value) {
            setValidationError('Hasło jest wymagane!');
            return;
        }

        if (passwordInput.value.length < 8) {
            setValidationError('Hasło musi mieć przynajmniej 8 znaków!');
            return;
        }

        if (passwordInput.value.length > 50) {
            setValidationError('Hasło może mieć maksymalnie 50 znaków!');
            return;
        }

        if (passwordConfirmationInput?.value !== passwordInput.value) {
            setValidationError('Hasła nie są identyczne');
            return;
        }

        axiosClient({
            method: 'post',
            url: '/register',
            data: {
                nickname: nicknameInput.value,
                phone_number: phoneNumberInput.value,
                city: cityInput.value,
                email: emailInput.value,
                password: passwordInput.value,
                password_confirmation: passwordConfirmationInput.value
            }
        })
            .then(res => {
                form.reset();
                setValidationError(null);
                setPopup(res.data.message);
                setTimeout(() => setPopup(null), 4000);
            })
            .catch(err => setValidationError(err?.response.data.message));
    }

    function handleAutocomplete(e: React.ChangeEvent<HTMLInputElement>): void {
        const input = e.target as HTMLInputElement;
        if (input.value) {
            setCity(input.value);
        }
        else {
            setDropdown([]);
        }
    }

    function fillLocation(e: React.MouseEvent<HTMLButtonElement>): void {
        const button = e.target as HTMLButtonElement;
        const input = button.closest('[data-id="inputContainer"]')?.querySelector('input') as HTMLInputElement;
        input.value = button.innerText;
        setDropdown([]);
    }

    function cancelDropdown(e: React.KeyboardEvent<HTMLInputElement>): void {
        if (e.key === 'Escape') {
            setDropdown([]);
        }
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <>
            <div className={styles.main}>
                <img className={styles.img} src="img/favicon.png" alt="logo" />
                <h1 className={styles.heading}>Witaj</h1>
                <p className={styles.subtitle}>Zacznij wynajmować produkty i zarabiaj</p>
                <form onSubmit={register} className={styles.form}>
                    <div className={styles.form__container}>
                        <label htmlFor="nickname" className={styles.form__label}>Nazwa użytkownika</label>
                        <input name='nickname' placeholder='Imię lub przezwisko' id='nickname' type="text" className={styles.form__input} />
                    </div>
                    <div className={styles.form__container}>
                        <label htmlFor="phone_number" className={styles.form__label}>Nr telefonu</label>
                        <input name='phone_number' placeholder='123 456 789' id='phone_number' type="text" className={styles.form__input} />
                    </div>
                    <div data-id='inputContainer' className={styles.form__container}>
                        <label htmlFor="city" className={styles.form__label}>Miasto</label>
                        <input onKeyDown={cancelDropdown} autoComplete='off' style={{ borderRadius: dropdown.length > 0 ? '15px 15px 0 0' : '15px' }} onChange={handleAutocomplete} name='city' placeholder='Warszawa' id='city' type="text" className={styles.form__input} />
                        {
                            dropdown.length > 0 &&
                            <div className={styles.form__autocomplete}>
                                {
                                    dropdown.map((item, index) => {
                                        return <button onClick={fillLocation} type='button' key={index} className={styles.form__autocomplete__button}>{item.city}</button>
                                    })
                                }
                            </div>
                        }
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
                    {validationError && <p role='alert' aria-live='assertive' className={styles.form__error}>{validationError}</p>}
                    <button className={styles.form__button}>Zarejestruj się</button>
                </form>
                <p className={styles.bottomText}>Masz już konto? <Link to='/logowanie' className={styles.bottomText__link}>Zaloguj się</Link></p>
                <p className={styles.bottomText}><Link className={styles.bottomText__link} to='/'>Kontynuuj bez konta</Link></p>
            </div>
            <Popup type='good' active={popup ? true : false}>{popup}</Popup>
        </>
    )
}

export default Register
