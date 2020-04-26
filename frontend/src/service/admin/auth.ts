import axios, { setClientToken } from '../../helper/client';
import { get, set, remove } from 'local-storage';

export const refreshToken = async (history: any): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    const refresh: string = get('refresh');
    console.log({ refresh })
    if (refresh) {
      try {
        const res = await axios.post('/blog_auth/token/refresh/', { refresh });
        const { access } = res.data;
        set<string>('token', access);
        setClientToken(access);
        resolve();
      } catch {
        logout(history);
      }
    } else {
      logout(history);
      reject();
    }
  });
};

export const logout = (history: any): void => {
  history.push('/login');
  remove('token');
  remove('refresh');
  remove('username');
};