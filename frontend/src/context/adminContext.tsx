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
      await refreshToken();
      dispatch({ type: 'SET_HAS_TOKEN', payload: { hasToken: true } });
      // auto refresh
      const intervalId = setInterval(() => {
        setNow(new Date());
        refreshToken();
      }, 400000);
      return () => {
        clearInterval(intervalId);
      };
    };
    fn();
  }, []);

  const refreshToken = async () => {
    return new Promise(async (resolve, reject) => {
      const refresh: string = get('refresh');
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
