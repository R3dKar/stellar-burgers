import { FC, memo } from 'react';

import { OrdersListProps } from './type';
import { OrdersListUI } from '@ui';

export const OrdersList: FC<OrdersListProps> = memo(
  ({ orders, highlightNew }) => {
    const orderByDate = [...orders].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return (
      <OrdersListUI orderByDate={orderByDate} highlightNew={highlightNew} />
    );
  }
);
