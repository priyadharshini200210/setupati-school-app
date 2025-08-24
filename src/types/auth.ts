// types.ts
export type AuthError = {
  code: string;
  message: string;
};

export type UserRole = 'admin' | 'teacher' | 'student' | 'guest';

export type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
};
