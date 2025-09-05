import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../../components';
import { selectAppLoading } from '../../../../redux/slices';
import { createBooking } from '../../../../redux/thunks';
import { formateDate } from '../../../../utils';
import { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';

registerLocale('ru', ru);

const BookingFormContainer = ({ className, room }) => {
	const [checkIn, setCheckIn] = useState(null);
	const [checkOut, setCheckOut] = useState(null);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const isLoading = useSelector(selectAppLoading);

	const handleCheckInChange = (date) => {
		if (error) {
			setError(null);
		}
		setCheckIn(date);
	};

	const handleCheckOutChange = (date) => {
		if (error) {
			setError(null);
		}
		setCheckOut(date);
	};

	const handleBook = async () => {
		if (!checkIn || !checkOut) {
			setError('Выберите даты заезда и выезда');
			return;
		}

		const checkInDate = new Date(checkIn);
		const checkOutDate = new Date(checkOut);

		if (checkInDate >= checkOutDate) {
			setError('Дата выезда должна быть позже даты заезда');
			return;
		}

		const isOverlapping = room.bookings?.some((booking) => {
			const bookingCheckIn = new Date(booking.checkIn);

			const bookingCheckOut = new Date(booking.checkOut);

			return (
				(checkInDate >= bookingCheckIn && checkInDate < bookingCheckOut) ||
				(checkOutDate > bookingCheckIn && checkOutDate <= bookingCheckOut) ||
				(checkInDate <= bookingCheckIn && checkOutDate >= bookingCheckOut)
			);
		});

		if (isOverlapping) {
			setError('Выбранные даты пересекаются с существующим бронированием');
			return;
		}

		setError('');

		dispatch(
			createBooking({
				room: room.id,
				checkIn: checkInDate.toISOString(),
				checkOut: checkOutDate.toISOString(),
			}),
		);
	};

	const isDateDisabled = (date) => {
		const currentDate = new Date(date);

		if (currentDate < new Date()) {
			return false;
		}

		const isAvailable = !room.bookings?.some((booking) => {
			const bookingCheckIn = new Date(booking.checkIn);
			const bookingCheckOut = new Date(booking.checkOut);
			return currentDate >= bookingCheckIn && currentDate < bookingCheckOut;
		});

		return isAvailable;
	};

	return (
		<div className={className}>
			<div className='booking-form'>
				<div className='form-group'>
					<label>Дата заезда:</label>
					<DatePicker
						selected={checkIn}
						onChange={handleCheckInChange}
						selectsStart
						startDate={checkIn}
						endDate={checkOut}
						minDate={new Date()}
						filterDate={isDateDisabled}
						placeholderText='Выберите дату заезда'
						className='date-picker'
						locale='ru'
						dateFormat='dd.MM.yyyy'
					/>
				</div>

				<div className='form-group'>
					<label>Дата выезда:</label>
					<DatePicker
						selected={checkOut}
						onChange={handleCheckOutChange}
						selectsEnd
						startDate={checkIn}
						endDate={checkOut}
						minDate={checkIn || new Date()}
						filterDate={isDateDisabled}
						placeholderText='Выберите дату выезда'
						className='date-picker'
						locale='ru'
						dateFormat='dd.MM.yyyy'
					/>
				</div>

				<Button onClick={handleBook} disabled={isLoading || !checkIn || !checkOut || error}>
					{isLoading ? 'Бронирование...' : 'Забронировать'}
				</Button>

				{error && <div className='error-message'>{error}</div>}
			</div>

			<div className='booking-info'>
				<h3>Занятые даты:</h3>
				{room.bookings && room.bookings.length > 0 ? (
					<ul>
						{room.bookings.map((booking, index) => (
							<li key={index}>
								{formateDate(booking.checkIn)} - {formateDate(booking.checkOut)}
							</li>
						))}
					</ul>
				) : (
					<p>Нет активных бронирований</p>
				)}
			</div>
		</div>
	);
};

export const BookingForm = styled(BookingFormContainer)`
	.booking-form {
		display: flex;
		flex-direction: column;
		gap: 15px;
		margin-bottom: 20px;
	}

	.form-group {
		display: flex;
		flex-direction: column;

		label {
			font-weight: 500;
			margin-bottom: 5px;
		}
	}

	.date-picker {
		padding: 10px;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 16px;
	}

	.error-message {
		color: #d32f2f;
		padding: 10px;
		background-color: #ffebee;
		border-radius: 4px;
		border-left: 4px solid #d32f2f;
	}

	.booking-info {
		background-color: #f9f9f9;
		padding: 15px;
		border-radius: 8px;

		h3 {
			margin-top: 0;
			margin-bottom: 10px;
		}

		ul {
			margin: 0;
			padding-left: 20px;
		}

		li {
			margin-bottom: 5px;
		}
	}
`;
