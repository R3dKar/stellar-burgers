import { RootState } from '@src/services/store';

export const selectUser = ({ user: state }: RootState) => state.user;
export const selectIsAuthorized = ({ user: state }: RootState) => !!state.user;
export const selectUserOrders = ({ user: state }: RootState) => state.orders;
