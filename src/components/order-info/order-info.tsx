import { FC, useEffect, useMemo, useState } from 'react';
import { Preloader, OrderInfoUI } from '@ui';
import { TIngredient, TOrder } from '@utils-types';
import { selectIngredients } from '@selectors';
import { useSelector } from '@src/services/store';
import { useLocation, useParams } from 'react-router-dom';
import { getOrderByNumberApi } from '@api';
import { cancelable } from 'cancelable-promise';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const background = useLocation().state?.background;

  const [orderData, setOrderData] = useState<TOrder | undefined>();
  const ingredients = useSelector(selectIngredients);

  useEffect(() => {
    const apiPromise = cancelable(getOrderByNumberApi(+number!)).then((data) =>
      setOrderData(data.orders[0])
    );

    return () => apiPromise.cancel();
  }, []);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients?.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return (
    <>
      {!background && <div style={{ marginTop: '120px' }} />}
      <OrderInfoUI orderInfo={orderInfo} />
    </>
  );
};
