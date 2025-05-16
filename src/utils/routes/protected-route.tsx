import { useSelector } from '@src/services/store';
import { selectIsAuthorized } from '@selectors';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export interface ProtectedRouteProps {
  unauthorizedOnly?: boolean;
  children?: React.ReactNode;
}

export const ProtectedRoute = ({
  unauthorizedOnly,
  children
}: ProtectedRouteProps) => {
  const isAuthorized = useSelector(selectIsAuthorized);

  if (!unauthorizedOnly === isAuthorized) return children ?? <Outlet />;

  if (!unauthorizedOnly) return <Navigate to='/login' replace />;
  return <Navigate to='/profile' replace />;
};
