import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getTypeRoomName } from '../../../../utils';

const RoomCardContainer = ({ className, id, photos, number, typeId, price, guests }) => {
	const type = getTypeRoomName(typeId);

	return (
		<div className={className}>
			<Link to={`room/${id}`}>
				<img src={`http://localhost:3002${photos[0]}`} alt={number} className='room-image' />
				<div className='room-info'>
					<h3>Номер {number}</h3>
					<p className='room-type'>{type}</p>
					<div className='room-details'>
						<span>Цена: {price} ₽/сутки</span>
						<span>Гостей: до {guests}</span>
					</div>
				</div>
			</Link>
		</div>
	);
};

export const RoomCard = styled(RoomCardContainer)`
	background: white;
	border-radius: 8px;
	overflow: hidden;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	transition: transform 0.3s ease;

	&:hover {
		transform: translateY(-5px);
	}

	.room-image {
		width: 100%;
		height: 200px;
		object-fit: cover;
	}

	.room-info {
		padding: 20px;
	}

	.room-type {
		color: #666;
		font-style: italic;
		margin-bottom: 10px;
	}

	.room-details {
		display: flex;
		justify-content: space-between;
		margin-bottom: 15px;
		font-weight: 500;
	}
`;
