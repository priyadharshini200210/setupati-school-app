import { createContext } from 'react';
import { User } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
  role: 'admin' | 'teacher' | 'student' | null;
  loading: boolean;
  isAuthenticated: boolean;
  hasRole: (roles: string[]) => boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);
