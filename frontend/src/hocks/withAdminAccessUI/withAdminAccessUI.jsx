import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/slices';
import { ROLE } from '../../constants';

// eslint-disable-next-line no-unused-vars
export const withAdminAccessUI = (WrappedComponent) => {
	const ComponentWithAdminAccess = (props) => {
		const user = useSelector(selectCurrentUser);
		const isAdmin = user?.roleId === ROLE.ADMIN;

		return <WrappedComponent {...props} isAdmin={isAdmin} currentUser={user} />;
	};

	return ComponentWithAdminAccess;
};
