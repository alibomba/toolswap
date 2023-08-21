import { useState, useEffect, useRef } from 'react';
import Error from '../../components/error/Error';
import Popup from '../../components/popup/Popup';
import { Link } from 'react-router-dom';
import { IoLinkOutline } from 'react-icons/io5';
import axiosClient from '../../AxiosClient';
import axios from 'axios';

import styles from './profilForm.module.css';

interface User {
    id: number;
    nickname: string;
    phone_number: string;
    location_id: number;
    profile_picture: string | null;
    email: string;
    created_at: string;
    updated_at: string;
}

interface Location {
    city: string;
}

const ProfilForm = () => {
    const nicknameRef = useRef<HTMLInputElement>(null);
    const nicknameTextRef = useRef<HTMLParagraphElement>(null);
    const miejscowoscRef = useRef<HTMLInputElement>(null);
    const nrTelefonuRef = useRef<HTMLInputElement>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [profilePicture, setProfilePicture] = useState<string>('img/default-pfp.png');
    const [validationError, setValidationError] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [autocomplete, setAutocomplete] = useState<Location[] | []>([]);
    const [notification, setNotification] = useState<string | null>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: '/me',
            cancelToken: source.token
        })
            .then(res => {
                const user: User = res.data;
                setUserId(user.id);
                if (user.profile_picture) {
                    setProfilePicture(`${process.env.REACT_APP_API_URL}/storage/pfp/${user.profile_picture}`);
                }
                nicknameRef.current!.value = user.nickname;
                nicknameTextRef.current!.innerText = user.nickname;
                nrTelefonuRef.current!.value = user.phone_number;
                axiosClient({
                    method: 'get',
                    url: `/location/${user.location_id}`,
                    cancelToken: source.token
                })
                    .then(res => {
                        miejscowoscRef.current!.value = res.data.city;
                    })
                    .catch(err => setError('Coś poszło nie tak, spróbuj ponownie później...'));

            })
            .catch(err => {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            });

        return () => {
            source.cancel();
        }

    }, []);

    function cityAutocomplete(e: React.ChangeEvent<HTMLInputElement>): void {
        const input = e.target as HTMLInputElement;
        if (input.value) {
            axiosClient({
                method: 'get',
                url: `/location-autocomplete/?phrase=${input.value}`
            })
                .then(res => {
                    setAutocomplete(res.data);
                })
                .catch(err => {
                    setError('Coś poszło nie tak, spróbuj ponownie później...')
                });
        }
        else {
            setAutocomplete([]);
        }
    }

    function setCity(city: string): void {
        miejscowoscRef.current!.value = city;
        setAutocomplete([]);
    }

    function autocompleteOff(e: React.KeyboardEvent<HTMLInputElement>): void {
        if (e.key === 'Escape') {
            setAutocomplete([]);
        }
    }

    function saveUser(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const fileInput = form.querySelector('#pfp') as HTMLInputElement;
        const image = fileInput.files![0] as Blob;
        const data = new FormData();
        if (image) {
            data.append('pfp', image);
        }
        data.append('nickname', nicknameRef.current!.value);
        data.append('city', miejscowoscRef.current!.value);
        data.append('phone_number', nrTelefonuRef.current!.value);
        data.append('_method', 'put');

        axiosClient({
            method: 'post',
            url: '/user',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data
        })
            .then(res => {
                setValidationError(null);
                setNotification(res.data.message);
                setTimeout(() => setNotification(null), 4000);
            })
            .catch(err => {
                if (err?.response?.status === 422) {
                    setValidationError(err?.response?.data?.message);
                }
                else {
                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                }
            });

    }

    function setTempImage(e: React.ChangeEvent<HTMLInputElement>): void {
        const input = e.target as HTMLInputElement;
        const selectedFile = input.files![0];
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function (e) {
                setProfilePicture(e.target?.result as string);
            }
            reader.readAsDataURL(selectedFile);
        }
        else {
            alert('Plik musi być zdjęciem');
        }
    }



    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <form onSubmit={saveUser} encType='multipart/form-data' className={styles.form}>
            <div className={styles.form__top}>
                <input onChange={setTempImage} style={{ display: 'none' }} id='pfp' type="file" />
                <label htmlFor="pfp">
                    <img className={styles.form__imgLabel} src={profilePicture} alt="zdjęcie profilowe" />
                </label>
                <div className={styles.form__top__right}>
                    <p ref={nicknameTextRef} className={styles.form__nickname}>...</p>
                    <Link className={styles.form__profileLink} to={`/profil/${userId && userId}`}><IoLinkOutline /> zobacz jak inni widzą Twój profil</Link>
                </div>
            </div>
            <div className={styles.form__fields}>
                <div className={styles.form__container}>
                    <label className={styles.form__label} htmlFor="nickname">Nazwa użytkownika</label>
                    <input className={styles.form__input} id='nickname' type="text" ref={nicknameRef} />
                </div>
                <div className={styles.form__container}>
                    <label className={styles.form__label} htmlFor="miejscowosc">Miejscowość</label>
                    <input onKeyDown={autocompleteOff} onChange={cityAutocomplete} autoComplete='off' className={styles.form__input} id='miejscowosc' type="text" ref={miejscowoscRef} />
                    {
                        autocomplete.length > 0 &&
                        <div className={styles.form__cityAutocomplete}>
                            {
                                autocomplete.map(item => <button type='button' onClick={() => setCity(item.city)} className={styles.form__cityAutocomplete__button}>{item.city}</button>)
                            }
                        </div>
                    }
                </div>
                <div className={styles.form__container}>
                    <label className={styles.form__label} htmlFor="nr_tel">Nr telefonu</label>
                    <input className={styles.form__input} id='nr_tel' type="text" ref={nrTelefonuRef} />
                </div>
                <button className={styles.form__button}>Zapisz</button>
                {
                    validationError && <p className={styles.form__error} role='alert' aria-live='assertive'>{validationError}</p>
                }
            </div>
            <Popup type='good' active={notification ? true : false}>{notification}</Popup>
        </form>
    )
}

export default ProfilForm
