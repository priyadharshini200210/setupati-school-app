import { useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { onAuthStateChanged, getIdTokenResult, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<'admin' | 'teacher' | 'student' | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const tokenResult = await getIdTokenResult(firebaseUser);
        const claims = tokenResult.claims;

        setUser(firebaseUser);
        setRole(claims.role as 'admin' | 'teacher' | 'student');
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const hasRole = (roles: string[]) => roles.includes(role ?? '');

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        isAuthenticated: !!user,
        hasRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
