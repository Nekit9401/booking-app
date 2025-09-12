import { configureStore } from '@reduxjs/toolkit';
import { appReduсer, authReduсer, bookingReducer, reviewReducer, roomReducer } from './slices';

export const store = configureStore({
	reducer: {
		app: appReduсer,
		auth: authReduсer,
		bookings: bookingReducer,
		room: roomReducer,
		review: reviewReducer,
	},
});
