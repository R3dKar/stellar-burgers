import { useSelector } from '@src/services/store';
import { selectIsAuthorized } from '@src/services/user-slice';
import React from 'react';
import { Navigate } from 'react-router-dom';

export interface MakeProtectedProps {
  requireAuthorization: boolean;
}

export const makeProtected =
  (
    Target: React.ComponentType,
    { requireAuthorization }: MakeProtectedProps = {
      requireAuthorization: true
    }
  ) =>
  () => {
    const isAuthorized = useSelector(selectIsAuthorized);

    if (requireAuthorization === isAuthorized) return <Target />;

    if (requireAuthorization) return <Navigate to='/login' replace />;
    else return <Navigate to='/profile' replace />;
  };
