import { ROOM_TYPES } from '../constants';

export const getTypeRoomName = (typeId) => {
	let type;

	Object.entries(ROOM_TYPES).forEach(([, { id, name }]) => {
		if (id === typeId) {
			type = name;
		}
	});

	return type;
};
