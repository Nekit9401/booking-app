import { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms } from '../../redux/thunks';
import { selectRooms } from '../../redux/slices';
import { RoomCard } from './components';

const HomePageContainer = ({ className }) => {
	const rooms = useSelector(selectRooms);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchRooms());
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
