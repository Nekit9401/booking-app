import styled from 'styled-components';
import { ROOM_TYPES } from '../../../../constants';
import { useEffect, useState } from 'react';

const HomeFilterPanelContainer = ({ className, filters, onApplyFilters, onResetFilters }) => {
	const [localFilters, setLocalFilters] = useState({
		type: '',
		minPrice: '',
		maxPrice: '',
		guests: '',
	});

	useEffect(() => {
		setLocalFilters({
			type: filters.type || '',
			minPrice: filters.minPrice || '',
			maxPrice: filters.maxPrice || '',
			guests: filters.guests || '',
		});
	}, [filters.guests, filters.maxPrice, filters.minPrice, filters.type]);

	const handleTypeChange = (e) => {
		const value = e.target.value;
		setLocalFilters((prev) => ({
			...prev,
			type: value,
		}));
	};

	const handleMinPriceChange = (e) => {
		const value = e.target.value;
		setLocalFilters((prev) => ({
			...prev,
			minPrice: value,
		}));
	};

	const handleMaxPriceChange = (e) => {
		const value = e.target.value;
		setLocalFilters((prev) => ({
			...prev,
			maxPrice: value,
		}));
	};

	const handleGuestsChange = (e) => {
		const value = e.target.value;
		setLocalFilters((prev) => ({
			...prev,
			guests: value,
		}));
	};

	const handleApply = () => {
		onApplyFilters(localFilters);
	};

	const handleReset = () => {
		const resetFilters = {
			type: '',
			minPrice: '',
			maxPrice: '',
			guests: '',
		};
		setLocalFilters(resetFilters);
		onResetFilters();
	};

	return (
		<div className={className}>
			<div className='filter-group'>
				<label>Тип номера:</label>
				<select value={localFilters.type} onChange={handleTypeChange}>
					<option value=''>Все типы</option>
					{Object.entries(ROOM_TYPES).map(([, { id: typeId, name: typeName }]) => (
						<option key={typeId} value={typeId}>
							{typeName}
						</option>
					))}
				</select>
			</div>

			<div className='filter-group'>
				<label>Цена от:</label>
				<input type='number' value={localFilters.minPrice} onChange={handleMinPriceChange} placeholder='0' />
			</div>

			<div className='filter-group'>
				<label>Цена до:</label>
				<input
					type='number'
					value={localFilters.maxPrice}
					onChange={handleMaxPriceChange}
					placeholder='10000'
				/>
			</div>

			<div className='filter-group'>
				<label>Гостей:</label>
				<input
					type='number'
					value={localFilters.guests}
					onChange={handleGuestsChange}
					placeholder='Любое'
					min='1'
				/>
			</div>

			<div className='button-group'>
				<button className='apply-button' onClick={handleApply}>
					Применить
				</button>
				<button className='reset-button' onClick={handleReset}>
					Сбросить
				</button>
			</div>
		</div>
	);
};

export const HomeFilterPanel = styled(HomeFilterPanelContainer)`
	display: flex;
	gap: 15px;
	margin-bottom: 30px;
	padding: 20px;
	background-color: #f8f9fa;
	border-radius: 8px;
	flex-wrap: wrap;
	align-items: flex-end;

	.filter-group {
		display: flex;
		flex-direction: column;
		gap: 8px;
		flex: 1;
		min-width: 120px;

		label {
			font-weight: 500;
			color: #333;
			font-size: 14px;
		}

		select,
		input {
			padding: 8px 12px;
			border: 1px solid #ddd;
			border-radius: 4px;
			font-size: 14px;

			&:focus {
				outline: none;
				border-color: #1976d2;
				box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2);
			}
		}
	}

	.button-group {
		display: flex;
		gap: 10px;
		align-items: flex-end;
		min-width: 200px;
		justify-content: flex-end;
	}

	.apply-button,
	.reset-button {
		padding: 10px 16px;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 14px;
		transition: background-color 0.3s;
		min-width: 100px;
	}

	.apply-button {
		background-color: #1976d2;
		color: white;

		&:hover {
			background-color: #1565c0;
		}
	}

	.reset-button {
		background-color: #f5f5f5;
		color: #333;
		border: 1px solid #ddd;

		&:hover {
			background-color: #e0e0e0;
		}
	}
`;
