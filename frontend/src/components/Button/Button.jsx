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
	background-color: ${({ variant }) =>
		variant === 'danger' ? '#d32f2f' : variant === 'outline' ? 'transparent' : '#1976d2'};
	color: ${({ variant }) => (variant === 'outline' ? '#1976d2' : 'white')};
	border: ${({ variant }) => (variant === 'outline' ? '1px solid #1976d2' : 'none')};
	border-radius: 4px;
	font-size: 16px;
	font-weight: 500;
	cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
	transition: background-color 0.3s;

	&:hover {
		background-color: ${({ variant }) =>
			variant === 'danger' ? '#b71c1c' : variant === 'outline' ? '#f5f5f5' : '#1565c0'};
	}

	&:disabled {
		background-color: #ccc;

		&:hover {
			background-color: #ccc;
		}
	}
`;
