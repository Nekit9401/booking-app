import styled from 'styled-components';

const PaginationContainer = ({ className, currentPage, totalPages, onPageChange }) => {
	const pages = [];

	const startPage = Math.max(1, currentPage - 2);
	const endPage = Math.min(totalPages, currentPage + 2);

	for (let i = startPage; i <= endPage; i++) {
		pages.push(
			<button key={i} className={i === currentPage ? 'active' : ''} onClick={() => onPageChange(i)}>
				{i}
			</button>,
		);
	}

	return (
		<div className={className}>
			<button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} className='nav-button'>
				← Назад
			</button>

			{startPage > 1 && (
				<>
					<button onClick={() => onPageChange(1)}>1</button>
					{startPage > 2 && <span className='ellipsis'>...</span>}
				</>
			)}

			{pages}

			{endPage < totalPages && (
				<>
					{endPage < totalPages - 1 && <span className='ellipsis'>...</span>}
					<button onClick={() => onPageChange(totalPages)}>{totalPages}</button>
				</>
			)}

			<button
				disabled={currentPage === totalPages}
				onClick={() => onPageChange(currentPage + 1)}
				className='nav-button'
			>
				Вперед →
			</button>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 8px;
	margin-top: 30px;

	button {
		padding: 8px 12px;
		border: 1px solid #ddd;
		background: white;
		color: #333;
		cursor: pointer;
		border-radius: 4px;
		min-width: 40px;
		transition: all 0.3s;

		&:hover:not(:disabled) {
			background: #1976d2;
			color: white;
			border-color: #1976d2;
		}

		&:disabled {
			cursor: default;
			opacity: 0.5;
		}

		&.active {
			background: #1976d2;
			color: white;
			border-color: #1976d2;
		}
	}

	.nav-button {
		min-width: auto;
		padding: 8px 16px;
	}

	.ellipsis {
		padding: 8px 4px;
		color: #666;
	}
`;
