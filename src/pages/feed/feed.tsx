import { selectFeedOrders } from '@selectors';
import { feedRetrieve } from '@slices';
import { useDispatch, useSelector } from '@src/services/store';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const orders: TOrder[] = useSelector(selectFeedOrders);

  const updateFeed = () => dispatch(feedRetrieve());

  useEffect(() => {
    updateFeed();
    const interval = setInterval(updateFeed, 15 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={updateFeed} />;
};
