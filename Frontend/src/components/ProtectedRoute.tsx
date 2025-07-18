// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { ReactNode, JSX } from 'react';
import { isTokenExpired } from '../utils/auth'; // ✅ import

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props): JSX.Element => {
  const token = localStorage.getItem('token');

  if (!token || isTokenExpired()) {
    localStorage.removeItem('token'); // Clean up expired token
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
