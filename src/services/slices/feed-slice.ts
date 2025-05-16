import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export interface FeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
}

const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0
};

export const feedRetrieve = createAsyncThunk('feeds/retrieve', async () =>
  getFeedsApi()
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // feedsRetrieve
    builder.addCase(
      feedRetrieve.fulfilled,
      (state, { payload: { orders, total, totalToday } }) => {
        state.orders = orders;
        state.total = total;
        state.totalToday = totalToday;
      }
    );
  }
});

export const feedReducer = feedSlice.reducer;
