import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

export interface IngredientsState {
  ingredients?: TIngredient[];
}

export const initialState: IngredientsState = {};

export const ingredientsRetrieve = createAsyncThunk(
  'ingredients/retrieve',
  async () => getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ingredientsRetrieve
    builder.addCase(ingredientsRetrieve.fulfilled, (state, { payload }) => {
      state.ingredients = payload;
    });
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;
