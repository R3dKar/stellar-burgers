import { describe, it, expect } from '@jest/globals';
import { burgerReducer, BurgerState, initialState } from './burger-slice';

describe('burgerSlice', () => {
  it('should init properly', () => {
    const state = burgerReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });
});
