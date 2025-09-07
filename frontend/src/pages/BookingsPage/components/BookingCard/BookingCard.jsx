import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { openModal, setCurrentBooking } from '../../../../redux/slices';
import { Button } from '../../../../components';

const BookingCardContainer = ({ className, booking }) => {
	const { status, checkIn, checkOut, room } = booking;

	const dispatch = useDispatch();

	const onCancelBooking = () => {
		dispatch(setCurrentBooking(booking));
		dispatch(openModal());
	};

	return (
		<div className={className}>
			<div className={`booking-card ${status}`}>
				<div className='booking-info'>
					<h3>Номер {room.number}</h3>
					<div className='dates'>
						<span>Заезд: {checkIn}</span>
						<span>Выезд: {checkOut}</span>
					</div>
					<div className={`status ${status}`}>Статус: {status === 'active' ? 'Активно' : 'Отменено'}</div>
				</div>

				{status === 'active' && (
					<div className='booking-actions'>
						<Button variant='danger' onClick={onCancelBooking}>
							Отменить
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export const BookingCard = styled(BookingCardContainer)`
	.booking-card {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px;
		background: white;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		transition: transform 0.2s;

		&:hover {
			transform: translateY(-2px);
		}

		&.cancelled {
			opacity: 0.7;
			background-color: #f9f9f9;
		}

		.booking-info {
			h3 {
				margin: 0 0 10px 0;
				color: #333;
			}

			.dates {
				display: flex;
				gap: 20px;
				margin-bottom: 10px;

				span {
					color: #666;
				}
			}

			.status {
				font-weight: 500;

				&.active {
					color: #388e3c;
				}

				&.cancelled {
					color: #d32f2f;
				}
			}
		}

		.booking-actions {
			display: flex;
			gap: 10px;
		}
	}
`;
