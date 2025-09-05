import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { clearCurrentBooking, selectBookings, selectCurrentBooking, selectCurrentUser } from '../../redux/slices';
import { cancelBooking, fetchUserBookings } from '../../redux/thunks';
import { Button, FilterPanel, Modal } from '../../components';
import { BookingCard } from './components';
import { Link } from 'react-router-dom';

const BookingsPageContainer = ({ className }) => {
	const user = useSelector(selectCurrentUser);
	const bookings = useSelector(selectBookings);
	const dispatch = useDispatch();
	const currentBooking = useSelector(selectCurrentBooking);
	const [filter, setFilter] = useState('all');

	useEffect(() => {
		if (user) {
			dispatch(fetchUserBookings());
		}
	}, [dispatch, user]);

	if (!bookings) {
		return;
	}

	const filteredBookings = bookings.filter(({ status }) => {
		if (filter === 'all') return true;
		return status === filter;
	});

	const handleConfirmCancel = async () => {
		if (currentBooking) {
			await dispatch(cancelBooking(currentBooking.id));
			dispatch(clearCurrentBooking());
			dispatch(fetchUserBookings());
		}
	};

	return (
		<div className={className}>
			<Modal title={`Вы уверены, что хотите отменить бронирование номера?`} onConfirm={handleConfirmCancel} />

			<div className='page-header'>
				<h1>Мои бронирования</h1>
				<FilterPanel filter={filter} setFilter={setFilter} />
			</div>

			{bookings.length === 0 ? (
				<div className='no-bookings'>
					<p>У вас нет бронирований</p>
					<Link to='/'>
						<Button>Найти номер</Button>
					</Link>
				</div>
			) : filteredBookings.length === 0 && filter === 'cancelled' ? (
				<div className='no-bookings'>
					<p>Нет отмененных броней</p>
				</div>
			) : filteredBookings.length === 0 && filter === 'active' ? (
				<div className='no-bookings'>
					<p>Нет активных броней</p>
				</div>
			) : (
				<div className='booking-list'>
					{filteredBookings.map((booking) => (
						<BookingCard key={booking.id} booking={booking} />
					))}
				</div>
			)}
		</div>
	);
};

export const BookingsPage = styled(BookingsPageContainer)`
	padding: 20px;
	max-width: 1000px;
	margin: 0 auto;

	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30px;
		flex-wrap: wrap;
		gap: 15px;

		h1 {
			color: #1976d2;
			margin: 0;
		}
	}

	.no-bookings {
		text-align: center;
		padding: 40px;
		background-color: #f9f9f9;
		border-radius: 8px;

		p {
			margin-bottom: 20px;
			color: #666;
		}
	}

	.bookings-list {
		display: flex;
		flex-direction: column;
		gap: 15px;
	}
`;
