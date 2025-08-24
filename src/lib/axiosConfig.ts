import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { BACKEND_URL } from '@/lib/utils';

const api = axios.create({
  baseURL: `${BACKEND_URL}`
});

api.interceptors.request.use(async (config) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdToken();
    // for dev use only
    console.log('userToken', token);
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
