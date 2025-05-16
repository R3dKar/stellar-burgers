import { FC, useMemo } from 'react';
import { Preloader, OrderInfoUI } from '@ui';
import { TIngredient, TOrder } from '@utils-types';
import { selectIngredients } from '@selectors';
import { useSelector } from '@src/services/store';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import { getOrderByNumberApi } from '@api';

export const OrderInfoLoader = async ({
  params
}: LoaderFunctionArgs): Promise<TOrder | undefined> =>
  (await getOrderByNumberApi(+params.number!)).orders[0];

export const OrderInfo: FC = () => {
  const orderData = useLoaderData() as TOrder | undefined;
  const ingredients = useSelector(selectIngredients)!;

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

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

  return <OrderInfoUI orderInfo={orderInfo} />;
};
