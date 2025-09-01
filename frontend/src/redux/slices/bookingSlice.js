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
			state.items = action.payload;
		});
		builder.addCase(fetchAllBookings.fulfilled, (state, action) => {
			state.items = action.payload;
		});
		builder.addCase(createBooking.fulfilled, (state, action) => {
			state.items.push(action.payload);
		});
		builder.addCase(updateBooking.fulfilled, (state, action) => {
			const index = state.items.findIndex((item) => item.id === action.payload.id);
			if (index != -1) {
				state.items[index] = action.payload;
			}
		});
		builder.addCase(cancelBooking.fulfilled, (state, action) => {
			const index = state.items.findIndex((item) => item.id === action.payload.id);
			if (index != -1) {
				state.items[index] = action.payload;
			}
		});
	},
});

export const { setCurrentBooking, clearCurrentBooking } = bookingSlice.actions;

export const selectBookings = (state) => state.bookings.items;
export const selectCurrentBooking = (state) => state.bookings.currentBooking;

export const { reducer: bookingReducer } = bookingSlice;
