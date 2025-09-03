import { Outlet } from 'react-router-dom';
import { Header } from './components';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { selectAppLoading } from '../../redux/slices';
import { useEffect } from 'react';
import { checkAuthUser } from '../../redux/thunks';
import { Loader } from '../Loader/Loader';

const Container = styled.main`
	max-width: 1200px;
	margin: 0 auto;
	padding: 20px;
`;

export const MainLayout = () => {
	const dispatch = useDispatch();
	const isLoading = useSelector(selectAppLoading);

	useEffect(() => {
		dispatch(checkAuthUser());
	}, [dispatch]);

	return (
		<>
			<Header />
			<Container>
				<Outlet />
				{isLoading && <Loader />}
			</Container>
		</>
	);
};
