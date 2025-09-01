import { createAsyncThunk } from '@reduxjs/toolkit';
import { bookingApi } from '../services';

export const fetchUserBookings = createAsyncThunk('bookings/fetchUserBookings', async (_, { rejectWithValue }) => {
	try {
		const response = await bookingApi.getMyBookings();
		return response.data;
	} catch (error) {
		return rejectWithValue(error.response?.data || { error: 'Ошибка сети' });
	}
});

export const fetchAllBookings = createAsyncThunk('bookings/fetchAllBookings', async (_, { rejectWithValue }) => {
	try {
		const response = await bookingApi.getAllBookings();
		return response.data;
	} catch (error) {
		return rejectWithValue(error.response?.data || { error: 'Ошибка сети' });
	}
});

export const createBooking = createAsyncThunk('bookings/createBooking', async (bookingData, { rejectWithValue }) => {
	try {
		const response = await bookingApi.createBooking(bookingData);
		return response.data;
	} catch (error) {
		return rejectWithValue(error.response?.data || { error: 'Ошибка сети' });
	}
});

export const updateBooking = createAsyncThunk(
	'bookings/updateBooking',
	async ({ bookingId, bookingData }, { rejectWithValue }) => {
		try {
			const response = await bookingApi.updateBooking(bookingId, bookingData);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response?.data || { error: 'Ошибка сети' });
		}
	},
);

export const cancelBooking = createAsyncThunk('bookings/cancelBooking', async (bookingId, { rejectWithValue }) => {
	try {
		const response = await bookingApi.cancelBooking(bookingId);
		return response.data;
	} catch (error) {
		return rejectWithValue(error.response?.data || { error: 'Ошибка сети' });
	}
});
