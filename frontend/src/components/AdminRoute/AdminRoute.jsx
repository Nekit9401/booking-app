import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, setError } from '../../redux/slices';
import { useNavigate } from 'react-router-dom';
import { ROLE } from '../../constants';

export const AdminRoute = ({ children }) => {
	const user = useSelector(selectCurrentUser);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	if (user.roleId !== ROLE.ADMIN) {
		navigate('/', { replace: true });
		dispatch(setError('Недостаточно прав доступа'));
	}

	return children;
};
