import { RootState } from '@src/services/store';

export const selectConstructorItems = (state: RootState) =>
  state.burger.constructorItems;
export const selectOrderRequest = (state: RootState) =>
  state.burger.orderRequest;
export const selectOrderModalData = (state: RootState) =>
  state.burger.orderModalData;
