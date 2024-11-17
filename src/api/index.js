import axios from 'axios';

export const api = axios.create({
	baseURL: import.meta.env.VITE_SERVER_BASE_URL,
});

export const gurdedApi = axios.create({
	baseURL: import.meta.env.VITE_SERVER_BASE_URL,
});
