const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		room: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Room',
			required: true,
		},
		checkIn: {
			type: Date,
			required: true,
		},
		checkOut: {
			type: Date,
			required: true,
		},
		status: {
			type: String,
			enum: ['active', 'cancelled'],
			default: 'active',
		},
	},
	{ timestamps: true }
);

BookingSchema.index({ room: 1, checkIn: 1, checkOut: 1 });

module.exports = mongoose.model('Booking', BookingSchema);
