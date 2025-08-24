import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import { Toaster } from './components/ui/toaster';
import { SonnerToaster } from './components/ui/sonner';
import { TooltipProvider } from './components/ui/tooltip';
import { StudentsList } from './components/Students/StudentsList';
import { Student } from './components/Students/Student';

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
          <Route path="/students/:gradeName" element={<Student grade_name='grade_001' onBack={function (): void {
            throw new Error('Function not implemented.');
          } } />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
