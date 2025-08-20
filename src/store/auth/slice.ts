import { createSlice } from '@reduxjs/toolkit';
import { authApi } from './api';

type AuthState = {
	accessToken: string | null;
};

export const authSlice = createSlice({
	name: 'auth',
	initialState: { accessToken: null } as AuthState,
	reducers: {
		setAccessToken: (state, action: { payload: string }) => {
			state.accessToken = action.payload;
		},
		clearAccessToken: (state) => {
			state.accessToken = null;
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			authApi.endpoints.login.matchFulfilled,
			(state, { payload }) => {
				state.accessToken = payload.token;
			}
		);
	},
});

export const { setAccessToken, clearAccessToken } = authSlice.actions;
