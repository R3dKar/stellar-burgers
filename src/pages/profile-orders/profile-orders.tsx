import { selectUserOrders } from '@selectors';
import { useSelector } from '@src/services/store';
import { ProfileOrdersUI } from '@ui-pages';
import { FC } from 'react';

export const ProfileOrders: FC = () => {
  // FIXME: Сделать что-то, когда заказы ещё undefined
  const orders = useSelector(selectUserOrders)!;

  return <ProfileOrdersUI orders={orders} />;
};
