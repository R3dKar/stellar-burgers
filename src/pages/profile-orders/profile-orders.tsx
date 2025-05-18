import { selectUserOrders } from '@selectors';
import { useSelector } from '@src/services/store';
import { ProfileOrdersUI } from '@ui-pages';
import { FC } from 'react';

export const ProfileOrders: FC = () => {
  const orders = useSelector(selectUserOrders);

  return <ProfileOrdersUI orders={orders} />;
};
