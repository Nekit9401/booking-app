import { api } from '../constants';

export const reviewsApi = {
	getRoomReviews: (roomId) => {
		return api.get(`/rooms/${roomId}/reviews`);
	},

	createReview: (roomId, reviewData) => {
		return api.post(`/rooms/${roomId}/reviews`, reviewData);
	},

	deleteReview: (roomId, reviewId) => {
		return api.delete(`/rooms/${roomId}/reviews/${reviewId}`);
	},
};
