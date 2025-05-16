import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@src/services/store';

export const selectIsIngredientsLoading = ({ ingredients: state }: RootState) =>
  !state.ingredients;
export const selectIngredients = ({ ingredients: state }: RootState) =>
  state.ingredients;

export const selectBuns = createSelector(selectIngredients, (ingredients) =>
  ingredients?.filter((ingridient) => ingridient.type === 'bun')
);
export const selectMains = createSelector(selectIngredients, (ingredients) =>
  ingredients?.filter((ingridient) => ingridient.type === 'main')
);
export const selectSauces = createSelector(selectIngredients, (ingredients) =>
  ingredients?.filter((ingridient) => ingridient.type === 'sauce')
);

export const selectIngredientById = (id: string) =>
  createSelector(selectIngredients, (ingredients) =>
    ingredients?.find((ingredient) => ingredient._id === id)
  );
