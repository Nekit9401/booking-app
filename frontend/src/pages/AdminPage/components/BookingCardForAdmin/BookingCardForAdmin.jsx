import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { openModal, setCurrentBooking } from '../../../../redux/slices';
import { Button } from '../../../../components';

const BookingCardForAdminContainer = ({ className, booking }) => {
	const { user, status, checkIn, checkOut, room } = booking;

	const dispatch = useDispatch();

	const onCancelBooking = () => {
		dispatch(setCurrentBooking(booking));
		dispatch(openModal());
	};

	return (
		<div className={className}>
			<div>{user}</div>
			<div>Номер {room.number}</div>
			<div>{checkIn}</div>
			<div>{checkOut}</div>
			<div className={`status ${status}`}>{status === 'active' ? 'Активно' : 'Отменено'}</div>
			<div className='actions'>
				{status === 'active' && (
					<Button variant='danger' size='small' onClick={onCancelBooking}>
						Отменить
					</Button>
				)}
			</div>
		</div>
	);
};

export const BookingCardForAdmin = styled(BookingCardForAdminContainer)`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 120px;
	padding: 15px;
	border-bottom: 1px solid #eee;
	align-items: center;

	&:last-child {
		border-bottom: none;
	}

	&:hover {
		background-color: #f9f9f9;
	}

	& > div {
		padding: 0 10px;
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

	.actions {
		display: flex;
		justify-content: center;
	}
`;
