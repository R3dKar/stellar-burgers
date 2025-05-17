import { describe, it, expect } from '@jest/globals';
import {
  burgerAddIngredient,
  burgerClear,
  burgerDisposeModal,
  burgerMakeOrder,
  burgerMoveIngredient,
  burgerReducer,
  burgerRemoveIngredient,
  BurgerState,
  initialState
} from './burger-slice';
import { TIngredient } from '@utils-types';

const testingState: BurgerState = {
  constructorItems: {
    ingredients: [
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        id: 'rezGNfHyZsppsXPUAayr8'
      },
      {
        _id: '643d69a5c3f7b9001cfa093e',
        name: 'Филе Люминесцентного тетраодонтимформа',
        type: 'main',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        id: 'TzD9c9ZYlvbYuDkbr5A3x'
      },
      {
        _id: '643d69a5c3f7b9001cfa093f',
        name: 'Мясо бессмертных моллюсков Protostomia',
        type: 'main',
        proteins: 433,
        fat: 244,
        carbohydrates: 33,
        calories: 420,
        price: 1337,
        image: 'https://code.s3.yandex.net/react/code/meat-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
        id: '3CDxGrbtvslB8CeobSSNc'
      }
    ],
    bun: {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    }
  },
  orderRequest: false,
  orderModalData: null
};

const testingModalState: BurgerState = {
  constructorItems: {
    ingredients: []
  },
  orderRequest: true,
  orderModalData: {
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa0940',
      '643d69a5c3f7b9001cfa093c'
    ],
    _id: '6828a0a9c2f30c001cb24c15',
    status: 'done',
    name: 'Краторный био-марсианский люминесцентный метеоритный бургер',
    createdAt: '2025-05-17T14:43:53.360Z',
    updatedAt: '2025-05-17T14:43:54.141Z',
    number: 77574
  }
};

const testingIngredient: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093f',
  name: 'Мясо бессмертных моллюсков Protostomia',
  type: 'main',
  proteins: 433,
  fat: 244,
  carbohydrates: 33,
  calories: 420,
  price: 1337,
  image: 'https://code.s3.yandex.net/react/code/meat-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png'
};

const testingBun: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093d',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
};

