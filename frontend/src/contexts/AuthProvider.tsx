import { useState, useEffect, createContext, ReactNode } from 'react';
import axios from 'axios';
import axiosClient from '../AxiosClient';


export interface ContextType {
    isLoading: boolean;
    isAuthorized: boolean;
    setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<ContextType>({
    isLoading: true,
    isAuthorized: false,
    setIsAuthorized: () => false
});

interface Props {
    children: ReactNode
};


export const AuthProvider = ({ children }: Props) => {
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const source = axios.CancelToken.source();

        axiosClient({
            method: 'get',
            url: '/auth',
            cancelToken: source.token
        })
            .then(res => {
                setIsAuthorized(true);
            })
            .catch(err => {
                setIsAuthorized(false);
            })
            .finally(() => setIsLoading(false));

        return () => {
            source.cancel();
            setIsAuthorized(false);
            setIsLoading(true);
        }

    }, []);

    const defaultValue: ContextType = {
        isAuthorized,
        setIsAuthorized,
        isLoading
    }

    return (
        <AuthContext.Provider value={defaultValue}>
            {children}
        </AuthContext.Provider>
    )
}

