import styled from 'styled-components';

const FilterPanelContainer = ({ className, filter, setFilter }) => {
	return (
		<div className={className}>
			<button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
				Все
			</button>
			<button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>
				Активные
			</button>
			<button className={filter === 'cancelled' ? 'active' : ''} onClick={() => setFilter('cancelled')}>
				Отмененные
			</button>
		</div>
	);
};

export const FilterPanel = styled(FilterPanelContainer)`
	display: flex;
	gap: 10px;
	flex-wrap: wrap;

	button {
		padding: 8px 16px;
		border: 1px solid #ddd;
		background: white;
		border-radius: 4px;
		cursor: pointer;
		transition: all 0.3s;

		&:hover {
			background-color: #f5f5f5;
		}

		&.active {
			background-color: #1976d2;
			color: white;
			border-color: #1976d2;
		}
	}
`;
