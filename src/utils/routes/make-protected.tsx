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
    // TODO: получать информацию из слайса
    const isAuthorized = true;

    if (requireAuthorization === isAuthorized) return <Target />;

    if (requireAuthorization) return <Navigate to='/login' replace />;
    else return <Navigate to='/' replace />;
  };
