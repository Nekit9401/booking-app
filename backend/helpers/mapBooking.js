const formateDate = require('./formateDate');

module.exports = (booking) => {
	return {
		id: booking.id,
		user: booking.user.login,
		room: {
			id: booking.room._id,
			number: booking.room.number,
		},
		checkIn: formateDate(booking.checkIn),
		checkOut: formateDate(booking.checkOut),
		status: booking.status,
		publishedAt: formateDate(booking.createdAt),
	};
};
