import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '@src/services/store';
import { selectUser } from '@selectors';

export const AppHeader: FC = () => {
  const user = useSelector(selectUser);

  return <AppHeaderUI userName={user?.name} />;
};
