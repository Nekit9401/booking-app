import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser, logoutUser } from '../thunks';

const initialState = {
	user: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(loginUser.fulfilled, (state, action) => {
			state.user = action.payload.user;
		});
		builder.addCase(registerUser.fulfilled, (state, action) => {
			state.user = action.payload.user;
		});
		builder.addCase(logoutUser.fulfilled, (state) => {
			state.user = initialState.user;
		});
		builder.addCase(logoutUser.rejected, (state) => {
			state.user = initialState.user;
		});
	},
});

export const selectCurrentUser = (state) => state.auth.user;

export const { reducer: authReduсer } = authSlice;
