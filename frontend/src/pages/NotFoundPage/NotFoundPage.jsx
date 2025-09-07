import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../components';

const NotFoundPageContainer = ({ className }) => {
	return (
		<div className={className}>
			<div className='not-found-content'>
				<div className='error-code'>404</div>
				<h1>Страница не найдена</h1>
				<p>К сожалению, запрашиваемая страница не существует или была перемещена.</p>
				<div className='animation-container'>
					<div className='hotel-icon'>🏨</div>
					<div className='search-icon'>🔍</div>
					<div className='key-icon'>🔑</div>
				</div>
				<Button as={Link} to='/' className='home-button'>
					Вернуться на главную
				</Button>
			</div>
		</div>
	);
};

export const NotFoundPage = styled(NotFoundPageContainer)`
	position: absolute;
	inset: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 70vh;
	padding: 20px;
	background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);

	.not-found-content {
		text-align: center;
		max-width: 600px;
		padding: 40px;
		background: white;
		border-radius: 16px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
	}

	.error-code {
		font-size: 120px;
		font-weight: 800;
		color: #1976d2;
		line-height: 1;
		margin-bottom: 20px;
		text-shadow: 3px 3px 0px rgba(0, 0, 0, 0.1);
	}

	h1 {
		font-size: 32px;
		color: #333;
		margin-bottom: 16px;
	}

	p {
		font-size: 18px;
		color: #666;
		line-height: 1.6;
		margin-bottom: 30px;
	}

	.animation-container {
		display: flex;
		justify-content: center;
		gap: 30px;
		margin-bottom: 40px;
		perspective: 1000px;
	}

	.hotel-icon,
	.search-icon,
	.key-icon {
		font-size: 50px;
		animation: float 3s ease-in-out infinite;
	}

	.search-icon {
		animation-delay: 0.5s;
	}

	.key-icon {
		animation-delay: 1s;
	}

	.home-button {
		padding: 12px 30px;
		font-size: 18px;
		border-radius: 30px;
		background: linear-gradient(45deg, #1976d2, #2196f3);
		box-shadow: 0 4px 15px rgba(33, 150, 243, 0.3);
		transition: all 0.3s ease;

		&:hover {
			transform: translateY(-3px);
			box-shadow: 0 6px 20px rgba(33, 150, 243, 0.4);
		}
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(0) rotateY(0);
		}
		50% {
			transform: translateY(-15px) rotateY(10deg);
		}
	}
`;
