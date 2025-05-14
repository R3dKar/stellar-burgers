import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '@src/services/store';
import {
  burgerMoveIngredient,
  burgerRemoveIngredient
} from '@src/services/burger-slice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () =>
      dispatch(burgerMoveIngredient({ ...ingredient, shift: 1 }));
    const handleMoveUp = () =>
      dispatch(burgerMoveIngredient({ ...ingredient, shift: -1 }));
    const handleClose = () => dispatch(burgerRemoveIngredient(ingredient));

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
