import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '@src/services/store';
import { burgerDisposeModal, burgerMakeOrder } from '@slices';
import {
  selectConstructorItems,
  selectOrderRequest,
  selectOrderModalData,
  selectIsAuthorized
} from '@selectors';
import { useLocation, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();

  const constructorItems = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);

  const navigate = useNavigate();
  const location = useLocation();
  const isAuthorized = useSelector(selectIsAuthorized);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (isAuthorized) dispatch(burgerMakeOrder(constructorItems));
    else navigate('/login', { replace: true, state: { from: location } });
  };

  const closeOrderModal = () => dispatch(burgerDisposeModal());

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
