import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { logoutUser } from '../../../../redux/thunks';
import { withAdminAccessUI } from '../../../../hocks';

const HeaderContainer = ({ className, isAdmin, currentUser }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = async () => {
		await dispatch(logoutUser());
		navigate('/');
	};

	return (
		<header className={className}>
			<div className='nav'>
				<Link to='/' className='logo'>
					Отель "Пятница"
				</Link>

				{currentUser ? (
					<div className='user-menu'>
						{isAdmin && (
							<Link to='/admin' className='nav-link'>
								Панель администратора
							</Link>
						)}
						{!isAdmin && (
							<Link to='/bookings' className='nav-link'>
								Мои бронирования
							</Link>
						)}
						<span className='user-text'>Добро пожаловать, {currentUser.login} !</span>
						<button className='logout-button' onClick={handleLogout}>
							Выйти
						</button>
					</div>
				) : (
					<div className='auth-buttons'>
						<Link to='/login' className='nav-link'>
							Вход
						</Link>
						<Link to='/register' className='nav-link'>
							Регистрация
						</Link>
					</div>
				)}
			</div>
		</header>
	);
};

const StyledHeader = styled(HeaderContainer)`
	background-color: #1976d2;
	color: white;
	padding: 0 20px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

	.nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 64px;
		max-width: 1200px;
		margin: 0 auto;
	}

	.nav-link {
		color: white;
		text-decoration: none;
		padding: 8px 16px;
		border-radius: 4px;
		transition: background-color 0.3s;

		&:hover {
			background-color: rgba(255, 255, 255, 0.1);
		}
	}

	.logo {
		color: white;
		text-decoration: none;
		padding: 8px 16px;
		border-radius: 4px;
		transition: background-color 0.3s;
		font-size: 1.5rem;
		font-weight: bold;

		&:hover {
			background-color: rgba(255, 255, 255, 0.1);
		}
	}

	.auth-buttons {
		display: flex;
		gap: 15px;
	}

	.user-menu {
		display: flex;
		align-items: center;
		gap: 15px;
	}

	.user-text {
		color: white;
		padding: 8px 12px;
	}

	.logout-button {
		color: white;
		text-decoration: none;
		padding: 8px 12px;
		border-radius: 4px;
		transition: background-color 0.3s;
		border: none;
		background: none;
		cursor: pointer;
		font-size: 1rem;

		&:hover {
			background-color: rgba(255, 255, 255, 0.1);
		}
	}
`;

export const Header = withAdminAccessUI(StyledHeader);
