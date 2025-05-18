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

const filledState: BurgerState = {
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

const modalState: BurgerState = {
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

const ingredient: TIngredient = {
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

const bun: TIngredient = {
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
  it('should init', () => {
    const state = burgerReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual(initialState);
  });

  describe('adding ingredient', () => {
    it('handles adding ingredient to empty state', () => {
      const state = burgerReducer(
        initialState,
        burgerAddIngredient(ingredient)
      );

      expect(state.constructorItems.ingredients).toHaveLength(1);
      expect(state.constructorItems.ingredients[0]).toMatchObject(ingredient);
    });

    it('handles adding ingredient to filled state', () => {
      const state = burgerReducer(filledState, burgerAddIngredient(ingredient));

      expect(state.constructorItems.ingredients).toHaveLength(
        filledState.constructorItems.ingredients.length + 1
      );
      expect(
        state.constructorItems.ingredients[
          state.constructorItems.ingredients.length - 1
        ]
      ).toMatchObject(ingredient);
    });

    it('handles adding bun to empty state', () => {
      const state = burgerReducer(initialState, burgerAddIngredient(bun));

      expect(state.constructorItems.ingredients).toHaveLength(0);
      expect(state.constructorItems.bun).toEqual(bun);
    });

    it('handles adding bun to filled state', () => {
      const state = burgerReducer(filledState, burgerAddIngredient(bun));

      expect(state.constructorItems.ingredients).toEqual(
        filledState.constructorItems.ingredients
      );
      expect(state.constructorItems.bun).toEqual(bun);
    });
  });

  describe('removing ingredient', () => {
    it('handles deleting ingredient from empty state', () => {
      const state = burgerReducer(
        initialState,
        burgerRemoveIngredient(filledState.constructorItems.ingredients[0])
      );

      expect(state).toEqual(initialState);
    });

    it('handles deleting unexisting ingredient', () => {
      const state = burgerReducer(
        filledState,
        burgerRemoveIngredient({ ...ingredient, id: 'doesnt exists' })
      );

      expect(state).toEqual(filledState);
    });

    it('handles deleting ingredient', () => {
      const targetIngredient = filledState.constructorItems.ingredients[1];
      const state = burgerReducer(
        filledState,
        burgerRemoveIngredient(targetIngredient)
      );

      expect(state.constructorItems.ingredients).toHaveLength(
        filledState.constructorItems.ingredients.length - 1
      );
      expect(state.constructorItems.ingredients).not.toContain(
        targetIngredient
      );
    });
  });

  describe('moving ingredient', () => {
    it('handles moving ingridient with 0 shift', () => {
      const targetIngredient = filledState.constructorItems.ingredients[1];
      const state = burgerReducer(
        filledState,
        burgerMoveIngredient({ ...targetIngredient, shift: 0 })
      );

      expect(state).toEqual(filledState);
    });

    it('handles moving unexisting ingredient', () => {
      const state = burgerReducer(
        filledState,
        burgerMoveIngredient({
          ...ingredient,
          id: 'doesnt exists',
          shift: 1
        })
      );

      expect(state).toEqual(filledState);
    });

    it('handles moving ingredient up', () => {
      const targetIngredient = filledState.constructorItems.ingredients[1];
      const state = burgerReducer(
        filledState,
        burgerMoveIngredient({ ...targetIngredient, shift: -1 })
      );

      expect(state.constructorItems.ingredients).toHaveLength(
        filledState.constructorItems.ingredients.length
      );
      expect(state.constructorItems.ingredients[0]).toEqual(targetIngredient);
      expect(state.constructorItems.ingredients[1]).toEqual(
        filledState.constructorItems.ingredients[0]
      );
    });

    it('handles moving ingredient down', () => {
      const targetIngredient = filledState.constructorItems.ingredients[1];
      const state = burgerReducer(
        filledState,
        burgerMoveIngredient({ ...targetIngredient, shift: 1 })
      );

      expect(state.constructorItems.ingredients).toHaveLength(
        filledState.constructorItems.ingredients.length
      );
      expect(state.constructorItems.ingredients[2]).toEqual(targetIngredient);
      expect(state.constructorItems.ingredients[1]).toEqual(
        filledState.constructorItems.ingredients[2]
      );
    });

    it('handles moving ingredient far up', () => {
      const targetIngredient = filledState.constructorItems.ingredients[2];
      const state = burgerReducer(
        filledState,
        burgerMoveIngredient({ ...targetIngredient, shift: -10 })
      );

      expect(state.constructorItems.ingredients).toHaveLength(
        filledState.constructorItems.ingredients.length
      );
      expect(state.constructorItems.ingredients[0]).toEqual(targetIngredient);
      expect(state.constructorItems.ingredients[2]).toEqual(
        filledState.constructorItems.ingredients[0]
      );
    });

    it('handles moving ingredient far down', () => {
      const targetIngredient = filledState.constructorItems.ingredients[0];
      const state = burgerReducer(
        filledState,
        burgerMoveIngredient({ ...targetIngredient, shift: 10 })
      );

      expect(state.constructorItems.ingredients).toHaveLength(
        filledState.constructorItems.ingredients.length
      );
      expect(state.constructorItems.ingredients[2]).toEqual(targetIngredient);
      expect(state.constructorItems.ingredients[0]).toEqual(
        filledState.constructorItems.ingredients[2]
      );
    });
  });

  describe('clearing ingredients', () => {
    it('handles clearing empty state', () => {
      const state = burgerReducer(modalState, burgerClear());

      expect(state).toEqual(modalState);
    });

    it('handles clearing filled state', () => {
      const state = burgerReducer(filledState, burgerClear());

      expect(state).toEqual(initialState);
    });
  });

  describe('clearing modal information', () => {
    it('handles clearing modal info in empty state', () => {
      const state = burgerReducer(initialState, burgerDisposeModal());

      expect(state).toEqual(initialState);
    });

    it('handles clearing modal info in filled state', () => {
      const state = burgerReducer(modalState, burgerDisposeModal());

      expect(state).toEqual(initialState);
    });
  });

  describe('making order', () => {
    it('handles start of making order', () => {
      const state = burgerReducer(filledState, {
        type: burgerMakeOrder.pending.type
      });

      expect(state.orderRequest).toBe(true);
      expect(state.constructorItems).toEqual(initialState.constructorItems);
    });

    it('handles success of making order', () => {
      const state = burgerReducer(
        { ...filledState, orderRequest: true },
        {
          type: burgerMakeOrder.fulfilled.type,
          payload: modalState.orderModalData
        }
      );

      expect(state.orderRequest).toBe(false);
      expect(state.orderModalData).toEqual(modalState.orderModalData);
    });

    it('handles failure of making order', () => {
      const state = burgerReducer(
        { ...filledState, orderRequest: true },
        { type: burgerMakeOrder.rejected.type }
      );

      expect(state).toEqual(filledState);
    });
  });
});