describe('burgerSlice', () => {
  it('should init properly', () => {
    const state = burgerReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual(initialState);
  });

  describe('adding ingredient', () => {
    it('handles adding ingredient to empty state correctly', () => {
      const state = burgerReducer(
        initialState,
        burgerAddIngredient(testingIngredient)
      );

      expect(state.constructorItems.ingredients).toHaveLength(1);
      expect(state.constructorItems.ingredients[0]).toMatchObject(
        testingIngredient
      );
    });

    it('handles adding ingredient to filled state correctly', () => {
      const state = burgerReducer(
        testingState,
        burgerAddIngredient(testingIngredient)
      );

      expect(state.constructorItems.ingredients).toHaveLength(
        testingState.constructorItems.ingredients.length + 1
      );
      expect(
        state.constructorItems.ingredients[
          state.constructorItems.ingredients.length - 1
        ]
      ).toMatchObject(testingIngredient);
    });

    it('handles adding bun to empty state correctly', () => {
      const state = burgerReducer(
        initialState,
        burgerAddIngredient(testingBun)
      );

      expect(state.constructorItems.ingredients).toHaveLength(0);
      expect(state.constructorItems.bun).toEqual(testingBun);
    });

    it('handles adding bun to filled state correctly', () => {
      const state = burgerReducer(
        testingState,
        burgerAddIngredient(testingBun)
      );

      expect(state.constructorItems.ingredients).toEqual(
        testingState.constructorItems.ingredients
      );
      expect(state.constructorItems.bun).toEqual(testingBun);
    });
  });

  describe('removing ingredient', () => {
    it('handles deleting ingredient from empty state', () => {
      const state = burgerReducer(
        initialState,
        burgerRemoveIngredient(testingState.constructorItems.ingredients[0])
      );

      expect(state).toEqual(initialState);
    });

    it('handles deleting unexisting ingredient', () => {
      const state = burgerReducer(
        testingState,
        burgerRemoveIngredient({ ...testingIngredient, id: 'doesnt exists' })
      );

      expect(state).toEqual(testingState);
    });

    it('handles deleting ingredient normally', () => {
      const targetIngredient = testingState.constructorItems.ingredients[1];
      const state = burgerReducer(
        testingState,
        burgerRemoveIngredient(targetIngredient)
      );

      expect(state.constructorItems.ingredients).toHaveLength(
        testingState.constructorItems.ingredients.length - 1
      );
      expect(state.constructorItems.ingredients).not.toContain(
        targetIngredient
      );
    });
  });

  describe('moving ingredient', () => {
    it('handles moving ingridient with 0 shift', () => {
      const targetIngredient = testingState.constructorItems.ingredients[1];
      const state = burgerReducer(
        testingState,
        burgerMoveIngredient({ ...targetIngredient, shift: 0 })
      );

      expect(state).toEqual(testingState);
    });

    it('handles moving unexisting ingredient', () => {
      const state = burgerReducer(
        testingState,
        burgerMoveIngredient({
          ...testingIngredient,
          id: 'doesnt exists',
          shift: 1
        })
      );

      expect(state).toEqual(testingState);
    });

    it('handles moving ingredient up', () => {
      const targetIngredient = testingState.constructorItems.ingredients[1];
      const state = burgerReducer(
        testingState,
        burgerMoveIngredient({ ...targetIngredient, shift: -1 })
      );

      expect(state.constructorItems.ingredients).toHaveLength(
        testingState.constructorItems.ingredients.length
      );
      expect(state.constructorItems.ingredients[0]).toEqual(targetIngredient);
      expect(state.constructorItems.ingredients[1]).toEqual(
        testingState.constructorItems.ingredients[0]
      );
    });

    it('handles moving ingredient down', () => {
      const targetIngredient = testingState.constructorItems.ingredients[1];
      const state = burgerReducer(
        testingState,
        burgerMoveIngredient({ ...targetIngredient, shift: 1 })
      );

      expect(state.constructorItems.ingredients).toHaveLength(
        testingState.constructorItems.ingredients.length
      );
      expect(state.constructorItems.ingredients[2]).toEqual(targetIngredient);
      expect(state.constructorItems.ingredients[1]).toEqual(
        testingState.constructorItems.ingredients[2]
      );
    });

    it('handles moving ingredient far up', () => {
      const targetIngredient = testingState.constructorItems.ingredients[2];
      const state = burgerReducer(
        testingState,
        burgerMoveIngredient({ ...targetIngredient, shift: -10 })
      );

      expect(state.constructorItems.ingredients).toHaveLength(
        testingState.constructorItems.ingredients.length
      );
      expect(state.constructorItems.ingredients[0]).toEqual(targetIngredient);
      expect(state.constructorItems.ingredients[2]).toEqual(
        testingState.constructorItems.ingredients[0]
      );
    });

    it('handles moving ingredient far down', () => {
      const targetIngredient = testingState.constructorItems.ingredients[0];
      const state = burgerReducer(
        testingState,
        burgerMoveIngredient({ ...targetIngredient, shift: 10 })
      );

      expect(state.constructorItems.ingredients).toHaveLength(
        testingState.constructorItems.ingredients.length
      );
      expect(state.constructorItems.ingredients[2]).toEqual(targetIngredient);
      expect(state.constructorItems.ingredients[0]).toEqual(
        testingState.constructorItems.ingredients[2]
      );
    });
  });

  describe('clearing ingredients', () => {
    it('handles clearing empty state', () => {
      const state = burgerReducer(testingModalState, burgerClear());

      expect(state).toEqual(testingModalState);
    });

    it('handles clearing filled state', () => {
      const state = burgerReducer(testingState, burgerClear());

      expect(state).toEqual(initialState);
    });
  });

  describe('clearing modal information', () => {
    it('handles clearing modal info in empty state', () => {
      const state = burgerReducer(initialState, burgerDisposeModal());

      expect(state).toEqual(initialState);
    });

    it('handles clearing modal info in filled state', () => {
      const state = burgerReducer(testingModalState, burgerDisposeModal());

      expect(state).toEqual(initialState);
    });
  });

  describe('making order', () => {
    it('handles start of ordering properly', () => {
      const state = burgerReducer(testingState, {
        type: burgerMakeOrder.pending.type
      });

      expect(state.orderRequest).toBeTruthy();
    });

    it('handles success of ordering properly', () => {
      const state = burgerReducer(
        { ...testingState, orderRequest: true },
        {
          type: burgerMakeOrder.fulfilled.type,
          payload: testingModalState.orderModalData
        }
      );

      expect(state.orderRequest).toBeFalsy();
      expect(state.orderModalData).toEqual(testingModalState.orderModalData);
      expect(state.constructorItems).toEqual(initialState.constructorItems);
    });

    it('handles failure of ordering properly', () => {
      const state = burgerReducer(
        { ...testingState, orderRequest: true },
        { type: burgerMakeOrder.rejected.type }
      );

      expect(state).toEqual(testingState);
    });
  });
});
