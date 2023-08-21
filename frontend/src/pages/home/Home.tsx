import { useState, useContext, useEffect, useRef } from 'react';
import { AuthContext, ContextType } from '../../contexts/AuthProvider';
import Loading from '../../components/loading/Loading';
import HomeSearch from '../../components/homeSearch/HomeSearch';
import axiosClient from '../../AxiosClient';
import axios from 'axios';
import Error from '../../components/error/Error';
import Offer from '../../components/offer/Offer';
import Pagination from '../../components/pagination/Pagination';

import styles from './home.module.css';

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

const Home = () => {
    const { isLoading } = useContext<ContextType>(AuthContext);
    const [areOffersLoading, setAreOffersLoading] = useState<boolean>(true);
    const [offers, setOffers] = useState<Response | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [searchUrl, setSearchUrl] = useState<string>('/offers?');
    const [page, setPage] = useState<number>(1);
    const isMounted = useRef<boolean>(false);

    useEffect(() => {
        const source = axios.CancelToken.source();
        axiosClient({
            method: 'get',
            url: '/offers',
            cancelToken: source.token
        })
            .then(res => {
                setOffers(res.data);
                isMounted.current = true;
            })
            .catch(err => {
                setError('Coś poszło nie tak, spróbuj ponownie później...');
            })
            .finally(() => {
                setAreOffersLoading(false);
            });

        return () => {
            source.cancel();
        }
    }, []);

    useEffect(() => {
        if (isMounted.current) {
            const source = axios.CancelToken.source();
            setAreOffersLoading(true);

            axiosClient({
                method: 'get',
                url: `${searchUrl}page=${page}`,
                cancelToken: source.token
            })
                .then(res => {
                    setOffers(res.data);
                })
                .catch(err => {
                    setError('Coś poszło nie tak, spróbuj ponownie później...');
                })
                .finally(() => setAreOffersLoading(false));

            return () => {
                source.cancel();
            }
        }
    }, [page]);

    if (error) {
        return <Error>{error}</Error>
    }

    return (
        <>
            {isLoading ? <Loading /> :
                <>
                    <HomeSearch setOffers={setOffers} setAreOffersLoading={setAreOffersLoading} setSearchUrl={setSearchUrl} setPage={setPage} />
                    <main className={styles.offers}>
                        <h2 className={styles.offers__heading}>Najnowsze</h2>
                        <div className={styles.offers__list}>
                            {
                                areOffersLoading ? <Loading /> :
                                    offers!.data.length > 0 ?
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
                                                    variant='standard'
                                                />
                                            )
                                        })
                                        :
                                        <p className='noResults'>Brak ofert</p>
                            }
                        </div>
                        <Pagination
                            last_page={offers?.last_page}
                            setPage={setPage}
                            page={page}
                        />
                    </main>
                </>
            }
        </>
    )
}

export default Home
