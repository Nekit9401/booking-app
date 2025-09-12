import { createSlice } from '@reduxjs/toolkit';
import { fetchRoomReviews, createReview, deleteReview } from '../thunks/reviewsThunks';

const initialState = {
	items: [],
};

const reviewSlice = createSlice({
	name: 'review',
	initialState,
	reducers: {
		clearReviews: (state) => {
			state.items = [];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRoomReviews.fulfilled, (state, action) => {
				state.items = action.payload.data;
			})
			.addCase(createReview.fulfilled, (state, action) => {
				state.items.push(action.payload.data);
			})
			.addCase(deleteReview.fulfilled, (state, action) => {
				state.items = state.items.filter((item) => item.id !== action.payload.id);
			});
	},
});

export const { clearReviews } = reviewSlice.actions;

export const selectReviews = (state) => state.review.items;

export const { reducer: reviewReducer } = reviewSlice;
