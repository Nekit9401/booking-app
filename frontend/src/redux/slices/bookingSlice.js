import { createSlice } from '@reduxjs/toolkit';
import { cancelBooking, createBooking, fetchAllBookings, fetchUserBookings, updateBooking } from '../thunks';

const initialState = {
	items: [],
	currentBooking: null,
};

const bookingSlice = createSlice({
	name: 'bookings',
	initialState,
	reducers: {
		setCurrentBooking: (state, action) => {
			state.currentBooking = action.payload;
		},
		clearCurrentBooking: (state) => {
			state.currentBooking = null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchUserBookings.fulfilled, (state, action) => {
			state.items = action.payload.data;
		});
		builder.addCase(fetchAllBookings.fulfilled, (state, action) => {
			state.items = action.payload.data;
		});
		builder.addCase(createBooking.fulfilled, (state, action) => {
			state.items.push(action.payload.data);
		});
		builder.addCase(updateBooking.fulfilled, (state, action) => {
			const index = state.items.findIndex((item) => item.id === action.payload.data.id);
			if (index != -1) {
				state.items[index] = action.payload.data;
			}
		});
		builder.addCase(cancelBooking.fulfilled, (state, action) => {
			const index = state.items.findIndex((item) => item.id === action.payload.id);
			if (index != -1) {
				state.items[index] = action.payload.data;
			}
		});
	},
});

export const { setCurrentBooking, clearCurrentBooking } = bookingSlice.actions;

export const selectBookings = (state) => state.bookings.items;
export const selectCurrentBooking = (state) => state.bookings.currentBooking;

export const { reducer: bookingReducer } = bookingSlice;
