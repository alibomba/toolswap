import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Error from '../../components/error/Error';
import Popup from '../../components/popup/Popup';
import axiosClient from '../../AxiosClient';
import axios from 'axios';

import styles from './createProduct.module.css';

interface Category {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

interface Location {
    city: string;
}

const CreateProduct = () => {
    const { id } = useParams();
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [previewImage, setPreviewImage] = useState<string>('/img/image-placeholder.jpg');
    const [cityAutocomplete, setCityAutocomplete] = useState<Location[]>([]);
    const [available, setAvailable] = useState<boolean>(true);
    const [availableFormActive, setAvailableFormActive] = useState<boolean>(false);
    const [availableValidationError, setAvailableValidationError] = useState<string | null>(null);
    const [popup, setPopup] = useState<string | null>(null);
    const [validationError, setValidationError] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const categoryRef = useRef<HTMLSelectElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const locationRef = useRef<HTMLInputElement>(null);



    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: '/categories',
            cancelToken: source.token
        })
            .then(res => {
                setCategories(res.data);
                if (id) {
                    axiosClient({
                        method: 'get',
                        url: `/is-offer-mine/${id}`,
                        cancelToken: source.token
                    })
                        .then(res => {
                            axiosClient({
                                method: 'get',
                                url: `/offer-data/${id}`,
                                cancelToken: source.token
                            })
                                .then(res => {
                                    titleRef.current!.value = res.data.offer.title;
                                    categoryRef.current!.value = res.data.category;
                                    setPreviewImage(`${process.env.REACT_APP_API_URL}/storage/offers/${res.data.offer.thumbnail}`);
                                    priceRef.current!.value = res.data.offer.price;
                                    descriptionRef.current!.value = res.data.offer.description;
                                    locationRef.current!.value = res.data.location.city;
                                    setAvailable(res.data.offer.available ? true : false);
                                })
                                .catch(err => setError('Coś poszło nie tak, spróbuj ponownie później...'));
                        })
                        .catch(err => {
                            if (err?.response?.status === 403) {
                                setError(err?.response?.data?.message);
                            }
                            else {
                                setError('Coś poszło nie tak, spróbuj ponownie później...');
                            }
                        });
                }
                else {
                    axiosClient({
                        method: 'get',
                        url: '/my-location',
                        cancelToken: source.token
                    })
                        .then(res => {
                            locationRef.current!.value = res.data;
                        })
                        .catch(err => setError('Coś poszło nie tak, spróbuj ponownie później...'));
                }
            })
            .catch(err => setError('Coś poszło nie tak, spróbuj ponownie później...'));

        return () => {
            source.cancel();
        }

    }, []);

    function setTempImage(e: React.ChangeEvent<HTMLInputElement>): void {
        const input = e.target as HTMLInputElement;
        const file: Blob = input.files![0];
        if (file && file.type.startsWith('image/')) {
            const imageURL: string = URL.createObjectURL(file);
            setPreviewImage(imageURL);
        }
        else {
            alert('Miniatura musi być obrazem');
        }
    }

    function getAutocomplete(e: React.ChangeEvent<HTMLInputElement>): void {
        const input = e.target as HTMLInputElement;

        if (input.value) {
            axiosClient({
                method: 'get',
                url: `/location-autocomplete?phrase=${input.value}`
            })
                .then(res => {
                    setCityAutocomplete(res.data);
                })
                .catch(err => setError('Coś poszło nie tak, spróbuj ponownie później...'));
        }
        else {
            setCityAutocomplete([]);
        }
    }

    function autocompleteOff(e: React.KeyboardEvent<HTMLInputElement>): void {
        if (e.key === 'Escape') {
            setCityAutocomplete([]);
        }
    }

    function autocomplete(city: string): void {
        locationRef.current!.value = city;
        setCityAutocomplete([]);
    }

    function submitOffer(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const fileInput = form.querySelector('#thumbnail') as HTMLInputElement;
        const thumbnail = fileInput.files![0] as Blob;
        const data = new FormData();
        data.append('category', categoryRef.current!.value);
        data.append('location', locationRef.current!.value);
        if (thumbnail) {
            data.append('thumbnail', thumbnail);
        }
        data.append('title', titleRef.current!.value);
        data.append('description', descriptionRef.current!.value);
        data.append('price', priceRef.current!.value);

        if (id) {
            data.append('_method', 'put');
            axiosClient({
                method: 'post',
                url: `/offers/${id}`,
                data,
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            })
                .then(res => {
                    setValidationError(null);
                    setPopup(res.data.message);
                    setTimeout(() => setPopup(null), 4000);
                })
                .catch(err => {
                    if (err?.response?.status === 422) {
                        setValidationError(err?.response?.data?.message);
                    }
                    else {
                        setError('Coś poszło nie tak, spróbuj ponownie później...');
                    }
                })
        }
        else {
            axiosClient({
                method: 'post',
                url: '/offers',
                data,
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            })
                .then(res => {
                    form.reset();
                    setPreviewImage('/img/image-placeholder.jpg');
                    setValidationError(null);
                    setPopup(res.data.message);
                    setTimeout(() => setPopup(null), 4000);
                })
                .catch(err => {
                    if (err?.response?.status === 422) {
                        setValidationError(err?.response?.data?.message);
                    }
                    else {
                        setError('Coś poszło nie tak, spróbuj ponownie później...');
                    }
                })
        }
    }

    function toggleAvailability(e: React.ChangeEvent<HTMLInputElement>): void {
        if (available) {
            setAvailableFormActive(true);
        }
        else {
            axiosClient({
                method: 'post',
                url: `/offer-make-available/${id}`
            })
                .then(res => {
                    setAvailable(true);
                    setPopup(res.data.message);
                    setTimeout(() => setPopup(null), 4000);
                })
                .catch(err => setError('Coś poszło nie tak, spróbuj ponownie później...'));
        }
    }

    function submitAvailable(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const nickname = form.querySelector('#nickname') as HTMLInputElement;

        axiosClient({
            method: 'post',
            url: `/offer-make-unavailable/${id}`,
            data: {
                nickname: nickname.value
            }
        })
            .then(res => {
                setAvailableValidationError(null);
                setAvailable(false);
                form.reset();
                setAvailableFormActive(false);
                setPopup(res.data.message);
                setTimeout(() => setPopup(null), 4000);
            })
            .catch(err => {
                if (err?.response?.status === 422) {
                    setAvailableValidationError(err?.response?.data?.message);
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
        <>
            <form onSubmit={submitOffer} encType='multipart/form-data' className={styles.form}>
                <div className={styles.form__inputContainer}>
                    <label className={styles.form__label} htmlFor="title">Tytuł</label>
                    <input ref={titleRef} className={styles.form__input} type="text" id='title' />
                </div>
                <div className={styles.form__inputContainer}>
                    <label className={styles.form__label} htmlFor="category">Kategoria</label>
                    <select ref={categoryRef} className={styles.form__select} id="category">
                        <option value="">Wybierz</option>
                        {
                            categories && categories.map(category => {
                                return <option key={category.id} value={category.name}>{category.name}</option>
                            })
                        }
                    </select>
                </div>
                <div className={styles.form__inputContainer}>
                    <p className={styles.form__label}>Miniatura</p>
                    <label htmlFor="thumbnail">
                        <img className={styles.form__thumbnailLabel} src={previewImage} alt="wybrana miniatura" />
                    </label>
                    <input onChange={setTempImage} style={{ display: 'none' }} id='thumbnail' type="file" />
                </div>
                <div className={styles.form__inputContainer}>
                    <label className={styles.form__label} htmlFor="price">Cena za dobę (zł)</label>
                    <input ref={priceRef} className={styles.form__input} id='price' type="number" step={0.01} />
                </div>
                <div className={styles.form__inputContainer}>
                    <label className={styles.form__label} htmlFor="description">Opis</label>
                    <textarea ref={descriptionRef} className={styles.form__textarea} id="description" cols={30} rows={10}></textarea>
                </div>
                <div className={styles.form__inputContainer}>
                    <label className={styles.form__label} htmlFor="location">Lokalizacja</label>
                    <input autoComplete='off' onChange={getAutocomplete} onKeyDown={autocompleteOff} ref={locationRef} className={styles.form__input} id='location' type="text" />
                    {
                        cityAutocomplete.length > 0 &&
                        <div className={styles.form__cityAutocomplete}>
                            {
                                cityAutocomplete.map((location, index) => {
                                    return <button onClick={() => autocomplete(location.city)} key={index} type='button' className={styles.form__cityAutocomplete__button}>{location.city}</button>
                                })
                            }
                        </div>
                    }
                </div>
                <button className={styles.form__button}>{id ? 'Zapisz' : 'Opublikuj'}</button>
                {
                    validationError && <p role='alert' aria-live='assertive' className={styles.form__error}>{validationError}</p>
                }
                <Popup type='good' active={popup ? true : false}>{popup}</Popup>
                {
                    id &&
                    <div className={styles.form__available}>
                        <label className={styles.available__text}>Zajęte <input onChange={toggleAvailability} checked={!available} aria-checked={!available} className={styles.available__checkbox} type="checkbox" /></label>
                    </div>
                }
            </form>
            {
                availableFormActive &&
                <>
                    <form onSubmit={submitAvailable} className={styles.available__form}>
                        <label className={styles.form__label} htmlFor="nickname">Kto wynajmuje (nazwa użytkownika)</label>
                        <input id='nickname' className={styles.form__input} type="text" />
                        <button className={styles.form__button}>Potwierdź</button>
                        {
                            availableValidationError && <p className={styles.form__error}>{availableValidationError}</p>
                        }
                    </form>
                    <div onClick={() => setAvailableFormActive(false)} className={styles.available__overlay}></div>
                </>
            }
        </>
    )
}

export default CreateProduct
