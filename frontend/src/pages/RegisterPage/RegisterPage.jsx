import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Button, Input } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { selectAppLoading } from '../../redux/slices/appSlice';
import { Link, Navigate } from 'react-router-dom';
import { registerUser } from '../../redux/thunks';
import { selectCurrentUser } from '../../redux/slices';

const RegSchema = yup.object({
	login: yup
		.string()
		.required('Введите Логин')
		.matches(/^\w+$/, 'Неверный Логин. Допускаются только буквы и цифры')
		.min(3, 'Неверный Логин. Минимум 3 символа')
		.max(15, 'Неверный Логин. Максимум 15 символов'),

	password: yup
		.string()
		.required('Введите Пароль')
		.matches(/^[\w#%]+$/, 'Неверный Пароль. Допускаются буквы, цифры и знаки # %')
		.min(6, 'Неверный Пароль. Минимум 6 символов')
		.max(20, 'Неверный Пароль. Максимум 20 символов'),

	passcheck: yup
		.string()
		.required('Повторите Пароль')
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
});

const RegisterPageContainer = ({ className }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(RegSchema),
		mode: 'onSubmit',
	});

	const dispatch = useDispatch();
	const isLoading = useSelector(selectAppLoading);
	const currentUser = useSelector(selectCurrentUser);

	const onSubmit = async ({ login, password }) => {
		await dispatch(registerUser({ login, password }));
	};

	const handleInputChange = (fieldName) => () => {
		clearErrors(fieldName);
	};

	const isFormError = errors?.login?.message || errors?.password?.message || errors?.passcheck?.message;

	if (currentUser) {
		return <Navigate to='/' />;
	}

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
