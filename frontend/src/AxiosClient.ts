import axios from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

axiosClient.interceptors.response.use(
    response => response,
    (error) => {
        const originalRequest = error.config;

        if (error?.response.status === 401 && error?.response.data.message === 'Token expired') {
            return axiosClient({
                method: 'post',
                url: '/refresh'
            })
                .then(res => {
                    const { token } = res.data;

                    localStorage.setItem('token', token);

                    originalRequest.headers['Authorization'] = `Bearer ${token}`;

                    return axiosClient(originalRequest);
                })
                .catch(err => {
                    Promise.reject(err)
                    //return something here to indicate to the component that it needs to logout the user and redirect them to the login page
                });
        }

        return Promise.reject(error);
    }
);

export default axiosClient;