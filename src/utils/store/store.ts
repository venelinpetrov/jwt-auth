import { configureStore } from '@reduxjs/toolkit';
import { myApi, instance } from './makeApi';
import { authSlice } from '../../store/auth/slice';

export const store = configureStore({
	reducer: {
		[myApi.reducerPath]: myApi.reducer,
		[authSlice.reducerPath]: authSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(myApi.middleware),
});

instance.interceptors.request.use((config) => {
	const token = store.getState().auth.accessToken;
	if (token) {
		config.headers = config.headers ?? {};
		config.headers['Authorization'] = `Bearer ${token}`;
	}
	return config;
});

export type RootState = ReturnType<typeof store.getState>;
