import React from 'react';
import { adminReducer, AdminState, initState, Actions } from './adminReducer';
import { get as storageGet } from 'local-storage';
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

  React.useEffect(() => {
    verifyAuth();
  }, []);

  const verifyAuth = async () => {
    const token: string = storageGet('token');
    if (token) {
      await setToken(token);
      await dispatch({ type: 'SET_TOKEN', payload: { token: token } });
      try {
        const res = await axios.get('user/user-profile/');
        if (res.status === 200) {
          dispatch({ type: 'SET_PROFILE', payload: { profile: res.data.profile } });
          dispatch({ type: 'SET_USERNAME', payload: { username: res.data.username } });
        }
      } catch {
        history.push('/login');
      }
    }
  };
  return (
    <>
      <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
    </>
  );
};
