import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api/birthdays',
    headers: {
        'Content-Type': 'application/json',
    }
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    }

    const apiKey = import.meta.env.VITE_API_KEY;

    if (apiKey) {
        config.headers['x-api-key'] = apiKey;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const getBirthdays = () => API.get('/');
export const addBirthday = (birthday) => API.post('/', birthday);
export const editBirthday = (_id, name, date) => API.put(`/${_id}`, { name, date });
export const deleteBirthday = (_id) => API.delete(`/${_id}`);