import { useFetchCurrentUserQuery } from '../store/auth/api';

export const Profile = () => {
	const { data: user, isLoading } = useFetchCurrentUserQuery();
	return (
		<>
			{isLoading ? (
				<>Loading...</>
			) : (
				<div>
					Name: {user?.name}; {user?.email}
				</div>
			)}
		</>
	);
};
