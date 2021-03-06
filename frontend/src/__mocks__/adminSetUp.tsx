import '@testing-library/jest-dom/extend-expect';

import { AxiosResponse } from 'axios';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Route, Router } from 'react-router-dom';
import { mocked } from 'ts-jest/utils';
import { QueryParamProvider } from 'use-query-params';

import { act, cleanup, render } from '@testing-library/react';

import AdminLayout from '../components/admin/layout/AdminLayout';
import { AdminContextProvider } from '../context/adminContext';
import { setUserDataFromStorage } from '../context/adminContextStorages';
import { refreshAuthToken, useLogout } from '../service/admin/auth';
import { setStaffUserMock } from './context/adminContextStorages';
import { refreshTokenAxiosResponse } from './serviceResponse/auth';

afterEach(() => cleanup());
jest.mock('../service/admin/auth');
jest.mock('../context/adminContextStorages');
export const setUp = async (initialPath: string) => {


  beforeEach(() => {
    mocked(refreshAuthToken).mockClear();
    mocked(setUserDataFromStorage).mockClear();
  })
  mocked(refreshAuthToken).mockImplementation(
    (): Promise<AxiosResponse<any>> => Promise.resolve(refreshTokenAxiosResponse)
  )
  mocked(setUserDataFromStorage).mockImplementation(
    (dispatch) => setStaffUserMock(dispatch)
  )
  mocked(useLogout).mockImplementation(
    () => {
      const logout = React.useCallback(() => {
      }, []);
      return [logout]
    }
  )
  const history = createMemoryHistory();
  history.push(initialPath);
  let utils: any;
  await act(async () => {
    utils = render(
      <Router history={history}>
        <QueryParamProvider ReactRouterRoute={Route}>
          <AdminContextProvider>
            <AdminLayout />
          </AdminContextProvider>
        </QueryParamProvider>
      </Router>
    )
  })

  return { utils, history };
}