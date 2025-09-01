import styled from 'styled-components';

const Container = styled.div`
	padding: 20px;
`;

const Title = styled.h1`
	color: #333;
	margin-bottom: 20px;
`;

export const MyBookingsPage = () => {
	return (
		<Container>
			<Title>Страница моих броней</Title>
		</Container>
	);
};
