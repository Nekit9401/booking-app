import styled from 'styled-components';
import { Button, Input } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { selectAppLoading, setSuccessMessage } from '../../redux/slices/appSlice';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../redux/thunks';
import { selectCurrentUser } from '../../redux/slices';
import { useEffect } from 'react';
import { useAuthForm } from '../../hooks';

const RegisterPageContainer = ({ className }) => {
	const { register, handleSubmit, errors, handleInputChange, isFormError } = useAuthForm();

	const dispatch = useDispatch();
	const isLoading = useSelector(selectAppLoading);
	const currentUser = useSelector(selectCurrentUser);
	const navigate = useNavigate();

	useEffect(() => {
		if (currentUser) {
			navigate('/', { replace: true });
		}
	}, [currentUser, navigate]);

	const onSubmit = async ({ login, password }) => {
		try {
			await dispatch(registerUser({ login, password })).unwrap();
			dispatch(setSuccessMessage('Регистрация прошла успешно!'));
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className={className}>
			<h1>Регистрация</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<Input
						type='text'
						placeholder='Введите Логин...'
						{...register('login')}
						onChange={handleInputChange('login')}
					/>
					{errors.login && <p className='error-message'>{errors.login.message}</p>}
				</div>
				<div>
					<Input
						type='password'
						placeholder='Введите пароль...'
						{...register('password')}
						onChange={handleInputChange('password')}
					/>
					{errors.password && <p className='error-message'>{errors.password.message}</p>}
				</div>
				<div>
					<Input
						type='password'
						placeholder='Повторите пароль...'
						{...register('passcheck')}
						onChange={handleInputChange('passcheck')}
					/>
					{errors.passcheck && <p className='error-message'>{errors.passcheck.message}</p>}
				</div>

				<Button type='submit' disabled={isFormError || isLoading}>
					{isLoading ? 'Отправка...' : 'Зарегистрироваться'}
				</Button>

				<p className='text'>
					Уже есть аккаунт? <Link to='/login'>Войти</Link>
				</p>
			</form>
		</div>
	);
};

export const RegisterPage = styled(RegisterPageContainer)`
	max-width: 400px;
	margin: 50px auto;
	padding: 32px;
	background: white;
	border-radius: 8px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

	& > h1 {
		text-align: center;
		margin-bottom: 30px;
		color: #1976d2ff;
	}

	& > form {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.error-message {
		color: #d32f2f;
		font-size: 14px;
		margin-top: 5px;
	}

	.text {
		text-align: center;
		margin-top: 20px;

		a {
			color: #1976d2;
			text-decoration: none;
			font-weight: 500;

			&:hover {
				text-decoration: underline;
			}
		}
	}
`;
