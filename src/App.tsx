import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ProtectedRoute } from '@/components/Authentication/ProtectedRoute';
import { RoleRoute } from '@/components/Authentication/RoleRoute';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import { Toaster } from '@/components/ui/toaster';
import { SonnerToaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AuthProvider } from '@/providers/AuthProvider';
import { AuthLayout } from '@/components/Authentication/AuthLayout';
import { Forbidden } from '@/pages/Forbidden';
import { LandingPage } from '@/pages/LandingPage';
import { Gallery } from '@/pages/Gallery';
import { Token } from '@/components/dev/Token';

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
    path: '/dev/token',
    element: (
      <ProtectedRoute>
        <RoleRoute allowedRoles={['admin']}>
          <Token />
        </RoleRoute>
      </ProtectedRoute>
    )
  },
  {
    path: '/403',
    element: <Forbidden />
  },
  // {
  //   path: '/',
  //   element: <AppLayout />,
  //   children: [
  //     {
  //       path: 'dashboard',
  //       element: (
  //         <ProtectedRoute>
  //           <DashboardPage />
  //         </ProtectedRoute>
  //       )
  //     },
  //     {
  //       path: 'admin',
  //       element: (
  //         <ProtectedRoute>
  //           <RoleRoute allowedRoles={['admin']}>
  //             <AdminPage />
  //           </RoleRoute>
  //         </ProtectedRoute>
  //       )
  //     },
  //     {
  //       path: 'teacher',
  //       element: (
  //         <ProtectedRoute>
  //           <RoleRoute allowedRoles={['teacher']}>
  //             <TeacherPage />
  //           </RoleRoute>
  //         </ProtectedRoute>
  //       )
  //     },
  //     {
  //       path: 'student',
  //       element: (
  //         <ProtectedRoute>
  //           <RoleRoute allowedRoles={['student']}>
  //             <StudentPage />
  //           </RoleRoute>
  //         </ProtectedRoute>
  //       )
  //     },
  {
    path: '*',
    element: <NotFound />
  }
]);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <SonnerToaster />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
