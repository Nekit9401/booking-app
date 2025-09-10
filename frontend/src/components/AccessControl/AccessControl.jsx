import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, setAuthError } from '../../redux/slices';
import { useNavigate } from 'react-router-dom';
import { ROLE } from '../../constants';
import { useEffect } from 'react';

export const AccesControl = ({ children, isAdminRoute = false }) => {
	const user = useSelector(selectCurrentUser);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (!user) {
			navigate('/login', { replace: true });
			dispatch(setAuthError('Недоступно для неавторизованных пользователей'));
			return;
		}

		if (isAdminRoute && user?.roleId !== ROLE.ADMIN) {
			navigate('/', { replace: true });
			dispatch(setAuthError('Ошибка доступа'));
			return;
		}
	}, [user, navigate, dispatch, isAdminRoute]);

	return user ? children : null;
};
