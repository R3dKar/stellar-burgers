import { IngredientDetails, Modal } from '@components';
import { useState } from 'react';

export const IngredientDetailsModal = () => {
  const [opened, setOpened] = useState(true);

  if (!opened) return null;

  const onClose = () => setOpened(false);

  return (
    <Modal onClose={onClose} title='Ингредиент'>
      <IngredientDetails />
    </Modal>
  );
};
