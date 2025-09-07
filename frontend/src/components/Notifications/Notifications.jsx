import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	clearAuthError,
	clearError,
	clearSuccessMessage,
	selectAppAuthError,
	selectAppError,
	selectAppSuccessMessage,
} from '../../redux/slices/appSlice';
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

const StyledNotification = styled.div`
	padding: 16px;
	border-radius: 8px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	margin-bottom: 12px;
	border-left: 4px solid;
	animation: ${slideIn} 0.3s ease forwards;
	display: flex;
	justify-content: space-between;
	align-items: flex-start;

	&.exiting {
		animation: ${slideOut} 0.3s ease forwards;
	}

	&.error {
		background: #fbdee2ed;
		color: #c62828;
		border-left-color: #c62828;
	}

	&.success {
		background: #d4edda;
		color: #155724;
		border-left-color: #28a745;
	}
`;

const CloseButton = styled.button`
	background: none;
	border: none;
	cursor: pointer;
	font-size: 18px;
	margin-left: 12px;
	padding: 0;

	&:hover {
		opacity: 0.8;
	}

	.error & {
		color: #c62828;
	}

	.success & {
		color: #155724;
	}
`;

export const Notifications = ({ className }) => {
	const dispatch = useDispatch();
	const error = useSelector(selectAppError);
	const authError = useSelector(selectAppAuthError);
	const successMessage = useSelector(selectAppSuccessMessage);
	const [visible, setVisible] = useState(false);
	const [exiting, setExiting] = useState(false);
	const [notificationType, setNotificationType] = useState('error');
	const [message, setMessage] = useState('');

	useEffect(() => {
		if (error || authError || successMessage) {
			setVisible(true);
			setExiting(false);

			if (error || authError) {
				setNotificationType('error');
				setMessage(error || authError);
			} else if (successMessage) {
				setNotificationType('success');
				setMessage(successMessage);
			}

			const timer = setTimeout(() => {
				setExiting(true);
				setTimeout(() => {
					setVisible(false);
					dispatch(clearError());
					dispatch(clearAuthError());
					dispatch(clearSuccessMessage());
				}, 300);
			}, 5000);

			return () => clearTimeout(timer);
		} else {
			setVisible(false);
		}
	}, [error, authError, successMessage, dispatch]);

	const handleClose = () => {
		setExiting(true);
		setTimeout(() => {
			setVisible(false);
			dispatch(clearError());
			dispatch(clearAuthError());
			dispatch(clearSuccessMessage());
		}, 300);
	};

	if (!visible) return null;

	return (
		<NotificationContainer className={className}>
			<StyledNotification className={`${notificationType} ${exiting ? 'exiting' : ''}`}>
				<div>{message}</div>
				<CloseButton onClick={handleClose}>&times;</CloseButton>
			</StyledNotification>
		</NotificationContainer>
	);
};
