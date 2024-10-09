import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_REACT_APP_HOST}api`, // Ensure this matches your environment variable
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;
