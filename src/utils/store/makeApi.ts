import type { BaseQueryFn, QueryReturnValue } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import type { AxiosRequestConfig, AxiosError } from 'axios';
import { stringify } from 'qs';

const instance = axios.create({
	paramsSerializer: (params) => stringify(params, { arrayFormat: 'comma' }),
});

export interface RequestError {
	status: number;
	message: string;
}

const axiosBaseQuery = ({
	baseUrl,
}: {
	baseUrl: string;
}): BaseQueryFn<
	{
		url: string;
		method: AxiosRequestConfig['method'];
		data?: AxiosRequestConfig['data'];
		params?: AxiosRequestConfig['params'];
		config?: AxiosRequestConfig;
	},
	unknown,
	RequestError | undefined
> => {
	return async ({ url, method, data, params = {}, config = {} }) => {
		try {
			const result = await instance<unknown>({
				url: baseUrl + url,
				method,
				data,
				params,
				...config,
			});
			return {
				data: result.data,
				error: undefined,
			} as QueryReturnValue<unknown, RequestError | undefined, object>;
		} catch (axiosError) {
			const err = axiosError as AxiosError<{ error: string }>;
			return {
				data: undefined,
				error: {
					status: err.response?.status,
					message: err.response?.data.error,
				},
			} as QueryReturnValue<unknown, RequestError | undefined, object>;
		}
	};
};

export enum Tag {
	TODO = 'TODO',
}

const myApi = createApi({
	reducerPath: 'api',
	baseQuery: axiosBaseQuery({
		baseUrl: 'http://localhost:8080/', // TODO env var
	}),
	endpoints: () => ({}),
	tagTypes: Object.values(Tag),
});

export { myApi, instance };
