import { useState } from 'react';
import styled from 'styled-components';

const SortDropdownContainer = ({ className, sortBy, sortOrder, onSortChange }) => {
	const [selectedValue, setSelectedValue] = useState(`${sortBy}_${sortOrder}`);

	const handleSortChange = (e) => {
		const value = e.target.value;
		setSelectedValue(value);
		const [newSortBy, newSortOrder] = value.split('_');
		onSortChange(newSortBy, newSortOrder);
	};

	return (
		<div className={className}>
			<label>Сортировать по:</label>
			<select value={selectedValue} onChange={handleSortChange}>
				<option value='price_asc'>Цена (по возрастанию)</option>
				<option value='price_desc'>Цена (по убыванию)</option>
				<option value='number_asc'>Номер (по возрастанию)</option>
				<option value='guests_asc'>Вместимость (по возрастанию)</option>
				<option value='guests_desc'>Вместимость (по убыванию)</option>
			</select>
		</div>
	);
};

export const SortDropdown = styled(SortDropdownContainer)`
	display: flex;
	align-items: center;
	gap: 10px;
	margin-bottom: 20px;

	label {
		font-weight: 500;
		color: #333;
	}

	select {
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
`;
