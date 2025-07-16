// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { ReactNode, JSX } from 'react'; // <-- Add JSX import

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props): JSX.Element => {
  const token = localStorage.getItem('token');
  return token ? <>{children}</> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
