import { api } from '../constants';

export const roomsApi = {
	getRooms: (params = {}) => {
		return api.get('/rooms', { params });
	},

	getRoom: (id) => {
		return api.get(`/rooms/${id}`);
	},

	createRoom: (roomData, config) => {
		return api.post('/rooms', roomData, config);
	},

	updateRoom: (id, roomData) => {
		return api.patch(`/rooms/${id}`, roomData);
	},

	deleteRoom: (id) => {
		return api.delete(`/rooms/${id}`);
	},
};
