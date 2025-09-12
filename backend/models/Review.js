const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
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
		comment: {
			type: String,
			required: true,
			maxlength: 500,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);
