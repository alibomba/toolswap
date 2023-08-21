import { useState, useContext, ReactNode } from 'react';
import { AuthContext, ContextType } from '../../contexts/AuthProvider';
import { ProfilForm, MyOffers, ToReturn, ProfilSettings } from '../../sections';
import Loading from '../../components/loading/Loading';
import { Navigate } from 'react-router-dom';

import styles from './settings.module.css';



const Settings = () => {
    const { isLoading, isAuthorized } = useContext<ContextType>(AuthContext);
    const [currentTab, setCurrentTab] = useState<number>(0);
    const tabs: ReactNode[] = [<ProfilForm />, <MyOffers />, <ToReturn />, <ProfilSettings />];

    return (
        <>
            {
                isLoading ? <Loading /> :
                    !isAuthorized ? <Navigate to='/logowanie' /> :
                        <main className={styles.main}>
                            <nav className={styles.nav}>
                                <button onClick={() => setCurrentTab(0)} className={`${styles.nav__button} ${currentTab === 0 && styles.nav__button_active}`}>Profil</button>
                                <button onClick={() => setCurrentTab(1)} className={`${styles.nav__button} ${currentTab === 1 && styles.nav__button_active}`}>Moje ogłoszenia</button>
                                <button onClick={() => setCurrentTab(2)} className={`${styles.nav__button} ${currentTab === 2 && styles.nav__button_active}`}>Do oddania</button>
                                <button onClick={() => setCurrentTab(3)} className={`${styles.nav__button} ${currentTab === 3 && styles.nav__button_active}`}>Ustawienia</button>
                            </nav>
                            {tabs[currentTab]}
                        </main>
            }
        </>
    )
}

export default Settings
