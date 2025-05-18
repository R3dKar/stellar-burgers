import { FC } from 'react';
import { Preloader, IngredientDetailsUI } from '@ui';
import { useSelector } from '@src/services/store';
import { selectIngredientById } from '@selectors';
import { useLocation, useParams } from 'react-router-dom';

type Params = {
  id: string;
};

export const IngredientDetails: FC = () => {
  const { id } = useParams<Params>() as Params;
  const isModal = !!useLocation().state?.background;

  const ingredientData = useSelector(selectIngredientById(id));

  if (!ingredientData) {
    return <Preloader />;
  }

  return (
    <IngredientDetailsUI ingredientData={ingredientData} modal={isModal} />
  );
};
