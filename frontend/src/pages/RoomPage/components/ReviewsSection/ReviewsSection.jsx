import { useState } from 'react';
import styled from 'styled-components';
import { withAdminAccessUI } from '../../../../hocks';
import { Button } from '../../../../components';

const ReviewsSectionContainer = ({ className, reviews, currentUser, isAdmin, onCreateReview, onDeleteReview }) => {
	const [showForm, setShowForm] = useState(false);
	const [comment, setComment] = useState('');

	const handleSubmitReview = async (e) => {
		e.preventDefault();
		await onCreateReview(comment);
		setComment('');
		setShowForm(false);
	};

	return (
		<div className={className}>
			{reviews.length === 0 ? (
				<p>Пока нет отзывов. Будьте первым!</p>
			) : (
				<div className='reviews-list'>
					{reviews.map((review) => (
						<div key={review.id} className='review-item'>
							{isAdmin && (
								<button
									className='delete-button'
									onClick={() => onDeleteReview(review.id)}
									title='Удалить отзыв'
								>
									×
								</button>
							)}
							<div className='review-header'>
								<span className='user'>{review.user}</span>
								<span className='date'>{review.publishedAt}</span>
							</div>
							<p className='comment'>{review.comment}</p>
						</div>
					))}
				</div>
			)}

			{currentUser && !isAdmin && !showForm && (
				<Button className='add-button' onClick={() => setShowForm(true)}>
					Добавить отзыв
				</Button>
			)}

			{showForm && (
				<form onSubmit={handleSubmitReview} className='review-form'>
					<h3>Добавить отзыв</h3>

					<div className='form-group'>
						<label htmlFor='comment'>Комментарий:</label>
						<textarea
							id='comment'
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							required
							rows='4'
							maxLength='500'
						/>
					</div>

					<div className='form-actions'>
						<Button type='submit'>Отправить</Button>
						<Button type='button' onClick={() => setShowForm(false)}>
							Отмена
						</Button>
					</div>
				</form>
			)}
		</div>
	);
};

const ReviewsSectionStyled = styled(ReviewsSectionContainer)`
	padding: 20px;
	text-align: center;
	border-top: 1px solid #eee;

	.reviews-list {
		margin-bottom: 30px;
	}

	.review-item {
		position: relative;
		background-color: #f9f9f9;
		border-radius: 8px;
		padding: 20px;
		margin-bottom: 20px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

		&:last-child {
			margin-bottom: 0;
		}

		.delete-button {
			position: absolute;
			top: 10px;
			right: 10px;
			width: 24px;
			height: 24px;
			border-radius: 50%;
			background-color: #ff4d4f;
			color: white;
			border: none;
			cursor: pointer;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 18px;
			line-height: 1;
			padding: 0;
			transition: background-color 0.2s;
		}

		.delete-button:hover {
			background-color: #d9363e;
		}

		.review-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 15px;
			flex-wrap: wrap;
			padding-right: 30px;

			.user {
				font-weight: 600;
				color: #1976d2;
				margin-right: 15px;
			}

			.date {
				color: #777;
				font-size: 14px;
			}
		}

		.comment {
			line-height: 1.6;
			color: #555;
			margin: 0;
		}

		.review-actions {
			margin-top: 15px;
			display: flex;
			justify-content: flex-end;
		}
	}

	.add-button {
		margin-top: 15px;
	}

	.review-form {
		background-color: #f9f9f9;
		padding: 25px;
		border-radius: 8px;
		margin-bottom: 20px;

		h3 {
			margin-top: 0;
			margin-bottom: 20px;
			color: #333;
		}

		.form-group {
			margin-bottom: 20px;

			label {
				display: block;
				margin-bottom: 8px;
				font-weight: 500;
				color: #333;
			}

			textarea {
				width: 100%;
				padding: 12px;
				border: 1px solid #ddd;
				border-radius: 4px;
				font-family: inherit;
				font-size: 14px;
				transition: border-color 0.2s;
				min-height: 120px;
				resize: vertical;

				&:focus {
					outline: none;
					border-color: #1976d2;
					box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
				}
			}
		}

		.form-actions {
			display: flex;
			gap: 10px;
			justify-content: flex-end;
		}
	}
`;

export const ReviewsSection = withAdminAccessUI(ReviewsSectionStyled);
