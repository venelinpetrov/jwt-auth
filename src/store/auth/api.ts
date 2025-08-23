import type { LoginResponse, LoginRequest } from '../../types/auth';
import type { User } from '../../types/user';
import { myApi, Tag } from '../../utils/store/makeApi';

export const authApi = myApi.injectEndpoints({
	endpoints: (build) => ({
		login: build.mutation<LoginResponse, LoginRequest>({
			query: (data) => ({
				url: `auth/login`,
				method: 'POST',
				data,
			}),
			invalidatesTags: () => [{ type: Tag.User }],
		}),
		refresh: build.mutation<{ token: string }, void>({
			query: () => ({
				url: `auth/refresh`,
				method: 'POST',
				credentials: 'include',
			}),
		}),
		fetchCurrentUser: build.query<User, void>({
			query: () => ({
				url: 'auth/me',
				method: 'GET',
			}),
			providesTags: () => [{ type: Tag.User }],
		}),
	}),
});

export const {
	useLoginMutation,
	useLazyFetchCurrentUserQuery,
	useFetchCurrentUserQuery,
} = authApi;
