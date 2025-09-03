import * as yup from 'yup';
import styled from 'styled-components';
import { ROOM_TYPES } from '../../../../constants';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createRoom } from '../../../../redux/thunks';
import { clearCurrentRoom, selectAppLoading, selectCurrentRoom, setError } from '../../../../redux/slices';
import { Button, Input } from '../../../../components';
import { roomsApi } from '../../../../redux/services';

const CreateRoomSchema = yup.object({
	number: yup
		.number()
		.typeError('Номер должен быть числом')
		.required('Введите номер комнаты')
		.positive('Номер должен быть положительным')
		.integer('Номер должен быть целым числом'),
	type: yup
		.number()
		.typeError('Тип должен быть числом')
		.required('Выберите тип комнаты')
		.oneOf([ROOM_TYPES.ECONOM, ROOM_TYPES.STANDART, ROOM_TYPES.LUX], 'Неверный тип комнаты'),
	description: yup
		.string()
		.required('Введите описание комнаты')
		.min(10, 'Описание должно содержать минимум 10 символов'),
	price: yup
		.number()
		.typeError('Цена должна быть числом')
		.required('Введите цену')
		.positive('Цена должна быть положительной'),
	guests: yup
		.number()
		.typeError('Количество гостей должно быть числом')
		.required('Введите количество гостей')
		.positive('Количество гостей должно быть положительным')
		.integer('Количество гостей должно быть целым числом'),
});

const CreateRoomPageContainer = ({ className }) => {
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [previewUrls, setPreviewUrls] = useState([]);
	const [roomTypes, setRoomTypes] = useState([]);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const currentRoom = useSelector(selectCurrentRoom);
	const isLoading = useSelector(selectAppLoading);

	const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
	} = useForm({
		defaultValues: {
			number: '',
			type: '',
			description: '',
			price: '',
			guests: '',
		},
		resolver: yupResolver(CreateRoomSchema),
		mode: 'onSubmit',
	});

	useEffect(() => {
		const fetchRoomsTypes = async () => {
			try {
				const roomTypesResponse = await roomsApi.getRoomTypes();

				if (!roomTypesResponse.data.data) {
					throw new Error('Ошибка в получении типов комнат');
				}

				setRoomTypes(roomTypesResponse.data.data);
			} catch (error) {
				setError(error.message);
			}
		};

		fetchRoomsTypes();
	}, []);

	const handleFileChange = (e) => {
		const files = Array.from(e.target.files);
		setSelectedFiles(files);

		const urls = files.map((file) => URL.createObjectURL(file));
		setPreviewUrls(urls);
	};

	const removeImage = (index) => {
		const newFiles = [...selectedFiles];
		const newUrls = [...previewUrls];

		URL.revokeObjectURL(newUrls[index]);

		newFiles.splice(index, 1);
		newUrls.splice(index, 1);

		setSelectedFiles(newFiles);
		setPreviewUrls(newUrls);
	};

	const onSubmit = async (data) => {
		const formData = new FormData();

		Object.keys(data).forEach((key) => {
			formData.append(key, data[key]);
		});

		selectedFiles.forEach((file) => {
			formData.append('photos', file);
		});

		dispatch(clearCurrentRoom());
		await dispatch(createRoom(formData));

		// if (currentRoom) {
		// 	navigate('/');
		// }
	};

	const handleInputChange = (fieldName) => () => {
		clearErrors(fieldName);
	};

	return (
		<div className={className}>
			<h1>Добавить новый нормер</h1>
			<form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
				<div className='form-group'>
					<Input
						type='number'
						placeholder='Номер комнаты'
						{...register('number')}
						onChange={handleInputChange('number')}
					/>
					{errors.number && <p className='error-message'>{errors.number.message}</p>}
				</div>

				<div className='form-group'>
					<label>Тип комнаты:</label>
					<select {...register('type')} onChange={handleInputChange('type')}>
						<option value=''>Выберите тип</option>
						{roomTypes.map(({ id: roomId, name: typeName }) => (
							<option key={roomId} value={roomId}>
								{typeName}
							</option>
						))}
					</select>
					{errors.type && <p className='error-message'>{errors.type.message}</p>}
				</div>

				<div className='form-group'>
					<textarea
						placeholder='Описание комнаты'
						{...register('description')}
						rows={4}
						onChange={handleInputChange('description')}
					/>
					{errors.description && <p className='error-message'>{errors.description.message}</p>}
				</div>

				<div className='form-group'>
					<Input
						type='number'
						placeholder='Цена за сутки (₽)'
						{...register('price')}
						onChange={handleInputChange('price')}
					/>
					{errors.price && <p className='error-message'>{errors.price.message}</p>}
				</div>

				<div className='form-group'>
					<Input
						type='number'
						placeholder='Количество гостей'
						{...register('guests')}
						onChange={handleInputChange('guests')}
					/>
					{errors.guests && <p className='error-message'>{errors.guests.message}</p>}
				</div>

				<div className='form-group'>
					<label>Фотографии комнаты:</label>
					<input type='file' multiple accept='image/*' onChange={handleFileChange} />
					<div className='image-previews'>
						{previewUrls.map((url, index) => (
							<div key={index} className='image-preview'>
								<img src={url} alt={`Preview ${index}`} />
								<button type='button' onClick={() => removeImage(index)} className='remove-image'>
									×
								</button>
							</div>
						))}
					</div>
				</div>

				<Button type='submit' disabled={isLoading}>
					Создать номер
				</Button>
			</form>
		</div>
	);
};

export const CreateRoomPage = styled(CreateRoomPageContainer)`
	max-width: 600px;
	margin: 0 auto;
	padding: 20px;

	h1 {
		text-align: center;
		margin-bottom: 30px;
		color: #1976d2;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	label {
		font-weight: 500;
		margin-bottom: 5px;
	}

	select,
	textarea {
		padding: 12px 16px;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 16px;
		font-family: inherit;

		&:focus {
			outline: none;
			border-color: #1976d2;
		}
	}

	textarea {
		resize: vertical;
	}

	.error-message {
		color: #d32f2f;
		font-size: 14px;
		margin-top: 5px;
	}

	.image-previews {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-top: 10px;
	}

	.image-preview {
		position: relative;
		width: 100px;
		height: 100px;
	}

	.image-preview img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 4px;
	}

	.remove-image {
		position: absolute;
		top: -8px;
		right: -8px;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background: #d32f2f;
		color: white;
		border: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 16px;
		line-height: 1;
	}
`;
