import React from 'react';
import { adminReducer, AdminState, initState, Actions } from './adminReducer';
import { get, set, remove, } from 'local-storage';
import axios, { setToken } from '../helper/client';
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
    const token = get<string>('token');
    dispatch({ type: 'SET_TOKEN', payload: { token } })
    setToken(token);
    const intervalId = setInterval(() => {
      setNow(new Date());
      console.log('setInt');
      verifyAuth();
    }, 500000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const verifyAuth = async () => {
    const refresh: string = get('refresh');
    if (refresh) {
      try {
        const res = await axios.post('/blog_auth/token/refresh/', { refresh });
        const { access } = res.data;
        set<string>('token', access);
        dispatch({ type: 'SET_TOKEN', payload: { token: access } })
        setToken(access);
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
}