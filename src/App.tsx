import { LoginForm } from './components/LoginForm';
import { useFetchProductQuery } from './store/products/api';

function App() {
	const { data, isLoading } = useFetchProductQuery(1);
	return (
		<>
			<LoginForm />
		</>
	);
}

export default App;
