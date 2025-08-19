import { createSlice } from '@reduxjs/toolkit';
import { authApi } from './api';

type AuthState = {
	accessToken: string | null;
};

export const authSlice = createSlice({
	name: 'auth',
	initialState: { accessToken: null } as AuthState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(
			authApi.endpoints.login.matchFulfilled,
			(state, { payload }) => {
				state.accessToken = payload.token;
			}
		);
	},
});
