import { Modal, OrderInfo } from '@components';
import { useState } from 'react';

export const OrderInfoModal = () => {
  const [opened, setOpened] = useState(true);

  if (!opened) return null;

  const onClose = () => setOpened(false);

  return (
    <Modal onClose={onClose} title='Информация о заказе'>
      <OrderInfo />
    </Modal>
  );
};
