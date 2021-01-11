import React from 'react';

export const setStaffUserMock = (dispatch: React.Dispatch<any>) => {
  dispatch({ type: 'SET_HAS_TOKEN', payload: { hasToken: true } });
  dispatch({ type: 'SET_USERNAME', payload: { username: "staff" } });
  dispatch({ type: 'SET_IS_STAFF', payload: { isStaff: true } });
  dispatch({ type: 'SET_THUMB', payload: { thumb: undefined } });
  dispatch({ type: 'SET_PAGE_SIZE', payload: { pageSize: 1 } });
}