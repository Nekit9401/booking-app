import styled from 'styled-components';

const ButtonContainer = ({ children, className, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	padding: 12px;
	background-color: ${({ variant }) => (variant === 'danger' ? '#d32f2f' : '#1976d2')};
	color: white;
	border: none;
	border-radius: 4px;
	font-size: 16px;
	font-weight: 500;
	cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
	transition: background-color 0.3s;

	&:hover {
		background-color: ${({ variant }) => (variant === 'danger' ? '#b71c1c' : '#1565c0')};
	}

	&:disabled {
		background-color: #ccc;

		&:hover {
			background-color: #ccc;
		}
	}
`;
