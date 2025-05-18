import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@src/services/store';

export const selectFeedOrders = ({ feed: state }: RootState) => state.orders;
export const selectFeedTotal = ({ feed: state }: RootState) => state.total;
export const selectFeedTotalToday = ({ feed: state }: RootState) =>
  state.totalToday;
export const selectFeedStats = createSelector(
  [selectFeedTotal, selectFeedTotalToday],
  (total, totalToday) => ({ total, totalToday })
);
