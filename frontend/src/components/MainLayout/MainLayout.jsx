import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import styled from 'styled-components';

const Container = styled.main`
	max-width: 1200px;
	margin: 0 auto;
	padding: 20px;
`;

export const MainLayout = () => {
	return (
		<>
			<Header />
			<Container>
				<Outlet />
			</Container>
		</>
	);
};
