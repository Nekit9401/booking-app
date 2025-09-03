import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { roomsApi } from '../../redux/services';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms } from '../../redux/thunks';
import { selectRooms, setError } from '../../redux/slices';
import { RoomCard } from './components';

const HomePageContainer = ({ className }) => {
	const [roomTypes, setRoomTypes] = useState([]);
	const rooms = useSelector(selectRooms);
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchRoomsData = async () => {
			try {
				const roomTypesResponse = await roomsApi.getRoomTypes();

				if (!roomTypesResponse.data.data) {
					throw new Error('Ошибка в получении типов комнат');
				}

				setRoomTypes(roomTypesResponse.data.data);

				dispatch(fetchRooms());
			} catch (error) {
				setError(error.message);
			}
		};

		fetchRoomsData();
	}, [dispatch]);

	return (
		<div className={className}>
			<h1>Доступные номера</h1>
			<div className='rooms-grid'>
				{rooms.map(({ id, photos, number, type, price, guests }) => (
					<RoomCard
						key={id}
						id={id}
						photos={photos}
						number={number}
						typeId={type}
						roomTypes={roomTypes}
						price={price}
						guests={guests}
					/>
				))}
			</div>
		</div>
	);
};

export const HomePage = styled(HomePageContainer)`
	padding: 20px;

	& > h1 {
		text-align: center;
		margin-bottom: 30px;
		color: #1976d2;
	}

	.rooms-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 20px;
	}
`;
