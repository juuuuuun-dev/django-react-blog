import React from 'react';
import { adminReducer, AdminState, initState, Actions } from './adminReducer';
import { get, set, remove } from 'local-storage';

import axios, { setClientToken } from '../helper/client';
import { useHistory } from 'react-router-dom';

interface AdminContextProviderProps {
  children: React.ReactNode;
}
interface IContextProps {
  state: AdminState;
  dispatch: React.Dispatch<Actions>;
}
export const AdminContext = React.createContext({} as IContextProps);

export const AdminContextProvider = ({ children }: AdminContextProviderProps) => {
  const [state, dispatch] = React.useReducer(adminReducer, initState);
  const value = { state, dispatch };
  const history = useHistory();
  const [now, setNow] = React.useState(new Date());

  React.useEffect(() => {
    const fn = async () => {
      const token = get<string>('token');
      await initToken(token);
      const intervalId = setInterval(() => {
        setNow(new Date());
        refreshToken();
      }, 300000);
      return () => {
        clearInterval(intervalId);
      };
    };
    fn();
  }, []);

  const initToken = async (token: string) => {
    return new Promise(resolve => {
      dispatch({ type: 'SET_HAS_TOKEN', payload: { hasToken: true } });
      setClientToken(token);
      set<string>('token', token);
      resolve();
    });
  };

  const refreshToken = async () => {
    console.log('refresh token');
    const refresh: string = get('refresh');
    if (refresh) {
      try {
        const res = await axios.post('/blog_auth/token/refresh/', { refresh });
        const { access } = res.data;
        set<string>('token', access);
        setClientToken(access);
      } catch {
        logout(history);
      }
    } else {
      logout(history);
    }
  };

  return (
    <>
      <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
    </>
  );
};

export const logout = (history: any) => {
  history.push('/login');
  remove('token');
  remove('refresh');
  remove('username');
};
