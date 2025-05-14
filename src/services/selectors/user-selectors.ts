import { RootState } from '@src/services/store';

export const selectUser = (state: RootState) => state.user.user;
export const selectIsAuthorized = (state: RootState) => !!state.user.user;
