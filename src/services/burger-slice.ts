import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { RootState } from './store';
import { orderBurgerApi } from '@api';

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
    burgerRemoveIngredient: (state, { payload: { id }}: PayloadAction<TConstructorIngredient>) => {
      state.constructorItems.ingredients = state.constructorItems.ingredients.filter(ingredient => ingredient.id !== id);
    },
    burgerMoveIngredientUp: (state, { payload: { id }}: PayloadAction<TConstructorIngredient>) => {
      
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

export const { burgerClear, burgerAddIngredient } = burgerSlice.actions;
export const {
  selectConstructorItems,
  selectOrderRequest,
  selectOrderModalData
} = burgerSlice.selectors;
export default burgerSlice.reducer;
