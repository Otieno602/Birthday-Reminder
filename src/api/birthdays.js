import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api/birthdays',
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_API_KEY
    }
});

export const getBirthdays = () => API.get('/');
export const addBirthday = (birthday) => API.post('/', birthday);
export const editBirthday = (_id, name, date) => API.put(`/${_id}`, { name, date });
export const deleteBirthday = (_id) => API.delete(`/${_id}`);