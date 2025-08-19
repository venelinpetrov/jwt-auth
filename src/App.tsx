import { useFetchProductQuery } from './store/products/api';

function App() {
	const { data, isLoading } = useFetchProductQuery(1);
	return <>{JSON.stringify(data)}</>;
}

export default App;
