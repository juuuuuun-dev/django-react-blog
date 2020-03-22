import React from 'react';
import { adminReducer, AdminState, initState, Actions } from './adminReducer';
import { get, set, remove, } from 'local-storage';
import axios from '../helper/client';
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

  React.useEffect(() => {
    verifyAuth();
  });

  const verifyAuth = async () => {
    const refresh: string = get('refresh');
    if (refresh) {
      try {
        const res = await axios.post('/blog_auth/token/refresh/', { refresh });
        const { access } = res.data;
        set<string>('token', access);
        dispatch({ type: 'SET_TOKEN', payload: { token: access } })
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