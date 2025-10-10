import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';

interface PrivateRouteProps {
  children: React.ReactElement;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isLoggedIn, isLoading } = useAuthStore();

  if (isLoading) {
    return null;
  }

  if (!isLoggedIn) {
    return <Navigate to="/mypage" replace />;
  }

  return children;
};
