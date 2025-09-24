import './index.css';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProtectedRoute } from '@/components/Authentication/ProtectedRoute';
import { RoleRoute } from '@/components/Authentication/RoleRoute';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import { Toaster } from '@/components/ui/toaster';
import { SonnerToaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AuthLayout } from '@/components/Authentication/AuthLayout';
import { Forbidden } from '@/pages/Forbidden';
import { LandingPage } from '@/pages/LandingPage';
import { Gallery } from '@/pages/Gallery';
import { useAuthStore } from '@/store/authStore';
import { useSchoolStore } from '@/store/schoolStore';
import { Student } from './components/Students/Student';
import {StudentWrapper} from './components/Students/StudentWrapper';

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
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Index />
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
  },
  {
    path: '/students/grade/:name',
    element: <StudentWrapper paramType="grade" onBack={() => {}} />
  },
  {
    path: '/students/section/:name',
    element: <StudentWrapper paramType="section" onBack={() => {}} />
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
