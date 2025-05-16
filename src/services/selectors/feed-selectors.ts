import { RootState } from '@src/services/store';

export const selectFeedOrders = ({ feed: state }: RootState) => state.orders;
export const selectFeedStats = ({ feed: state }: RootState) => ({
  total: state.total,
  totalToday: state.totalToday
});
