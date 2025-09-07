import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, setAuthError } from '../../redux/slices';
import { useNavigate } from 'react-router-dom';
import { ROLE } from '../../constants';
import { useEffect } from 'react';

export const AdminRoute = ({ children }) => {
	const user = useSelector(selectCurrentUser);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (!user || user?.roleId !== ROLE.ADMIN) {
			navigate('/', { replace: true });
			dispatch(setAuthError('Ошибка доступа'));
		}
	}, [user, navigate, dispatch]);

	return user ? children : null;
};
