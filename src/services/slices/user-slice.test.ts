import { describe, it, expect } from '@jest/globals';
import {
  initialState,
  userLogin,
  userLogout,
  userOrdersRetrieve,
  userReducer,
  userRegister,
  userRetrieve,
  UserState,
  userUpdate
} from './user-slice';
import { TOrder, TUser } from '@utils-types';

const user1: TUser = {
  email: 'ivan.ivanov@main.ru',
  name: 'Иван Иванов Иванович'
};

const user2: TUser = {
  email: 'roman.romanov@main.ru',
  name: 'Роман Романов Романович'
};

const orders: TOrder[] = [
  {
    _id: '6824e7dcc2f30c001cb23b0a',
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0947',
      '643d69a5c3f7b9001cfa093f',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093f',
      '643d69a5c3f7b9001cfa0940',
      '643d69a5c3f7b9001cfa093f',
      '643d69a5c3f7b9001cfa0945',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093c'
    ],
    status: 'done',
    name: 'Антарианский фалленианский краторный бессмертный био-марсианский метеоритный бургер',
    createdAt: '2025-05-14T18:58:36.501Z',
    updatedAt: '2025-05-14T18:58:37.231Z',
    number: 77163
  },
  {
    _id: '6824f327c2f30c001cb23b60',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0947',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Флюоресцентный фалленианский люминесцентный бургер',
    createdAt: '2025-05-14T19:46:47.508Z',
    updatedAt: '2025-05-14T19:46:48.182Z',
    number: 77167
  }
];

const authorizingState: UserState = {
  isAuthorizing: true
};

const loggedInState: UserState = {
  isAuthorizing: false,
  user: user1,
  orders: orders
};

describe('userSlice', () => {
  it('should init', () => {
    const state = userReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual(initialState);
  });

  describe('login', () => {
    it('handles start of logging in', () => {
      const state = userReducer(initialState, { type: userLogin.pending.type });

      expect(state.isAuthorizing).toBe(true);
    });

    it('handles success of logging in', () => {
      const state = userReducer(authorizingState, {
        type: userLogin.fulfilled.type,
        payload: user1
      });

      expect(state.isAuthorizing).toBe(false);
      expect(state.user).toEqual(user1);
    });

    it('handles failure of logging in', () => {
      const state = userReducer(authorizingState, {
        type: userLogin.rejected.type
      });

      expect(state.isAuthorizing).toBe(false);
      expect(state.user).toBeUndefined();
    });
  });

  describe('logout', () => {
    it('handles start of logging out', () => {
      const state = userReducer(loggedInState, {
        type: userLogout.pending.type
      });

      expect(state.isAuthorizing).toBe(true);
    });

    it('handles success of logging out', () => {
      const state = userReducer(
        { ...loggedInState, isAuthorizing: true },
        { type: userLogout.fulfilled.type }
      );

      expect(state.isAuthorizing).toBe(false);
      expect(state.orders).toBeUndefined();
      expect(state.user).toBeUndefined();
    });

    it('handles failure of logging out', () => {
      const state = userReducer(
        { ...loggedInState, isAuthorizing: true },
        { type: userLogout.rejected.type }
      );

      expect(state).toEqual(loggedInState);
    });
  });

  describe('register', () => {
    it('handles start of registering', () => {
      const state = userReducer(initialState, {
        type: userRegister.pending.type
      });

      expect(state.isAuthorizing).toBe(true);
    });

    it('handles success of registering', () => {
      const state = userReducer(authorizingState, {
        type: userRegister.fulfilled.type,
        payload: user1
      });

      expect(state.isAuthorizing).toBe(false);
      expect(state.user).toEqual(user1);
    });

    it('handles failure of registering', () => {
      const state = userReducer(authorizingState, {
        type: userRegister.rejected.type
      });

      expect(state.isAuthorizing).toBe(false);
      expect(state.user).toBeUndefined();
    });
  });

  describe('update', () => {
    it('handles sucess of update', () => {
      const state = userReducer(loggedInState, {
        type: userUpdate.fulfilled.type,
        payload: user2
      });

      expect(state.user).toEqual(user2);
    });
  });

  describe('retrieve', () => {
    it('handles start of relogging in', () => {
      const state = userReducer(initialState, {
        type: userRetrieve.pending.type
      });

      expect(state.isAuthorizing).toBe(true);
    });

    it('handles success of relogging in', () => {
      const state = userReducer(authorizingState, {
        type: userRetrieve.fulfilled.type,
        payload: user1
      });

      expect(state.isAuthorizing).toBe(false);
      expect(state.user).toEqual(user1);
    });

    it('handles failure of relogging in', () => {
      const state = userReducer(authorizingState, {
        type: userRetrieve.rejected.type
      });

      expect(state.isAuthorizing).toBe(false);
      expect(state.user).toBeUndefined();
    });
  });

  describe('ordersRetrieve', () => {
    it('handles success of retreiving user orders', () => {
      const state = userReducer(
        { ...loggedInState, orders: undefined },
        { type: userOrdersRetrieve.fulfilled.type, payload: orders }
      );

      expect(state.orders).toEqual(orders);
    });
  });
});
