import { FC, useEffect, useRef } from 'react';
import styles from './orders-list.module.css';
import { OrdersListUIProps } from './type';
import { OrderCard } from '@components';

export const OrdersListUI: FC<OrdersListUIProps> = ({
  orderByDate,
  highlightNew
}) => {
  const skipInitialHightlight = useRef(true);
  useEffect(() => {
    skipInitialHightlight.current = false;
  }, []);

  return (
    <div className={`pt-4 pl-4 ${styles.content}`}>
      {orderByDate.map((order) => (
        <OrderCard
          order={order}
          key={order._id}
          highlight={highlightNew && !skipInitialHightlight.current}
        />
      ))}
    </div>
  );
};
