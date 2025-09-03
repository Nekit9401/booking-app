import { api } from '../constants';

export const roomsApi = {
	getRooms: () => {
		return api.get('/rooms');
	},

	getRoom: (id) => {
		return api.get(`/rooms/${id}`);
	},

	getRoomTypes: () => {
		return api.get('/rooms/types');
	},

	createRoom: (roomData) => {
		return api.post('/rooms', roomData);
	},

	updateRoom: (id, roomData) => {
		return api.patch(`/rooms/${id}`, roomData);
	},

	deleteRoom: (id) => {
		return api.delete(`/rooms/${id}`);
	},
};
