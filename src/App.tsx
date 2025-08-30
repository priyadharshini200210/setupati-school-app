import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import { Toaster } from './components/ui/toaster';
import { SonnerToaster } from './components/ui/sonner';
import { TooltipProvider } from './components/ui/tooltip';
import { StudentsList } from './components/Students/Students';
import { Student } from './components/Students/Student';
import {StudentWrapper} from './components/Students/StudentWrapper';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <SonnerToaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />

<Route
  path="/students/grade/:name"
  element={<StudentWrapper paramType="grade" onBack={() => {}} />}
  />

<Route
  path="/students/section/:name"
  element={<StudentWrapper paramType="section" onBack={() => {}} />}
/>

      </Routes>
    </BrowserRouter>
  </TooltipProvider>
</QueryClientProvider>
);

export default App;
