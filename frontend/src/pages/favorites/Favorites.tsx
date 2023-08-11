import { useState, useEffect, useContext } from 'react';
import { AuthContext, ContextType } from '../../contexts/AuthProvider';
import { Navigate } from 'react-router-dom';
import axiosClient from '../../AxiosClient';
import axios from 'axios';
import Error from '../../components/error/Error';
import Loading from '../../components/loading/Loading';
import Offer from '../../components/offer/Offer';
import { GrLinkPrevious, GrLinkNext } from 'react-icons/gr';

import styles from './favorites.module.css';

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


const Favorites = () => {
    const { isLoading, isAuthorized } = useContext<ContextType>(AuthContext);
    const [offers, setOffers] = useState<Response | null>(null);
    const [page, setPage] = useState<number>(1);
    const [areOffersLoading, setAreOffersLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: `/favorites?page=${page}`,
            cancelToken: source.token
        })
            .then(res => {
                setOffers(res.data);
            })
            .catch(err => setError('Coś poszło nie tak, spróbuj ponownie później...'))
            .finally(() => setAreOffersLoading(false));

        return () => {
            source.cancel();
        }

    }, [page]);

    function prevPage(): void {
        if (page !== 1) {
            setPage(prev => prev - 1);
        }
    }

    function nextPage(): void {
        if (page !== offers?.last_page) {
            setPage(prev => prev + 1);
        }
    }


    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <>
            {
                isLoading ? <Loading /> :
                    !isAuthorized ? <Navigate to='/logowanie' /> :
                        areOffersLoading ? <Loading /> :
                            <main className={styles.main}>
                                <h1 className={styles.main__heading}>Obserwowane oferty</h1>
                                <div className={styles.main__list}>
                                    {
                                        offers!.data.length === 0 ? <p className='noResults'>Brak ofert</p> :
                                            offers!.data.map(offer => {
                                                return (
                                                    <Offer
                                                        key={offer.id}
                                                        id={offer.id}
                                                        category_id={offer.category_id}
                                                        location_id={offer.location_id}
                                                        thumbnail={offer.thumbnail}
                                                        title={offer.title}
                                                        price={offer.price}
                                                        available={offer.available}
                                                        created_at={offer.created_at}
                                                    />
                                                )
                                            })
                                    }
                                </div>
                                {
                                    offers?.last_page !== 1 &&
                                    <div className={styles.main__pagination}>
                                        <button onClick={prevPage} title='Poprzednia strona' aria-disabled={page === 1} disabled={page === 1} className={`${styles.pagination__button} ${page === 1 && styles.pagination__button_disabled}`}>
                                            <GrLinkPrevious />
                                        </button>
                                        <p className={styles.pagination__text}>{page}/{offers?.last_page}</p>
                                        <button onClick={nextPage} title='Następna strona' aria-disabled={page === offers?.last_page} disabled={page === offers?.last_page} className={`${styles.pagination__button} ${page === offers?.last_page && styles.pagination__button_disabled}`}>
                                            <GrLinkNext />
                                        </button>
                                    </div>
                                }
                            </main>
            }
        </>
    )
}

export default Favorites
