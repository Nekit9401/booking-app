import { createSlice } from '@reduxjs/toolkit';
import { createRoom, deleteRoom, fetchRoom, fetchRooms, updateRoom } from '../thunks';

const initialState = {
	items: [],
	currentRoom: null,
	pagination: {
		page: 1,
		limit: 6,
		totalCount: 0,
		totalPages: 1,
	},
	filters: {},
	sort: {
		sortBy: 'price',
		sortOrder: 'asc',
	},
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
		setFilters: (state, action) => {
			state.filters = action.payload;
		},
		setSort: (state, action) => {
			state.sort = action.payload;
		},
		setPagination: (state, action) => {
			state.pagination = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchRooms.fulfilled, (state, action) => {
			state.items = action.payload.data;
			state.pagination = action.payload.pagination;
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

export const { setCurrentRoom, clearCurrentRoom, setFilters, setSort, setPagination } = roomSlice.actions;

export const selectRooms = (state) => state.room.items;
export const selectCurrentRoom = (state) => state.room.currentRoom;
export const selectRoomFilters = (state) => state.room.filters;
export const selectRoomSort = (state) => state.room.sort;
export const selectRoomPagination = (state) => state.room.pagination;

export const { reducer: roomReducer } = roomSlice;
