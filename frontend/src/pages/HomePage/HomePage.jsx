import { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRooms } from '../../redux/thunks';
import {
	selectRoomFilters,
	selectRoomPagination,
	selectRooms,
	selectRoomSort,
	setFilters,
	setPagination,
	setSort,
} from '../../redux/slices';
import { HomeFilterPanel, Pagination, RoomCard, SortDropdown } from './components';

const HomePageContainer = ({ className }) => {
	const rooms = useSelector(selectRooms);
	const filters = useSelector(selectRoomFilters);
	const sort = useSelector(selectRoomSort);
	const pagination = useSelector(selectRoomPagination);
	const dispatch = useDispatch();

	const loadRooms = useCallback(() => {
		const params = {
			...filters,
			...sort,
			page: pagination.page,
			limit: pagination.limit,
		};

		dispatch(fetchRooms(params));
	}, [dispatch, filters, sort, pagination.page, pagination.limit]);

	useEffect(() => {
		loadRooms();
	}, [loadRooms]);

	const handleApplyFilters = (newFilters) => {
		dispatch(setFilters(newFilters));
		dispatch(setPagination({ ...pagination, page: 1 }));
	};

	const handleResetFilters = () => {
		dispatch(setFilters({}));
		dispatch(setPagination({ ...pagination, page: 1 }));
	};

	const handleSortChange = (sortBy, sortOrder) => {
		dispatch(setSort({ sortBy, sortOrder }));
		dispatch(setPagination({ ...pagination, page: 1 }));
	};

	const handlePageChange = (page) => {
		dispatch(setPagination({ ...pagination, page }));
	};

	return (
		<div className={className}>
			<h1>Доступные номера</h1>

			<div className='controls'>
				<HomeFilterPanel
					filters={filters}
					onApplyFilters={handleApplyFilters}
					onResetFilters={handleResetFilters}
				/>

				<SortDropdown sortBy={sort.sortBy} sortOrder={sort.sortOrder} onSortChange={handleSortChange} />
			</div>

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

			{pagination.totalPages > 1 && (
				<Pagination
					currentPage={pagination.page}
					totalPages={pagination.totalPages}
					onPageChange={handlePageChange}
				/>
			)}
			{rooms.length < 1 && (
				<div className='no-rooms'>
					<p>Номера не найдены</p>
					<p>Попробуйте изменить параметры фильтрации</p>
				</div>
			)}
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

	.controls {
		margin-bottom: 30px;
	}

	.rooms-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 20px;
	}

	.no-rooms {
		text-align: center;
		padding: 40px;
		background-color: #f9f9f9;
		border-radius: 8px;

		p {
			margin-bottom: 10px;
			color: #666;

			&:last-child {
				margin-bottom: 0;
				font-size: 14px;
			}
		}
	}
`;
