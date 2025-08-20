import { LoginForm } from './components/LoginForm';
import { useFetchCurrentUserQuery } from './store/auth/api';

function App() {
	const { data: user, isLoading } = useFetchCurrentUserQuery();

	return (
		<>
			{isLoading ? (
				<>Loading...</>
			) : !user ? (
				<LoginForm />
			) : (
				<div>
					Name: {user?.name}; {user?.email}
				</div>
			)}
		</>
	);
}

export default App;
