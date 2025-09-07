import { api } from '../constants';

export const roomsApi = {
	getRooms: () => {
		return api.get('/rooms');
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
