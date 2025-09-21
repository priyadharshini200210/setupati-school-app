import { User } from 'firebase/auth';

export interface AuthError {
  code: string;
  message: string;
}

export type UserRole = 'admin' | 'teacher' | 'student' | null;

export interface AuthState {
  user: User | null;
  role: UserRole;
  loading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setRole: (role: UserRole) => void;
  setLoading: (loading: boolean) => void;
  hasRole: (roles: string[]) => boolean;
  resetAuthStore: () => void;
  initAuthListener: () => void;
}

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}
