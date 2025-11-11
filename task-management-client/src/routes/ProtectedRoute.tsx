import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { ROUTES } from '../constants/routes';
import type { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { accessToken } = useSelector((state: RootState) => state.auth);

  if (!accessToken) {
    return <Navigate to={ROUTES.SIGN_IN} replace />;
  }

  return children;
};

export default ProtectedRoute;
