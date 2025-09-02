import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import styled from 'styled-components';
import { logoutUser } from '../../../../redux/thunks';
import { selectCurrentUser } from '../../../../redux/slices';
import { ROLE } from '../../../../constants';

const HeaderContainer = styled.header`
	background-color: #1976d2;
	color: white;
	padding: 0 20px;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 64px;
	max-width: 1200px;
	margin: 0 auto;
`;

const StyledLink = styled(Link)`
	color: white;
	text-decoration: none;
	padding: 8px 16px;
	border-radius: 4px;
	transition: background-color 0.3s;

	&:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}
`;

const Logo = styled(StyledLink)`
	font-size: 1.5rem;
	font-weight: bold;
`;

const AuthButtons = styled.div`
	display: flex;
	gap: 15px;
`;

const UserMenu = styled.div`
	display: flex;
	align-items: center;
	gap: 15px;
`;

const UserText = styled.span`
	color: white;
	padding: 8px 12px;
`;

const LogoutButton = styled.button`
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
`;

export const Header = () => {
	const user = useSelector(selectCurrentUser);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogout = async () => {
		await dispatch(logoutUser());
		navigate('/');
	};

	return (
		<HeaderContainer>
			<Nav>
				<Logo to='/'>Отель "Шалка"</Logo>

				{user ? (
					<UserMenu>
						{user.roleId === ROLE.ADMIN && <StyledLink to='/admin'>Панель администратора</StyledLink>}
						<StyledLink to='/my'>Мои номера</StyledLink>
						<UserText>Добро пожаловать, {user.login} !</UserText>
						<LogoutButton onClick={handleLogout}>Выйти</LogoutButton>
					</UserMenu>
				) : (
					<AuthButtons>
						<StyledLink to='/login'>Вход</StyledLink>
						<StyledLink to='/register'>Регистрация</StyledLink>
					</AuthButtons>
				)}
			</Nav>
		</HeaderContainer>
	);
};
