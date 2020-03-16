import React from 'react';
import { adminReducer, AdminState, initState, Actions } from './adminReducer';
import { get as storageGet } from 'local-storage';
import { setToken, get } from '../helper/client';

const verifyAuth = async (dispatch: React.Dispatch<Actions>) => {
  const token = storageGet('token');
  if (token) {
    setToken(token);
    get('user/user-profile/')
      .then(res => {
        if (res.data.username) {
          console.log(res.data.profile);
          dispatch({ type: 'SET_PROFILE', payload: { profile: res.data.profile } });
          dispatch({ type: 'SET_USERNAME', payload: { username: res.data.username } });
          console.log(res);
        }
      })
      .catch(e => {
        console.log(e);
      });
  }
};

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
  React.useEffect(() => {
    verifyAuth(dispatch);
  }, [dispatch]);
  return (
    <>
      <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
    </>
  );
};
