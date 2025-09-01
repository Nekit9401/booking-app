import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../services';

export const loginUser = createAsyncThunk('auth/login', async ({ login, password }, { rejectWithValue }) => {
	try {
		const response = await authApi.login(login, password);
		return response.data;
	} catch (error) {
		return rejectWithValue(error.response?.data || { error: 'Ошибка сети' });
	}
});

export const registerUser = createAsyncThunk('auth/register', async ({ login, password }, { rejectWithValue }) => {
	try {
		const response = await authApi.register(login, password);
		return response.data;
	} catch (error) {
		return rejectWithValue(error.response?.data || { error: 'Ошибка сети' });
	}
});

export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
	try {
		await authApi.logout();
		return null;
	} catch (error) {
		return rejectWithValue(error.message);
	}
});
