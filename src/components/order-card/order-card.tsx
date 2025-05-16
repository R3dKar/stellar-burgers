import { FC, memo, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { OrderCardProps } from './type';
import { TIngredient } from '@utils-types';
import { OrderCardUI } from '@ui';
import { useSelector } from '@src/services/store';
import { selectIngredients } from '@selectors';

const maxIngredients = 6;

export const OrderCard: FC<OrderCardProps> = memo(({ order }) => {
  const location = useLocation();

  const ingredients = useSelector(selectIngredients);

  const [newOrder, setNewOrder] = useState(
    () => new Date().getTime() - 30 * 1000 < new Date(order.createdAt).getTime()
  );

  useEffect(() => {
    if (!newOrder) return;

    const timeout = setTimeout(() => setNewOrder(false), 5 * 1000);
    return () => clearTimeout(timeout);
  }, []);

  const orderInfo = useMemo(() => {
    if (!ingredients?.length) return null;

    const ingredientsInfo = order.ingredients.reduce(
      (acc: TIngredient[], item: string) => {
        const ingredient = ingredients.find((ing) => ing._id === item);
        if (ingredient) return [...acc, ingredient];
        return acc;
      },
      []
    );

    const total = ingredientsInfo.reduce((acc, item) => acc + item.price, 0);

    const ingredientsToShow = ingredientsInfo.slice(0, maxIngredients);

    const remains =
      ingredientsInfo.length > maxIngredients
        ? ingredientsInfo.length - maxIngredients
        : 0;

    const date = new Date(order.createdAt);
    return {
      ...order,
      ingredientsInfo,
      ingredientsToShow,
      remains,
      total,
      date
    };
  }, [order, ingredients]);

  if (!orderInfo) return null;

  return (
    <OrderCardUI
      orderInfo={orderInfo}
      maxIngredients={maxIngredients}
      locationState={{ background: location }}
      newOrder={newOrder}
    />
  );
});
