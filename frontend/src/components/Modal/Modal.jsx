import styled from 'styled-components';
import { Button } from '../Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, selectisModalOpen } from '../../redux/slices';

const ModalContainer = ({ className, title, onConfirm }) => {
	const dispatch = useDispatch();
	const modalIsOpen = useSelector(selectisModalOpen);

	const onClose = () => {
		dispatch(closeModal());
	};

	if (!modalIsOpen) {
		return null;
	}

	return (
		<div className={className}>
			<div className='modal-overlay' onClick={onClose}>
				<div className='modal-content'>
					<div className='modal-body'>
						<p>{title}</p>
						<div className='modal-actions'>
							<Button onClick={onClose} variant='outline'>
								Нет
							</Button>
							<Button onClick={onConfirm} variant='danger'>
								Да
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export const Modal = styled(ModalContainer)`
	position: fixed;
	inset: 0;
	z-index: 1000;

	.modal-overlay {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.modal-content {
		position: relative;
		background: white;
		border-radius: 8px;
		padding: 0;
		max-width: 500px;
		width: 90%;
		max-height: 90vh;
		overflow-y: auto;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
	}

	.modal-body {
		padding: 20px;

		p {
			font-size: 18px;
			margin-bottom: 15px;
			line-height: 1.5;
		}
	}

	.modal-actions {
		display: flex;
		gap: 10px;
		justify-content: flex-end;
		margin-top: 20px;
	}
`;
