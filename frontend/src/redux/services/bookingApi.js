import { api } from '../constants';

export const bookingApi = {
	getMyBookings: () => {
		return api.get('/bookings/my');
	},

	getAllBookings: () => {
		return api.get('/bookings');
	},

	createBooking: (bookingData) => {
		return api.post('/bookings', bookingData);
	},

	updateBooking: (id, bookingData) => {
		return api.patch(`/bookings/${id}`, bookingData);
	},

	cancelBooking: (id) => {
		return api.patch(`/bookings/${id}/cancel`);
	},
};
