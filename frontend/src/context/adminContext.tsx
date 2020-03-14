import React, { Children, useReducer } from 'react';
import { adminReducer, AdminState, initState, Actions } from './adminReducer';


interface AdminContextProviderProps {
  children: React.ReactNode;
}
interface IContextProps {
  state: AdminState;
  dispatch: React.Dispatch<Actions>;
}
export const AdminContext = React.createContext({} as IContextProps);

export const AdminContextProvider = ({ children }: AdminContextProviderProps) => {
  const [state, dispatch] = useReducer(adminReducer, initState)
  const value = { state, dispatch }
  return (
    <>
      <AdminContext.Provider value={value}>
        {children}
      </AdminContext.Provider>
    </>
  );
}
