module.exports = (room) => {
	const mappedRooms = {
		id: room._id,
		number: room.number,
		type: room.type,
		description: room.description,
		price: room.price,
		guests: room.guests,
		photos: room.photos,
	};

	if (room.bookings) {
		return {
			...mappedRooms,
			bookings: room.bookings.map((booking) => ({
				checkIn: booking.checkIn,
				checkOut: booking.checkOut,
			})),
		};
	}

	return mappedRooms;
};
