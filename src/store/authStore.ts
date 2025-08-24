import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { onAuthStateChanged, getIdTokenResult, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

type Role = 'admin' | 'teacher' | 'student' | null;

interface AuthState {
  user: User | null;
  role: Role;
  loading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setRole: (role: Role) => void;
  setLoading: (loading: boolean) => void;
  hasRole: (roles: string[]) => boolean;
  resetAuthStore: () => void;
  initAuthListener: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        role: null,
        loading: true,
        isAuthenticated: false,

        setUser: (user) =>
          set({
            user,
            isAuthenticated: !!user
          }),

        setRole: (role) => set({ role }),
        setLoading: (loading) => set({ loading }),

        hasRole: (roles) => roles.includes(get().role ?? ''),

        resetAuthStore: () =>
          set({
            user: null,
            role: null,
            loading: true,
            isAuthenticated: false
          }),

        initAuthListener: () => {
          onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
              const tokenResult = await getIdTokenResult(firebaseUser);
              const claims = tokenResult.claims;

              set({
                user: firebaseUser,
                role: claims.role as Role,
                isAuthenticated: true,
                loading: false
              });
            } else {
              set({
                user: null,
                role: null,
                isAuthenticated: false,
                loading: false
              });
            }
          });
        }
      }),
      {
        name: 'auth-store'
      }
    )
  )
);
