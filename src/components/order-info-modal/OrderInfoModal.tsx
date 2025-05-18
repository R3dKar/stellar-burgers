import { Modal, OrderInfo } from '@components';
import { useNavigate } from 'react-router-dom';

export const OrderInfoModal = () => {
  const navigate = useNavigate();

  const onClose = () => navigate(-1);

  return (
    <Modal onClose={onClose} title=''>
      <OrderInfo />
    </Modal>
  );
};
