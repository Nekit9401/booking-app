import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, setError } from '../../redux/slices';
import { useNavigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
	const user = useSelector(selectCurrentUser);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	if (!user) {
		navigate('/login', { replace: true });
		dispatch(setError('Недоступно для неавторизованных пользователей'));
	}

	return children;
};
