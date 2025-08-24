import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

export const AuthLayout: React.FC = () => {
  const [currentView, setCurrentView] = useState<'login' | 'forgot'>('login');
  const location = useLocation();
  const { isAuthenticated } = useAuthStore();

  const handleShowForgotPassword = () => {
    setCurrentView('forgot');
  };

  const handleBackToLogin = () => {
    setCurrentView('login');
  };

  return isAuthenticated ? (
    <Navigate to="/dashboard" state={{ from: location }} replace />
  ) : (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Setupati School Login
          </h1>
          <p className="text-muted-foreground">
            Empowering Education Through Technology
          </p>
        </div>

        <div className="transition-all duration-300 ease-in-out">
          {currentView === 'login' ? (
            <LoginForm onForgotPassword={handleShowForgotPassword} />
          ) : (
            <ForgotPasswordForm onBackToLogin={handleBackToLogin} />
          )}
        </div>

        <div className="text-center mt-8">
          <p className="text-xs text-muted-foreground">
            © 2025 School ERP System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
