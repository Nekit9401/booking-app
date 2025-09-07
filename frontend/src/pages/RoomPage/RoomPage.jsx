import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
	clearCurrentRoom,
	openModal,
	selectCurrentRoom,
	selectCurrentUser,
	setSuccessMessage,
} from '../../redux/slices';
import { useEffect, useState } from 'react';
import { deleteRoom, fetchRoom } from '../../redux/thunks';
import { getTypeRoomName } from '../../utils';
import { ROLE } from '../../constants';
import styled from 'styled-components';
import { Button, Modal } from '../../components';
import { BookingForm } from './components';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';

const RoomPageContainer = ({ className }) => {
	const { id } = useParams();
	const currentUser = useSelector(selectCurrentUser);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const room = useSelector(selectCurrentRoom);
	const [roomNotFound, setRoomNotFound] = useState(false);

	useEffect(() => {
		const fetchDataRoom = async () => {
			try {
				dispatch(clearCurrentRoom());
				await dispatch(fetchRoom(id)).unwrap();
			} catch (error) {
				console.error(error.message);
				setRoomNotFound(true);
			}
		};

		fetchDataRoom();
	}, [dispatch, id]);

	if (roomNotFound) return <NotFoundPage />;

	if (!room) return;

	const type = getTypeRoomName(room.type);
	const isAdmin = currentUser?.roleId === ROLE.ADMIN;

	const handleEditRoom = () => {
		navigate(`/room/${room.id}/edit`);
	};

	const onOpenModal = () => {
		dispatch(openModal());
	};

	const handleDeleteRoom = async () => {
		try {
			await dispatch(deleteRoom(room.id)).unwrap();

			dispatch(setSuccessMessage('Номер удален!'));

			navigate('/');
		} catch (error) {
			console.error('Ошибка удаления номера', error);
		}
	};

	return (
		<div className={className}>
			<Modal
				title={'Вы уверены, что хотите удалить номер? Все брони номера так же будут удалены.'}
				onConfirm={handleDeleteRoom}
			/>

			<div className='room-header'>
				<h1>
					Номер {room.number} - {type}
				</h1>
				{isAdmin && (
					<div className='admin-actions'>
						<Button onClick={handleEditRoom}>Редактировать</Button>
						<Button onClick={onOpenModal} variant='danger'>
							Удалить
						</Button>
					</div>
				)}
			</div>

			<div className='room-content'>
				<div className='room-gallery'>
					{room.photos && room.photos.length > 0 ? (
						room.photos.map((photo, index) => (
							<img key={index} src={photo} alt={`Номер ${room.number} - фото ${index + 1}`} />
						))
					) : (
						<div className='no-photos'>Фотографии отсутствуют</div>
					)}
				</div>

				<div className='room-details'>
					<h2>Информация о номере</h2>
					<p className='description'>{room.description}</p>

					<div className='room-features'>
						<div className='feature'>
							<span className='label'>Цена за сутки:</span>
							<span className='value'>{room.price} ₽</span>
						</div>
						<div className='feature'>
							<span className='label'>Вместимость:</span>
							<span className='value'>до {room.guests} гостя(ей)</span>
						</div>
						<div className='feature'>
							<span className='label'>Тип номера:</span>
							<span className='value'>{type}</span>
						</div>
					</div>
				</div>

				<div className='booking-section'>
					<h2>Забронировать номер</h2>

					{!currentUser ? (
						<div className='auth-prompt'>
							<p>
								Для бронирования необходимо <Link to='/login'>войти</Link> в систему
							</p>
						</div>
					) : isAdmin ? (
						<div className='auth-prompt'>
							<p>
								Бронирование недоступно для Администратора. Войдите в систему под пользовательским
								аккаунтом
							</p>
						</div>
					) : (
						<BookingForm room={room} />
					)}
				</div>
			</div>
		</div>
	);
};

export const RoomPage = styled(RoomPageContainer)`
	h2 {
		text-align: center;
		margin-top: 100px;
	}

	padding: 20px;
	max-width: 1200px;
	margin: 0 auto;

	.room-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30px;
		padding-bottom: 20px;
		border-bottom: 1px solid #eee;

		h1 {
			color: #1976d2;
			margin: 0;
		}
	}

	.admin-actions {
		display: flex;
		gap: 10px;
	}

	.room-content {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 40px;

		@media (max-width: 768px) {
			grid-template-columns: 1fr;
		}
	}

	.room-gallery {
		img {
			width: 100%;
			height: 300px;
			object-fit: cover;
			border-radius: 8px;
			margin-bottom: 15px;

			&:last-child {
				margin-bottom: 0;
			}
		}

		.no-photos {
			padding: 60px 20px;
			text-align: center;
			background-color: #f5f5f5;
			border-radius: 8px;
			color: #666;
		}
	}

	.room-details {
		h2 {
			color: #333;
			margin-top: 0;
		}

		.description {
			line-height: 1.6;
			color: #555;
			margin-bottom: 25px;
		}
	}

	.room-features {
		background-color: #f9f9f9;
		padding: 20px;
		border-radius: 8px;
		margin-bottom: 30px;

		.feature {
			display: flex;
			justify-content: space-between;
			margin-bottom: 10px;

			&:last-child {
				margin-bottom: 0;
			}

			.label {
				font-weight: 500;
				color: #333;
			}

			.value {
				color: #1976d2;
				font-weight: 600;
			}
		}
	}

	.booking-section {
		background-color: #f9f9f9;
		padding: 25px;
		border-radius: 8px;

		h2 {
			margin-top: 0;
		}

		.auth-prompt {
			text-align: center;
			padding: 20px;

			a {
				color: #1976d2;
				text-decoration: none;
				font-weight: 500;

				&:hover {
					text-decoration: underline;
				}
			}
		}
	}
`;
