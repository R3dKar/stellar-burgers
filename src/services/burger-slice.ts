import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { RootState } from './store';
import { orderBurgerApi } from '@api';
import clamp from 'clamp';

export interface BurgerState {
  constructorItems: {
    bun?: TIngredient;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
}

const initialState: BurgerState = {
  constructorItems: {
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

export const burgerMakeOrder = createAsyncThunk<TOrder, void>(
  'burger/makeOrder',
  async (_, { getState }) => {
    const { constructorItems } = (getState() as RootState).burger;
    const { order } = await orderBurgerApi(
      [
        constructorItems.bun!,
        ...constructorItems.ingredients,
        constructorItems.bun!
      ].map((ingredient) => ingredient._id)
    );
    return order;
  }
);

export const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    burgerClear: (state) => {
      state.orderModalData = null;
      state.constructorItems = { ingredients: [] };
    },
    burgerAddIngredient: (state, { payload }: PayloadAction<TIngredient>) => {
      if (payload.type === 'bun') {
        state.constructorItems.bun = payload;
        return;
      }

      state.constructorItems.ingredients.push({
        ...payload,
        id: nanoid()
      });
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
    }
  },
  extraReducers: (builder) => {
    // burgerMakeOrder
    builder.addCase(burgerMakeOrder.pending, (state) => {
      state.orderRequest = true;
    });
    builder.addCase(burgerMakeOrder.rejected, (state) => {
      state.orderRequest = false;
    });
    builder.addCase(burgerMakeOrder.fulfilled, (state, { payload }) => {
      state.orderRequest = false;
      state.orderModalData = payload;
    });
  },
  selectors: {
    selectConstructorItems: (state) => state.constructorItems,
    selectOrderRequest: (state) => state.orderRequest,
    selectOrderModalData: (state) => state.orderModalData
  }
});

export const {
  burgerClear,
  burgerAddIngredient,
  burgerRemoveIngredient,
  burgerMoveIngredient
} = burgerSlice.actions;
export const {
  selectConstructorItems,
  selectOrderRequest,
  selectOrderModalData
} = burgerSlice.selectors;
export default burgerSlice.reducer;
