import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export interface IngredientsState {
  ingredients?: TIngredient[];
}

const initialState: IngredientsState = {};

export const ingredientsRetrieve = createAsyncThunk(
  'ingredients/retrieve',
  async () => getIngredientsApi()
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ingredientsRetrieve
    builder.addCase(ingredientsRetrieve.fulfilled, (state, { payload }) => {
      state.ingredients = payload;
    });
  },
  selectors: {
    selectIsIngredientsLoading: (state) => !state.ingredients,
    selectBuns: (state) =>
      state.ingredients?.filter((ingredient) => ingredient.type === 'bun'),
    selectMains: (state) =>
      state.ingredients?.filter((ingredient) => ingredient.type === 'main'),
    selectSauces: (state) =>
      state.ingredients?.filter((ingredient) => ingredient.type === 'sauce')
  }
});

export const {
  selectIsIngredientsLoading,
  selectBuns,
  selectMains,
  selectSauces
} = ingredientsSlice.selectors;
export default ingredientsSlice.reducer;
