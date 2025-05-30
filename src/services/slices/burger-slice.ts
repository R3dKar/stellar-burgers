import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { orderBurgerApi } from '@api';
import clamp from 'clamp';
import { userOrdersRetrieve } from '@slices';

export interface BurgerState {
  constructorItems: {
    bun?: TIngredient;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

export const initialState: BurgerState = {
  constructorItems: {
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

export const burgerMakeOrder = createAsyncThunk(
  'burger/makeOrder',
  async (constructorItems: BurgerState['constructorItems'], { dispatch }) => {
    const { order } = await orderBurgerApi(
      [
        constructorItems.bun!,
        ...constructorItems.ingredients,
        constructorItems.bun!
      ].map((ingredient) => ingredient._id)
    );

    dispatch(userOrdersRetrieve());

    return order;
  }
);

const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    burgerAddIngredient: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          const { id, ...bun } = payload;
          state.constructorItems.bun = bun;
          return;
        }

        state.constructorItems.ingredients.push(payload);
      },
      prepare: (payload: TIngredient) => ({
        payload: { ...payload, id: nanoid() }
      })
    },
    burgerRemoveIngredient: (
      state,
      { payload: { id } }: PayloadAction<TConstructorIngredient>
    ) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id !== id
        );
    },
    burgerMoveIngredient: (
      state,
      {
        payload: { id, shift }
      }: PayloadAction<TConstructorIngredient & { shift: number }>
    ) => {
      if (shift === 0) return;

      const ingredients = state.constructorItems.ingredients;
      const currentIndex = ingredients.findIndex(
        (ingredient) => ingredient.id === id
      );
      if (currentIndex === -1) return;
      const targetIndex = clamp(
        currentIndex + shift,
        0,
        ingredients.length - 1
      );
      if (targetIndex === currentIndex) return;

      [ingredients[currentIndex], ingredients[targetIndex]] = [
        ingredients[targetIndex],
        ingredients[currentIndex]
      ];
    },
    burgerDisposeModal: (state) => {
      state.orderModalData = null;
      state.orderRequest = false;
    },
    burgerClear: (state) => {
      state.constructorItems = { ingredients: [] };
    }
  },
  extraReducers: (builder) => {
    // burgerMakeOrder
    builder.addCase(burgerMakeOrder.pending, (state) => {
      state.orderRequest = true;
      state.constructorItems = { ingredients: [] };
    });
    builder.addCase(burgerMakeOrder.fulfilled, (state, { payload }) => {
      if (!state.orderRequest || state.orderModalData) return;

      state.orderRequest = false;
      state.orderModalData = payload;
    });
    builder.addCase(burgerMakeOrder.rejected, (state) => {
      state.orderRequest = false;
    });
  }
});

export const {
  burgerAddIngredient,
  burgerRemoveIngredient,
  burgerMoveIngredient,
  burgerDisposeModal,
  burgerClear
} = burgerSlice.actions;
export const burgerReducer = burgerSlice.reducer;
