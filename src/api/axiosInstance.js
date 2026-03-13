import axios from 'axios';

let store;

// Fungsi ini digunakan di main.jsx untuk menyambungkan store ke axios
export const injectStore = (_store) => {
  store = _store;
};

const axiosInstance = axios.create({
  // Nanti isi dengan URL API atau Supabase kamu
  baseURL: import.meta.env.VITE_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk otomatis nambahin token di setiap request (opsional buat nanti)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = store?.getState()?.auth?.token; // Asumsi nanti ada state auth
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;