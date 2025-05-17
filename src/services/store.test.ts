import { describe, it, expect } from '@jest/globals';
import { rootReducer } from './store';
import { configureStore } from '@reduxjs/toolkit';
import { initialState as burgerInitialState } from './slices/burger-slice';
import { initialState as feedInitialState } from './slices/feed-slice';
import { initialState as ingredientsInitialState } from './slices/ingredients-slice';
import { initialState as userInitialState } from './slices/user-slice';

describe('store', () => {
  it('should init', () => {
    const store = configureStore({ reducer: rootReducer });
    const state = store.getState();

    expect(state.burger).toEqual(burgerInitialState);
    expect(state.feed).toEqual(feedInitialState);
    expect(state.ingredients).toEqual(ingredientsInitialState);
    expect(state.user).toEqual(userInitialState);
  });
});
