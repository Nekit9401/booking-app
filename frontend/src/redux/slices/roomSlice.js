import { createSlice } from '@reduxjs/toolkit';
import { createRoom, deleteRoom, fetchRoom, fetchRooms, updateRoom } from '../thunks';

const initialState = {
	items: [],
	currentRoom: null,
};

const roomSlice = createSlice({
	name: 'room',
	initialState,
	reducers: {
		setCurrentRoom: (state, action) => {
			state.currentRoom = action.payload;
		},
		clearCurrentRoom: (state) => {
			state.currentRoom = null;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchRooms.fulfilled, (state, action) => {
			state.items = action.payload.data;
		});
		builder.addCase(fetchRoom.fulfilled, (state, action) => {
			state.currentRoom = action.payload.data;
		});
		builder.addCase(createRoom.fulfilled, (state, action) => {
			state.items.push(action.payload.data);
			state.currentRoom = action.payload.data;
		});
		builder.addCase(updateRoom.fulfilled, (state, action) => {
			const index = state.items.findIndex((item) => item.id === action.payload.data.id);
			if (index !== -1) {
				state.items[index] = action.payload.data;
			}
			if (state.currentRoom && state.currentRoom.id === action.payload.data.id) {
				state.currentRoom = action.payload.data;
			}
		});
		builder.addCase(deleteRoom.fulfilled, (state, action) => {
			state.items = state.items.filter((item) => item.id !== action.payload.id);
			if (state.currentRoom && state.currentRoom.id === action.payload.id) {
				state.currentRoom = null;
			}
		});
	},
});

export const { setCurrentRoom, clearCurrentRoom } = roomSlice.actions;

export const selectRooms = (state) => state.room.items;
export const selectCurrentRoom = (state) => state.room.currentRoom;

export const { reducer: roomReducer } = roomSlice;
