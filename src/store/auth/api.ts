import type { LoginResponse, LoginRequest } from '../../types/auth';
import { myApi } from '../../utils/store/makeApi';

export const authApi = myApi.injectEndpoints({
	endpoints: (build) => ({
		login: build.mutation<LoginResponse, LoginRequest>({
			query: (data) => ({
				url: `auth/login`,
				method: 'POST',
				data,
			}),
		}),
	}),
});

export const { useLoginMutation } = authApi;
