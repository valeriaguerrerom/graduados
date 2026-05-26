import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowIncomplete?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowIncomplete = false }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowIncomplete && user && !user.hasCompletedProfile) {
    return <Navigate to="/complete-profile" replace />;
  }

  // Verificar actualización anual obligatoria
  if (!allowIncomplete && localStorage.getItem('requiresUpdate') === 'true') {
    return <Navigate to="/complete-profile" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
