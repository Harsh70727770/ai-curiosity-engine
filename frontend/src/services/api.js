import axios from "axios";

// 🔥 Backend base URL (from Vercel env)
const API = import.meta.env.VITE_API_URL;

// ✅ Create axios instance
const api = axios.create({
  baseURL: `${API}/api/`,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Attach token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ❗ REGISTER API (FIXED ENDPOINT)
export const registerUser = async (data) => {
  try {
    const response = await api.post("users/register/", data); // ✅ FIXED
    return response.data;
  } catch (error) {
    console.error("Register Error:", error.response?.data || error.message);
    throw error;
  }
};

// ❗ LOGIN API
export const loginUser = async (data) => {
  try {
    const response = await api.post("users/login/", data);
    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error;
  }
};

export default api;