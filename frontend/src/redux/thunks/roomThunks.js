import { createAsyncThunk } from '@reduxjs/toolkit';
import { roomsApi } from '../services';

export const fetchRooms = createAsyncThunk('rooms/fetchRooms', async (params = {}, { rejectWithValue }) => {
	try {
		const response = await roomsApi.getRooms(params);
		return response.data;
	} catch (error) {
		return rejectWithValue(error.response?.data || { error: 'Ошибка сети' });
	}
});

export const fetchRoom = createAsyncThunk('rooms/fetchRoom', async (roomId, { rejectWithValue }) => {
	try {
		const response = await roomsApi.getRoom(roomId);
		return response.data;
	} catch (error) {
		return rejectWithValue(error.response?.data || { error: 'Ошибка сети' });
	}
});

export const createRoom = createAsyncThunk('rooms/createRoom', async (roomData, { rejectWithValue }) => {
	try {
		const response = await roomsApi.createRoom(roomData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return response.data;
	} catch (error) {
		return rejectWithValue(error.response?.data || { error: 'Ошибка сети' });
	}
});

export const updateRoom = createAsyncThunk('rooms/updateRoom', async ({ roomId, roomData }, { rejectWithValue }) => {
	try {
		const response = await roomsApi.updateRoom(roomId, roomData);
		return response.data;
	} catch (error) {
		return rejectWithValue(error.response?.data || { error: 'Ошибка сети' });
	}
});

export const deleteRoom = createAsyncThunk('rooms/deleteRoom', async (roomId, { rejectWithValue }) => {
	try {
		await roomsApi.deleteRoom(roomId);
		return { id: roomId };
	} catch (error) {
		return rejectWithValue(error.response?.data || { error: 'Ошибка сети' });
	}
});
