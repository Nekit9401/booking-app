import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoading: false,
	error: null,
};

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			(action) => action.type.endsWith('/pending'),
			(state) => {
				state.isLoading = true;
				state.error = null;
			},
		);
		builder.addMatcher(
			(action) => action.type.endsWith('/rejected'),
			(state, action) => {
				state.isLoading = false;
				state.error = action.payload?.error || 'Произошла ошибка';
			},
		);
		builder.addMatcher(
			(action) => action.type.endsWith('/fulfilled'),
			(state) => {
				state.isLoading = false;
				state.error = null;
			},
		);
	},
});

export const { clearError } = appSlice.actions;

export const selectAppLoading = (state) => state.app.isLoading;
export const selectAppError = (state) => state.app.error;

export const { reducer: appReduсer } = appSlice;
