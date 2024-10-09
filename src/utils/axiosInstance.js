import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_REACT_APP_HOST}api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
