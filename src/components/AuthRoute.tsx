import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router';
import { isAuthenticated } from '../store/auth/selectors';

export const AuthRoute = () => {
	const isAuth = useSelector(isAuthenticated);
	return !isAuth ? <Navigate to="/login" /> : <Outlet />;
};
