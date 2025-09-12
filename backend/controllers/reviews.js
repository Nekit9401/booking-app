const Review = require('../models/Review');
const Room = require('../models/Room');

const createReview = async (roomId, user, comment) => {
	const room = await Room.findById(roomId);

	if (!room) {
		throw new Error('Комната не найдена');
	}

	const review = await Review.create({
		user,
		room,
		comment,
	});

	await review.populate('user', 'login');

	return review;
};

const getRoomReviews = async (room) => {
	const reviews = await Review.find({ room }).populate('user', 'login').sort({ createdAt: -1 });

	return reviews;
};

const deleteReview = async (reviewId) => {
	const review = await Review.findById(reviewId);

	if (!review) {
		throw new Error('Отзыв не найден');
	}

	await Review.findByIdAndDelete(reviewId);
};

module.exports = {
	createReview,
	getRoomReviews,
	deleteReview,
};
