import React from 'react';
import { adminReducer, AdminState, initState, Actions } from './adminReducer';
import { refreshToken } from '../service/admin/auth'
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
      await refreshToken(history);
      dispatch({ type: 'SET_HAS_TOKEN', payload: { hasToken: true } });
      // auto refresh
      const intervalId = setInterval(() => {
        setNow(new Date());
        refreshToken(history);
      }, 400000);
      return () => {
        clearInterval(intervalId);
      };
    };
    fn();
  }, []);

  return (
    <>
      <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
    </>
  );
};
