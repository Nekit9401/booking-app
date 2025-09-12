const formateDate = require('./formateDate');

module.exports = (review) => {
	return {
		id: review.id,
		user: review.user.login,
		comment: review.comment,
		publishedAt: formateDate(review.createdAt),
	};
};
