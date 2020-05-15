import React, { useMemo } from 'react';
import { adminReducer } from './adminReducer';
import { AdminState, providerProps } from '../types/adminContext';
import { refreshAuthToken, useLogout } from '../service/admin/auth'
import { useHistory } from 'react-router-dom';
import { get, set } from 'local-storage';
import { setClientToken } from '../service/client';


const initState: AdminState = {
  isSiderShow: true,
  loading: false,
  hasToken: false,
  username: '',
  thumb: '',
  pageSize: parseInt(process.env.pageSize || "20"),
};

export const AdminContext = React.createContext({} as providerProps);

export const AdminContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(adminReducer, initState);
  const history = useHistory();
  const refresh: string = get('refresh');
  const providerValue = React.useMemo((): providerProps => [state, dispatch], [state, dispatch]);
  const [logout] = useLogout();
  const fetchToken = React.useCallback(async () => {
    console.log("fetchToken")
    try {
      const res = await refreshAuthToken(refresh);
      const { access } = res.data;
      set<string>('token', access);
      setClientToken(access);
    } catch (e) {
      logout();
    }
  }, [refresh, logout]);

  const setAuthToken = React.useCallback(async () => {
    try {
      await fetchToken();
      dispatch({ type: 'SET_HAS_TOKEN', payload: { hasToken: true } });
      dispatch({ type: 'SET_USERNAME', payload: { username: get("username") } });
      dispatch({ type: 'SET_THUMB', payload: { thumb: get("thumb") } });
    } catch (e) {
      logout();
    }
  }, [fetchToken, logout]);

  React.useEffect(() => {
    const fn = async () => {
      await setAuthToken();
      const intervalId = setInterval(() => {
        fetchToken();
      }, 400000);
      return () => {
        clearInterval(intervalId);
      };
    };
    fn();
  }, [history, refresh, setAuthToken, fetchToken]);
  return useMemo(() => {
    return (
      <>
        <AdminContext.Provider value={providerValue}>{children}</AdminContext.Provider>
      </>
    );
  }, [providerValue, children])
};
