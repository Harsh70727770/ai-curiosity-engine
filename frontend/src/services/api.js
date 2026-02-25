import axios from 'axios';

// Create a custom axios instance
const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
});

// Intercept every outgoing request and attach the token
api.interceptors.request.use(
    (config) => {
        // Grab the token from local storage
        const token = localStorage.getItem('access_token');
        
        // If the token exists, attach it to the Authorization header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;