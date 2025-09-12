import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const loginSchema = yup.object({
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
});

const registerSchema = loginSchema.shape({
	passcheck: yup
		.string()
		.required('Повторите Пароль')
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
});

export const useAuthForm = (isLogin = true) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
		setError,
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			...(isLogin ? {} : { passcheck: '' }),
		},
		resolver: yupResolver(isLogin ? loginSchema : registerSchema),
		mode: 'onSubmit',
	});

	const handleInputChange = (fieldName) => () => {
		clearErrors(fieldName);
	};

	const isFormError = !!errors.login || !!errors.password || (!isLogin && !!errors.passcheck);

	return {
		register,
		handleSubmit,
		errors,
		handleInputChange,
		isFormError,
		setError,
	};
};
