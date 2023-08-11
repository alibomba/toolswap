import { useContext } from 'react';
import { Header, Footer } from '../sections';
import { AuthContext, ContextType } from '../contexts/AuthProvider';
import { Outlet } from 'react-router-dom';
import Loading from '../components/loading/Loading';

const DefaultLayout = () => {
    const { isLoading, isAuthorized } = useContext<ContextType>(AuthContext);

    return (
        <>
            {
                isLoading ? <Loading /> :
                    <>
                        <Header isAuthorized={isAuthorized} />
                        <Outlet />
                        <Footer />
                    </>
            }
        </>
    )
}

export default DefaultLayout
