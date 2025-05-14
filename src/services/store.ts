import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import userReducer, { userRetrieve } from './user-slice';
import ingredientsReducer, { ingredientsRetrieve } from './ingredients-store';

const store = configureStore({
  reducer: {
    user: userReducer,
    ingredients: ingredientsReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;

// initial user retreiving
store.dispatch(userRetrieve());

// initial ingredients retreiving
store.dispatch(ingredientsRetrieve());
