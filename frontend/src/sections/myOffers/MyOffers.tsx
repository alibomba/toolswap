import { useState, useEffect } from 'react';
import Error from '../../components/error/Error';
import Offer from '../../components/offer/Offer';
import Loading from '../../components/loading/Loading';
import Pagination from '../../components/pagination/Pagination';
import axiosClient from '../../AxiosClient';
import axios from 'axios';

import styles from './myOffers.module.css';


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


const MyOffers = () => {
    const [offers, setOffers] = useState<Response | null>(null);
    const [page, setPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: `/my-offers?page=${page}`,
            cancelToken: source.token
        })
            .then(res => {
                setOffers(res.data);
            })
            .catch(err => setError('Coś poszło nie tak, spróbuj ponownie później...'))
            .finally(() => setIsLoading(false));


    }, [page]);

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <>
            {
                isLoading ? <Loading /> :
                    <main className={styles.main}>
                        {
                            offers!.data.length > 0 ?
                                <div className={styles.offers}>
                                    {
                                        offers?.data.map(offer => {
                                            return (<Offer
                                                key={offer.id}
                                                id={offer.id}
                                                category_id={offer.category_id}
                                                location_id={offer.location_id}
                                                thumbnail={offer.thumbnail}
                                                title={offer.title}
                                                price={offer.price}
                                                available={offer.available}
                                                created_at={offer.created_at}
                                                variant='myOffers'
                                            />)
                                        })
                                    }
                                </div>
                                :
                                <p className='noResults'>Brak ofert</p>
                        }
                        <Pagination
                            last_page={offers?.last_page}
                            setPage={setPage}
                            page={page}
                        />
                    </main>
            }
        </>
    )
}

export default MyOffers
