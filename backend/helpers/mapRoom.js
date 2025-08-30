module.exports = (room) => {
	return {
		id: room.id,
		number: room.number,
		type: room.type,
		description: room.description,
		price: room.price,
		guests: room.guests,
		photos: room.photos,
	};
};
