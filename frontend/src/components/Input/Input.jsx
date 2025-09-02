import styled from 'styled-components';

const InputContainer = ({ className, ...props }) => {
	return <input className={className} {...props} />;
};

export const Input = styled(InputContainer)`
	padding: 12px 16px;
	border: 1px solid #ddd;
	border-radius: 4px;
	font-size: 16px;
	transition: border-color 0.3s;
	width: ${({ width = '100%' }) => width};

	&:focus {
		outline: none;
		border-color: #1976d2;
	}

	&.error {
		border-color: #d32f2f;
	}
`;
