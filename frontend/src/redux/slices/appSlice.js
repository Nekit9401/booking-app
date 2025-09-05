import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoading: false,
	error: null,
	authError: null,
	isModalOpen: false,
};

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setError: (state, action) => {
			state.error = action.payload;
		},
		clearError: (state) => {
			state.error = null;
		},
		setAuthError: (state, action) => {
			state.authError = action.payload;
		},
		clearAuthError: (state) => {
			state.authError = null;
		},
		openModal: (state) => {
			state.isModalOpen = true;
		},
		closeModal: (state) => {
			state.isModalOpen = false;
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

				if (action.payload?.isAuthError) {
					return;
				}

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

export const { setError, clearError, setAuthError, openModal, closeModal, clearAuthError } = appSlice.actions;

export const selectAppLoading = (state) => state.app.isLoading;
export const selectAppError = (state) => state.app.error;
export const selectAppAuthError = (state) => state.app.authError;
export const selectisModalOpen = (state) => state.app.isModalOpen;

export const { reducer: appReduсer } = appSlice;
