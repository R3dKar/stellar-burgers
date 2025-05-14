import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import {
  userReducer,
  ingredientsReducer,
  burgerReducer,
  userRetrieve,
  ingredientsRetrieve
} from '@slices';

const store = configureStore({
  reducer: {
    user: userReducer,
    ingredients: ingredientsReducer,
    burger: burgerReducer
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
