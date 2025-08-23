import { Navigate, Outlet } from 'react-router';
import { useFetchCurrentUserQuery } from '../store/auth/api';

export const AuthRoute = () => {
	const { data: user, isLoading } = useFetchCurrentUserQuery();
	return !user && !isLoading ? <Navigate to="/login" /> : <Outlet />;
};
