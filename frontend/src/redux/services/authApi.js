import { api } from '../constants';

export const authApi = {
	checkAuth: () => {
		return api.get('/me');
	},

	login: (login, password) => {
		return api.post('/login', { login, password });
	},

	register: (login, password) => {
		return api.post('/register', { login, password });
	},

	logout: () => {
		return api.post('/logout');
	},
};
