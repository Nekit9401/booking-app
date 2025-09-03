import axios from 'axios';

export const api = axios.create({
	baseURL: '/api',
	withCredentials: true,
	timeout: 10000,
});

// api.interceptors.request.use(
// 	async (config) => {
// 		await new Promise((resolve) => setTimeout(resolve, 2500)); // 5 секунд

// 		return config;
// 	},
// 	(error) => {
// 		return Promise.reject(error);
// 	},
// );
