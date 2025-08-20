import type { RootState } from '../../utils/store/store';

export const selectCurrentUser = (state: RootState) => state.auth.user;
