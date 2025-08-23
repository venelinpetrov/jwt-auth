import { useCallback, useState, type ChangeEventHandler } from 'react';
import { useNavigate } from 'react-router';
import { useLoginMutation } from '../store/auth/api';
import { useLazyFetchProductQuery } from '../store/products/api';

export const LoginForm = () => {
	const navigate = useNavigate();
	const [login] = useLoginMutation();
	const [fetchProduct] = useLazyFetchProductQuery();
	const [values, setValues] = useState({ email: '', password: '' });
	const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
		(e) => {
			setValues((prev) => ({
				...prev,
				[e.target.name]: e.target.value,
			}));
		},
		[]
	);

	const handleLogin = useCallback(() => {
		login(values)
			.unwrap()
			.then(() => {
				navigate('/profile');
			});
	}, [login, navigate, values]);
	return (
		<>
			<label htmlFor="email">Email:</label>
			<input
				name="email"
				id="email"
				value={values.email}
				onChange={handleChange}
			/>
			<label htmlFor="password">Password:</label>
			<input
				name="password"
				type="password"
				id="password"
				value={values.password}
				onChange={handleChange}
			/>
			<button onClick={handleLogin}>Login</button>
			<button
				onClick={() => {
					fetchProduct(1);
				}}
			>
				refetch products
			</button>
		</>
	);
};
