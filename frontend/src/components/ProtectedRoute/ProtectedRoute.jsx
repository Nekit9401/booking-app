import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, setAuthError } from '../../redux/slices';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const ProtectedRoute = ({ children }) => {
	const user = useSelector(selectCurrentUser);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (!user) {
			navigate('/login', { replace: true });
			dispatch(setAuthError('Недоступно для неавторизованных пользователей'));
		}
	}, [user, navigate, dispatch]);

	return user ? children : null;
};
