import { useContext } from 'react';
import { AuthContext, ContextType } from '../../contexts/AuthProvider';
import Loading from '../../components/Loading';

import styles from './home.module.css';
const Home = () => {
    const { isLoading, isAuthorized } = useContext<ContextType>(AuthContext);

    return (
        <>
            {isLoading ? <Loading /> :
                <>

                </>
            }
        </>
    )
}

export default Home
