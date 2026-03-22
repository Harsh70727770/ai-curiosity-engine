import axios from 'axios';

// 🔥 Use environment variable instead of hardcoded URL
const API = import.meta.env.VITE_API_URL;

// Create axios instance
const api = axios.create({
    baseURL: `${API}/api/`,
});

// 🔐 Attach token automatically
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default api;