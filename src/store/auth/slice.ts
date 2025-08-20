import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode, type JwtPayload } from 'jwt-decode';
import { authApi } from './api';
import type { User } from '../../types/user';

type AuthState = {
	accessToken: string | null;
	user: User | null;
};

export const authSlice = createSlice({
	name: 'auth',
	initialState: { accessToken: null } as AuthState,
	reducers: {
		setAccessToken: (state, action: { payload: string }) => {
			state.accessToken = action.payload;
			const { email, name, role } = jwtDecode<JwtPayload & User>(
				action.payload
			);
			state.accessToken = action.payload;
			state.user = { email, name, role };
		},
		clearAccessToken: (state) => {
			state.accessToken = null;
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			authApi.endpoints.login.matchFulfilled,
			(state, { payload }) => {
				const { email, name, role } = jwtDecode<JwtPayload & User>(
					payload.token
				);
				state.accessToken = payload.token;
				state.user = { email, name, role };
			}
		);
	},
});

export const { setAccessToken, clearAccessToken } = authSlice.actions;
