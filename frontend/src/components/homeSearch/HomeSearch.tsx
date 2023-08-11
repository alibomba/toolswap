import { useState, useEffect, FormEvent } from 'react';
import { HiFilter } from 'react-icons/hi';
import { BsSearch } from 'react-icons/bs';
import axiosClient from '../../AxiosClient';
import axios from 'axios';
import Error from '../error/Error';

import styles from './homeSearch.module.css';

interface Category {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

interface Location {
    city: string;
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

interface Props {
    setOffers: React.Dispatch<React.SetStateAction<Response | null>>;
    setAreOffersLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setSearchUrl: React.Dispatch<React.SetStateAction<string>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const HomeSearch = ({ setOffers, setAreOffersLoading, setSearchUrl, setPage }: Props) => {
    const [areFiltersExpanded, setAreFiltersExpanded] = useState<boolean>(false);
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [autocomplete, setAutocomplete] = useState<Location[] | []>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: '/categories',
            cancelToken: source.token
        })
            .then(res => {
                setCategories(res.data);
            })
            .catch(err => {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            })

        return () => {
            source.cancel();
        }

    }, []);

    function search(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const phrase = form.querySelector('#phrase') as HTMLInputElement;
        const cenaOd = form.querySelector('#cenaOd') as HTMLInputElement;
        const cenaDo = form.querySelector('#cenaDo') as HTMLInputElement;
        const kategoria = form.querySelector('#kategoria') as HTMLSelectElement;
        const miejscowosc = form.querySelector('#miejscowosc') as HTMLInputElement;
        const dystans = form.querySelector('#dystans') as HTMLInputElement;
        const dostepnosc = form.querySelector('#dostepnosc') as HTMLSelectElement;

        setAreOffersLoading(true);
        if (!areFiltersExpanded) {
            const url = `/phrase-search?phrase=${phrase.value}&`;
            setSearchUrl(url);
            setPage(1);
            axiosClient({
                method: 'get',
                url
            })
                .then(res => {
                    setOffers(res.data);
                })
                .catch(err => {
                    if (err?.response?.status !== 422) {
                        setError('Coś poszło nie tak, spróbuj ponownie później...');
                    }
                })
                .finally(() => {
                    setAreOffersLoading(false);
                });
        }
        else {
            if (dystans.value && 'geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        searchWithFilters(phrase.value, cenaOd.value, cenaDo.value, kategoria.value, miejscowosc.value, dystans.value, position.coords.latitude, position.coords.longitude, dostepnosc.value)
                            .then(res => {
                                setOffers(res.data);
                            })
                            .catch(err => {
                                if (err?.response?.status !== 422) {
                                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                                }
                            })
                            .finally(() => setAreOffersLoading(false));
                    },
                    (error) => {
                        searchWithFilters(phrase.value, cenaOd.value, cenaDo.value, kategoria.value, miejscowosc.value, undefined, undefined, undefined, dostepnosc.value)
                            .then(res => {
                                setOffers(res.data);
                            })
                            .catch(err => {
                                if (err?.response?.status !== 422) {
                                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                                }
                            })
                            .finally(() => setAreOffersLoading(false));
                    }
                )
            }
            else {
                searchWithFilters(phrase.value, cenaOd.value, cenaDo.value, kategoria.value, miejscowosc.value, undefined, undefined, undefined, dostepnosc.value)
                    .then(res => {
                        setOffers(res.data);
                    })
                    .catch(err => {
                        if (err?.response?.status !== 422) {
                            setError('Coś poszło nie tak, spróbuj ponownie później...');
                        }
                    })
                    .finally(() => setAreOffersLoading(false));
            }
        }
    }

    async function searchWithFilters(phrase: string | undefined, cenaOd: string | undefined, cenaDo: string | undefined, kategoria: string | undefined, miejscowosc: string | undefined, dystans: string | undefined, latitude: number | undefined, longitude: number | undefined, dostepnosc: string | undefined) {
        const url = `/search?phrase=${phrase || ''}&cenaOd=${cenaOd || ''}&cenaDo=${cenaDo || ''}&kategoria=${kategoria || ''}&miejscowosc=${miejscowosc || ''}&dystans=${dystans || ''}&latitude=${latitude || ''}&longitude=${longitude || ''}&dostepnosc=${dostepnosc || ''}&`
        setSearchUrl(url);
        setPage(1);
        return axiosClient({
            method: 'get',
            url
        })
    }

    function cityAutocomplete(e: React.ChangeEvent<HTMLInputElement>): void {
        const input = e.target as HTMLInputElement;
        if (input.value) {
            axiosClient({
                method: 'get',
                url: `/location-autocomplete?phrase=${input.value}`
            })
                .then(res => {
                    setAutocomplete(res.data);
                })
                .catch(err => {
                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                })
        }
        else {
            setAutocomplete([]);
        }
    }

    function autocompleteOff(e: React.KeyboardEvent<HTMLInputElement>): void {
        if (e.key === 'Escape') {
            setAutocomplete([]);
        }
    }

    function setCity(e: React.MouseEvent<HTMLButtonElement>, city: string): void {
        const button = e.target as HTMLButtonElement;
        const input = button.closest('[data-id="container"]')?.querySelector('#miejscowosc') as HTMLInputElement;
        input.value = city;
        setAutocomplete([]);
    }

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <form onSubmit={search} className={styles.search}>
            <div className={styles.search__top}>
                <input id='phrase' placeholder='Szukaj' type="text" className={styles.search__bar} />
                <button onClick={() => setAreFiltersExpanded(prev => !prev)} aria-label='Filtry' type='button' className={styles.search__topButton}><span className={styles.search__topButton__text}>Filtry </span><HiFilter className={styles.search__icon} /></button>
                <button aria-label='Szukaj' className={styles.search__topButton}><span className={styles.search__topButton__text}>Szukaj </span><BsSearch className={styles.search__icon} /></button>
            </div>
            <div className={`${styles.search__bottom} ${areFiltersExpanded && styles.search__bottom_active}`}>
                <div className={styles.search__group}>
                    <p className={styles.group__heading}>Cena za dobę</p>
                    <div className={styles.group__row}>
                        <input id='cenaOd' aria-label='Cena od' className={`${styles.group__input} ${styles.group__input_number}`} type="number" min={0} placeholder='Od' />
                        <input id='cenaDo' aria-label='Cena do' className={`${styles.group__input} ${styles.group__input_number}`} type="number" min={0} placeholder='Do' />
                    </div>
                </div>
                <div className={styles.search__group}>
                    <label htmlFor='kategoria' className={styles.group__heading}>Kategoria</label>
                    <select className={styles.group__select} id="kategoria">
                        <option value="">Wybierz</option>
                        {
                            categories && categories.map(category => {
                                return <option key={category.id} value={category.name}>{category.name}</option>
                            })
                        }
                    </select>
                </div>
                <div className={styles.search__group}>
                    <label htmlFor='miejscowosc' className={styles.group__heading}>Miejscowość</label>
                    <div data-id="container" className={styles.group__inputContainer}>
                        <input onKeyDown={autocompleteOff} onChange={cityAutocomplete} autoComplete='off' id='miejscowosc' type="text" className={styles.group__input} />
                        {
                            autocomplete.length > 0 &&
                            <div className={styles.group__cityAutocomplete}>
                                {
                                    autocomplete.map((location, index) => {
                                        return <button onClick={(e) => setCity(e, location.city)} key={index} className={styles.group__cityAutocomplete__button}>{location.city}</button>
                                    })
                                }
                            </div>
                        }
                    </div>
                </div>
                <div className={styles.search__group}>
                    <label htmlFor='dystans' className={styles.group__heading}>Dystans</label>
                    <input id='dystans' placeholder='W km' min={0} type="number" className={`${styles.group__input} ${styles.group__input_number}`} />
                </div>
                <div className={styles.search__group}>
                    <label htmlFor='dostepnosc' className={styles.group__heading}>Dostępność</label>
                    <select id="dostepnosc" className={styles.group__select}>
                        <option value="1">Dostępne</option>
                        <option value="0">Niedostępne</option>
                    </select>
                </div>
            </div>
        </form>
    )
}

export default HomeSearch
