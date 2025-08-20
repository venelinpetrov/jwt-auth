import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import axios, { type AxiosRequestConfig, AxiosError } from 'axios';
import { stringify } from 'qs';
import { authApi } from '../../store/auth/api';
import { setAccessToken, clearAccessToken } from '../../store/auth/slice';

const instance = axios.create({
	paramsSerializer: (params) => stringify(params, { arrayFormat: 'comma' }),
	baseURL: 'http://localhost:8080/', // TODO env var
	withCredentials: true,
});

export interface RequestError {
	status: number;
	message: string;
}

const axiosBaseQuery =
	(): BaseQueryFn<
		{
			url: string;
			method: AxiosRequestConfig['method'];
			data?: AxiosRequestConfig['data'];
			params?: AxiosRequestConfig['params'];
			config?: AxiosRequestConfig;
		},
		unknown,
		RequestError | undefined
	> =>
	async ({ url, method, data, params = {}, config = {} }, api) => {
		try {
			const token = api.getState().auth.accessToken;
			const result = await instance.request<unknown>({
				url,
				method,
				data,
				params,
				headers: token
					? { Authorization: `Bearer ${token}` }
					: undefined,
				...config,
			});
			return { data: result.data };
		} catch (axiosError) {
			const err = axiosError as AxiosError<{ error: string }>;
			return {
				error: {
					status: err.response?.status ?? 500,
					message: err.response?.data?.error ?? err.message,
				},
			};
		}
	};

const baseQueryWithReauth: BaseQueryFn<any, unknown, RequestError> = async (
	args,
	api,
	extraOptions
) => {
	let result = await axiosBaseQuery()(args, api, extraOptions);

	if (result.error?.status === 401) {
		if (
			typeof args === 'object' &&
			'url' in args &&
			args.url?.includes('auth/refresh')
		) {
			return result;
		}
		try {
			const refreshResult = await api
				.dispatch(authApi.endpoints.refresh.initiate())
				.unwrap();
			api.dispatch(setAccessToken(refreshResult.token));

			result = await axiosBaseQuery()(args, api, extraOptions);
		} catch {
			api.dispatch(clearAccessToken());
		}
	}

	return result;
};

export enum Tag {
	User = 'User',
}

const myApi = createApi({
	reducerPath: 'api',
	baseQuery: baseQueryWithReauth,
	endpoints: () => ({}),
	tagTypes: Object.values(Tag),
});

export { instance, myApi };
