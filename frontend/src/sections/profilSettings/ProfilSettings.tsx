import { useState, FormEvent, useContext } from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import { AuthContext, ContextType } from '../../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Error from '../../components/error/Error';
import Popup from '../../components/popup/Popup';
import axiosClient from '../../AxiosClient';

import styles from './profilSettings.module.css';

interface Accordions {
    changePassword: boolean;
    changeEmail: boolean;
    deleteAccount: boolean;
}

interface ValidationErrors {
    changePassword: string | null;
    changeEmail: string | null;
    deleteAccount: string | null;
}

const ProfilSettings = () => {
    const { setIsAuthorized } = useContext<ContextType>(AuthContext);
    const navigate = useNavigate();
    const [areAccordionsActive, setAreAccordionsActive] = useState<Accordions>({
        changePassword: false,
        changeEmail: false,
        deleteAccount: false
    });

    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({
        changePassword: null,
        changeEmail: null,
        deleteAccount: null
    });

    const [popup, setPopup] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    function toggleAccordion(name: 'changePassword' | 'changeEmail' | 'deleteAccount'): void {
        setAreAccordionsActive(prev => {
            return {
                ...prev,
                [name]: !prev[name]
            }
        });
    }

    function changePassword(e: FormEvent): void {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const password = form.querySelector('#passwordChangePassword') as HTMLInputElement;
        const newPassword = form.querySelector('#passwordChangeNewPassword') as HTMLInputElement;
        const newPasswordConfirmation = form.querySelector('#passwordChangeNewPasswordConfirmation') as HTMLInputElement;
        axiosClient({
            method: 'put',
            url: '/change-password',
            data: {
                password: password.value,
                newPassword: newPassword.value,
                newPassword_confirmation: newPasswordConfirmation.value
            }
        })
            .then(res => {
                form.reset();
                setPopup(res.data.message);
                setValidationErrors(prev => {
                    return { ...prev, changePassword: null };
                })
                setTimeout(() => setPopup(null), 4000);
            })
            .catch(err => {
                if (err?.response?.status === 422 || err?.response?.status === 401) {
                    setValidationErrors(prev => {
                        return { ...prev, changePassword: err.response.data.message };
                    })
                }
                else {
                    setError('Coś poszło nie tak, spróbuj ponownie później...')
                }
            });


    }

    function changeEmail(e: FormEvent): void {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const newEmail = form.querySelector('#emailChangeNewEmail') as HTMLInputElement;
        const password = form.querySelector('#emailChangePassword') as HTMLInputElement;

        axiosClient({
            method: 'put',
            url: '/change-email',
            data: {
                email: newEmail.value,
                password: password.value
            }
        })
            .then(res => {
                form.reset();
                setPopup(res.data.message);
                setValidationErrors(prev => {
                    return { ...prev, changeEmail: null };
                });
                setTimeout(() => setPopup(null), 4000);
            })
            .catch(err => {
                if (err?.response?.status === 422 || err?.response?.status === 401) {
                    setValidationErrors(prev => {
                        return { ...prev, changeEmail: err.response.data.message };
                    })
                }
                else {
                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                }
            })

    }

    function deleteAccount(e: FormEvent): void {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const email = form.querySelector('#deleteAccountEmail') as HTMLInputElement;
        const password = form.querySelector('#deleteAccountPassword') as HTMLInputElement;
        const confirmation = form.querySelector('#deleteAccountConfirmation') as HTMLInputElement;

        axiosClient({
            method: 'delete',
            url: '/delete-account',
            data: {
                email: email.value,
                password: password.value,
                confirmation: confirmation.value
            }
        })
            .then(res => {
                localStorage.removeItem('token');
                setIsAuthorized(false);
                navigate('/logowanie');
            })
            .catch(err => {
                if (err?.response?.status === 422 || err?.response?.status === 401) {
                    setValidationErrors(prev => {
                        return { ...prev, deleteAccount: err.response.data.message };
                    });
                }
                else {
                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                }
            })
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <main className={styles.main}>
            <div className={styles.accordion}>
                <button onClick={() => toggleAccordion('changePassword')} className={styles.accordion__header}>
                    <span className={styles.accordion__header__text}>Zmień hasło</span>
                    {
                        areAccordionsActive.changePassword ? <AiFillCaretUp className={styles.accordion__header__icon} /> : <AiFillCaretDown className={styles.accordion__header__icon} />
                    }

                </button>
                <form onSubmit={changePassword} className={`${styles.accordion__content} ${areAccordionsActive.changePassword && styles.accordion__content_active}`}>
                    <div className={styles.accordion__inputContainer}>
                        <label className={styles.accordion__label} htmlFor="passwordChangePassword">Aktualne hasło</label>
                        <input className={styles.accordion__input} type="password" id='passwordChangePassword' />
                    </div>
                    <div className={styles.accordion__inputContainer}>
                        <label className={styles.accordion__label} htmlFor="passwordChangeNewPassword">Nowe hasło</label>
                        <input className={styles.accordion__input} type="password" id='passwordChangeNewPassword' />
                    </div>
                    <div className={styles.accordion__inputContainer}>
                        <label className={styles.accordion__label} htmlFor="passwordChangeNewPasswordConfirmation">Powtórz nowe hasło</label>
                        <input className={styles.accordion__input} type="password" id='passwordChangeNewPasswordConfirmation' />
                    </div>
                    <button className={styles.accordion__button}>Zapisz</button>
                    {
                        validationErrors.changePassword && <p role='alert' aria-live='assertive' className={styles.accordion__error}>{validationErrors.changePassword}</p>
                    }
                </form>
            </div>
            <div className={styles.accordion}>
                <button onClick={() => toggleAccordion('changeEmail')} className={styles.accordion__header}>
                    <span className={styles.accordion__header__text}>Zmień adres e-mail</span>
                    {
                        areAccordionsActive.changeEmail ? <AiFillCaretUp className={styles.accordion__header__icon} /> : <AiFillCaretDown className={styles.accordion__header__icon} />
                    }
                </button>
                <form onSubmit={changeEmail} className={`${styles.accordion__content} ${areAccordionsActive.changeEmail && styles.accordion__content_active}`}>
                    <div className={styles.accordion__inputContainer}>
                        <label className={styles.accordion__label} htmlFor="emailChangeNewEmail">Nowy adres e-mail</label>
                        <input className={styles.accordion__input} type="email" id='emailChangeNewEmail' />
                    </div>
                    <div className={styles.accordion__inputContainer}>
                        <label className={styles.accordion__label} htmlFor="emailChangePassword">Hasło</label>
                        <input className={styles.accordion__input} type="password" id='emailChangePassword' />
                    </div>
                    <button className={styles.accordion__button}>Zapisz</button>
                    {
                        validationErrors.changeEmail && <p role='alert' aria-live='assertive' className={styles.accordion__error}>{validationErrors.changeEmail}</p>
                    }
                </form>
            </div>
            <div className={styles.accordion}>
                <button onClick={() => toggleAccordion('deleteAccount')} className={styles.accordion__header}>
                    <span className={styles.accordion__header__text}>Usuń konto</span>
                    {
                        areAccordionsActive.deleteAccount ? <AiFillCaretUp className={styles.accordion__header__icon} /> : <AiFillCaretDown className={styles.accordion__header__icon} />
                    }
                </button>
                <form onSubmit={deleteAccount} className={`${styles.accordion__content} ${areAccordionsActive.deleteAccount && styles.accordion__content_active}`}>
                    <div className={styles.accordion__inputContainer}>
                        <label className={styles.accordion__label} htmlFor="deleteAccountEmail">Adres e-mail</label>
                        <input className={styles.accordion__input} type="email" id='deleteAccountEmail' />
                    </div>
                    <div className={styles.accordion__inputContainer}>
                        <label className={styles.accordion__label} htmlFor="deleteAccountPassword">Hasło</label>
                        <input className={styles.accordion__input} type="password" id='deleteAccountPassword' />
                    </div>
                    <div className={styles.accordion__inputContainer}>
                        <label className={styles.accordion__label} htmlFor="deleteAccountConfirmation">Napisz "usuwam konto"</label>
                        <input className={styles.accordion__input} type="text" id='deleteAccountConfirmation' />
                    </div>
                    <button className={`${styles.accordion__button} ${styles.accordion__button_red}`}>Usuń konto</button>
                    {
                        validationErrors.deleteAccount && <p role='alert' aria-live='assertive' className={styles.accordion__error}>{validationErrors.deleteAccount}</p>
                    }
                </form>
            </div>
            <Popup type='good' active={popup ? true : false}>{popup}</Popup>
        </main>
    )
}

export default ProfilSettings
