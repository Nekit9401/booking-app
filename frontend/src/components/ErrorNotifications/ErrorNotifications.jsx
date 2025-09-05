import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, clearError, selectAppAuthError, selectAppError } from '../../redux/slices/appSlice';
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const NotificationContainer = styled.div`
	position: fixed;
	top: 20px;
	right: 20px;
	z-index: 1000;
	max-width: 350px;
`;

const Notification = styled.div`
	background: #fbdee2ed;
	color: #c62828;
	padding: 16px;
	border-radius: 8px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	margin-bottom: 12px;
	border-left: 4px solid #c62828;
	animation: ${slideIn} 0.3s ease forwards;

	&.exiting {
		animation: ${slideOut} 0.3s ease forwards;
	}

	display: flex;
	justify-content: space-between;
	align-items: flex-start;
`;

const CloseButton = styled.button`
	background: none;
	border: none;
	color: #c62828;
	cursor: pointer;
	font-size: 18px;
	margin-left: 12px;
	padding: 0;

	&:hover {
		opacity: 0.8;
	}
`;

export const ErrorNotification = () => {
	const dispatch = useDispatch();
	const error = useSelector(selectAppError);
	const authError = useSelector(selectAppAuthError);
	const [visible, setVisible] = useState(false);
	const [exiting, setExiting] = useState(false);

	useEffect(() => {
		if (error || authError) {
			setVisible(true);
			setExiting(false);

			const timer = setTimeout(() => {
				setExiting(true);
				setTimeout(() => {
					setVisible(false);
					dispatch(clearError());
					dispatch(clearAuthError());
				}, 300);
			}, 5000);

			return () => clearTimeout(timer);
		} else {
			setVisible(false);
		}
	}, [error, dispatch, authError]);

	const handleClose = () => {
		setExiting(true);

		setTimeout(() => {
			setVisible(false);
			dispatch(clearError());
		}, 300);
	};

	if (!visible) return null;

	return (
		<NotificationContainer>
			<Notification className={exiting ? 'exiting' : ''}>
				<div>{error || authError}</div>
				<CloseButton onClick={handleClose}>&times;</CloseButton>
			</Notification>
		</NotificationContainer>
	);
};
