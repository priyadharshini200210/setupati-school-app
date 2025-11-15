import './index.css';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Main, Gallery, Forbidden, LandingPage, NotFound } from '@/pages';
import { Toaster } from '@/components/ui/toaster';
import { SonnerToaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AuthLayout, ProtectedRoute } from '@/components/Authentication';
import { useAuthStore, useSchoolStore } from '@/store';

const queryClient = new QueryClient();

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/gallery',
    element: <Gallery />
  },
  {
    path: 'auth/login',
    element: <AuthLayout />
  },
  {
    path: 'auth/forgot-password',
    element: <AuthLayout />
  },
  {
    path: 'auth/reset-password',
    element: <AuthLayout />
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Main />
      </ProtectedRoute>
    )
  },
  {
    path: '/403',
    element: <Forbidden />
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

const App = () => {
  const { initAuthListener } = useAuthStore();
  const { initCurrentUser } = useSchoolStore();

  useEffect(() => {
    const initializeApp = async () => {
      await initAuthListener();
      await initCurrentUser();
    };

    initializeApp();
  }, [initAuthListener, initCurrentUser]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <SonnerToaster />
        <RouterProvider router={router} />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
