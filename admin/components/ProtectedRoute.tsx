import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f1f5f9]">
        <div className="w-8 h-8 border-2 border-slate-200 border-t-[#1e293b] rounded-full animate-spin" />
      </div>
    );
  }

  return user ? (
    <>{children}</>
  ) : (
    <Navigate to="/admin/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
