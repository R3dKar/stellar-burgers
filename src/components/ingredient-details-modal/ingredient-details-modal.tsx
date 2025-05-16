import { IngredientDetails, Modal } from '@components';
import { useNavigate } from 'react-router-dom';

export const IngredientDetailsModal = () => {
  const navigate = useNavigate();

  const onClose = () => navigate(-1);

  return (
    <Modal onClose={onClose} title='Ингредиент'>
      <IngredientDetails />
    </Modal>
  );
};
