import { useSelector } from '@src/services/store';
import { selectIsAuthorized, selectIsAuthorizing } from '@selectors';
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';

export interface ProtectedRouteProps {
  unauthorizedOnly?: boolean;
  children?: React.ReactNode;
}

export const ProtectedRoute = ({
  unauthorizedOnly,
  children
}: ProtectedRouteProps) => {
  const isAuthorizing = useSelector(selectIsAuthorizing);
  const isAuthorized = useSelector(selectIsAuthorized);
  const location = useLocation();

  if (isAuthorizing) return <Preloader />;

  if (!unauthorizedOnly && !isAuthorized)
    return <Navigate to='/login' state={{ from: location }} replace />;
  if (unauthorizedOnly && isAuthorized)
    return <Navigate to={location.state?.from || '/'} replace />;

  return children ?? <Outlet />;
};
