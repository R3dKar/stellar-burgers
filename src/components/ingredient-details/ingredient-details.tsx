import { FC } from 'react';
import { Preloader, IngredientDetailsUI } from '@ui';
import { useSelector } from '@src/services/store';
import { selectIngredientById } from '@selectors';
import { useLocation, useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const background = useLocation().state?.background;

  const ingredientData = useSelector(selectIngredientById(id!));

  if (!ingredientData) {
    return <Preloader />;
  }

  return (
    <>
      {!background && <div style={{ marginTop: '120px' }} />}
      <IngredientDetailsUI ingredientData={ingredientData} />
    </>
  );
};
