import { describe, it, expect } from '@jest/globals';
import {
  feedReducer,
  feedRetrieve,
  FeedState,
  initialState
} from './feed-slice';

const state1: FeedState = {
  orders: [
    {
      _id: '6828ae8ac2f30c001cb24c6f',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный люминесцентный бургер',
      createdAt: '2025-05-17T15:43:06.828Z',
      updatedAt: '2025-05-17T15:43:07.648Z',
      number: 77576
    },
    {
      _id: '6828acf5c2f30c001cb24c66',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0949',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Экзо-плантаго флюоресцентный люминесцентный бургер',
      createdAt: '2025-05-17T15:36:21.813Z',
      updatedAt: '2025-05-17T15:36:22.532Z',
      number: 77575
    }
  ],
  total: 77202,
  totalToday: 159
};

const state2: FeedState = {
  orders: [
    {
      _id: '68285ae8c2f30c001cb24a2b',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa094a',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный астероидный минеральный бургер',
      createdAt: '2025-05-17T09:46:16.324Z',
      updatedAt: '2025-05-17T09:46:17.832Z',
      number: 77528
    },
    {
      _id: '68285999c2f30c001cb24a25',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный био-марсианский бургер',
      createdAt: '2025-05-17T09:40:41.512Z',
      updatedAt: '2025-05-17T09:40:42.270Z',
      number: 77527
    }
  ],
  total: 77214,
  totalToday: 166
};

describe('feedSlice', () => {
  it('should init', () => {
    const state = feedReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual(initialState);
  });

  it('handles successful updating empty state', () => {
    const state = feedReducer(initialState, {
      type: feedRetrieve.fulfilled.type,
      payload: state1
    });

    expect(state).toEqual(state1);
  });

  it('handles successful updateing filled state', () => {
    const state = feedReducer(state1, {
      type: feedRetrieve.fulfilled.type,
      payload: state2
    });

    expect(state).toEqual(state2);
  });
});
