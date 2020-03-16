import React from 'react';
import { adminReducer, AdminState, initState, Actions } from './adminReducer';
import { get as storageGet } from 'local-storage';
import { setToken, get } from '../helper/client';

const verifyAuth = async () => {
  const token = storageGet('token');
  if (token) {
    setToken(token);
    get('user/user-profile/')
      .then(res => {
        console.log(res);
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
  React.useEffect(() => {
    verifyAuth();
  });
  const [state, dispatch] = React.useReducer(adminReducer, initState);
  const value = { state, dispatch };
  return (
    <>
      <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
    </>
  );
};
