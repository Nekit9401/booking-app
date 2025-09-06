import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
	clearCurrentBooking,
	selectBookings,
	selectCurrentBooking,
	selectCurrentUser,
	setSuccessMessage,
} from '../../redux/slices';
import { useEffect, useState } from 'react';
import { ROLE } from '../../constants';
import { cancelBooking, fetchAllBookings } from '../../redux/thunks';
import { Button, FilterPanel, Modal } from '../../components';
import { Link } from 'react-router-dom';
import { BookingCardForAdmin } from './components';

const AdminPageContainer = ({ className }) => {
	const user = useSelector(selectCurrentUser);
	const bookings = useSelector(selectBookings);
	const dispatch = useDispatch();
	const currentBooking = useSelector(selectCurrentBooking);
	const [filter, setFilter] = useState('all');

	useEffect(() => {
		if (user.roleId === ROLE.ADMIN) {
			dispatch(fetchAllBookings());
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
		try {
			if (currentBooking) {
				await dispatch(cancelBooking(currentBooking.id)).unwrap();
				dispatch(setSuccessMessage('Бронирование пользователя отменено!'));
				dispatch(clearCurrentBooking());
				dispatch(fetchAllBookings());
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className={className}>
			<Modal title={`Вы уверены, что хотите отменить бронирование номера?`} onConfirm={handleConfirmCancel} />

			<div className='page-header'>
				<h1>Панель администратора</h1>
				<div className='admin-actions'>
					<Link to='/room/create'>
						<Button>Добавить новый номер</Button>
					</Link>
				</div>
			</div>

			<div className='booking-section'>
				<div className='section-header'>
					<h2>Все бронирования</h2>
					<FilterPanel filter={filter} setFilter={setFilter} />
				</div>

				{bookings.length === 0 ? (
					<div className='no-bookings'>
						<p>Бронирования не найдены</p>
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
					<div className='booking-table'>
						<div className='table-header'>
							<div>Пользователь</div>
							<div>Номер</div>
							<div>Дата заезда</div>
							<div>Дата выезда</div>
							<div>Статус</div>
							<div>Действия</div>
						</div>
						{filteredBookings.map((booking) => (
							<BookingCardForAdmin key={booking.id} booking={booking} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export const AdminPage = styled(AdminPageContainer)`
	padding: 20px;
	max-width: 1200px;
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

	.bookings-section {
		background: white;
		border-radius: 8px;
		padding: 20px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
		flex-wrap: wrap;
		gap: 15px;

		h2 {
			margin: 0;
			color: #333;
		}
	}

	.no-bookings {
		text-align: center;
		padding: 40px;
		background-color: #f9f9f9;
		border-radius: 8px;

		p {
			color: #666;
		}
	}

	.bookings-table {
		display: flex;
		flex-direction: column;
		border: 1px solid #eee;
		border-radius: 4px;
		overflow: hidden;
	}

	.table-header {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 120px;
		background-color: #f5f5f5;
		font-weight: 600;
		padding: 15px;

		& > div {
			padding: 0 10px;
		}
	}
`;
