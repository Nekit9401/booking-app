import { createAsyncThunk } from '@reduxjs/toolkit';
import { reviewsApi } from '../services';

export const fetchRoomReviews = createAsyncThunk('reviews/fetchRoomReviews', async (roomId, { rejectWithValue }) => {
	try {
		const response = await reviewsApi.getRoomReviews(roomId);
		return response.data;
	} catch (error) {
		return rejectWithValue(error.response?.data || { error: 'Ошибка сети' });
	}
});

export const createReview = createAsyncThunk(
	'reviews/createReview',
	async ({ roomId, reviewData }, { rejectWithValue }) => {
		try {
			const response = await reviewsApi.createReview(roomId, reviewData);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response?.data || { error: 'Ошибка сети' });
		}
	},
);

export const deleteReview = createAsyncThunk(
	'reviews/deleteReview',
	async ({ roomId, reviewId }, { rejectWithValue }) => {
		try {
			await reviewsApi.deleteReview(roomId, reviewId);
			return { id: reviewId };
		} catch (error) {
			return rejectWithValue(error.response?.data || { error: 'Ошибка сети' });
		}
	},
);
