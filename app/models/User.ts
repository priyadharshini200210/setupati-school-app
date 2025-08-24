export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
  password: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LoginUser{
  email: string;
  password: string;
}