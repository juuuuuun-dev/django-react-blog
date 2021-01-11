import { get } from 'local-storage';
import React from 'react';

export const setUserDataFromStorage = (dispatch: React.Dispatch<any>) => {
  dispatch({ type: 'SET_HAS_TOKEN', payload: { hasToken: true } });
  dispatch({ type: 'SET_USERNAME', payload: { username: get("username") } });
  dispatch({ type: 'SET_IS_STAFF', payload: { isStaff: get("isStaff") } });
  dispatch({ type: 'SET_THUMB', payload: { thumb: get("thumb") } });
  dispatch({ type: 'SET_PAGE_SIZE', payload: { pageSize: get("pageSize") } });
}