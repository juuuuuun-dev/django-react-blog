import { get, set } from 'local-storage';
import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';

import { refreshAuthToken, useLogout } from '../service/admin/auth';
import { setClientToken } from '../service/client';
import { AdminState, providerProps } from '../types/adminContext';
import { setUserDataFromStorage } from './adminContextStorages';
import { adminReducer } from './adminReducer';

const initState: AdminState = {
  isSiderShow: true,
  loading: false,
  hasToken: false,
  isStaff: false,
  username: '',
  thumb: '',
  pageSize: 20,
  dateFormat: process.env.REACT_APP_DATE_FORMAT || "YYYY-MM-DD",
  dateTimeFormat: process.env.REACT_APP__DATETIME_FORMAT || "YYYY-MM-DD hh:mm:ss",
};

export const AdminContext = React.createContext({} as providerProps);


export const AdminContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(adminReducer, initState);
  const history = useHistory();
  const refresh: string = get('refresh');
  const providerValue = React.useMemo((): providerProps => [state, dispatch], [state, dispatch]);
  const [logout] = useLogout();
  const fetchToken = React.useCallback(async () => {
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
      setUserDataFromStorage(dispatch)
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
