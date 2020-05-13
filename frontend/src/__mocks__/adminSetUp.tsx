import React from 'react';
import { AxiosResponse } from 'axios';
import { mocked } from 'ts-jest/utils';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { QueryParamProvider } from 'use-query-params';
import { renderHook } from '@testing-library/react-hooks'
import { render, cleanup, act } from '@testing-library/react';
import { refreshAuthToken, useLogout } from '../service/admin/auth';
import { refreshTokenAxiosResponse } from './serviceResponse/auth';
import AdminLayout from '../components/admin/layout/AdminLayout';
import "@testing-library/jest-dom/extend-expect";

afterEach(() => cleanup());
jest.mock('../service/admin/auth');

export const setUp = async (initialPath: string) => {
  const { result } = renderHook(() => useLogout());

  beforeEach(() => {
    mocked(refreshAuthToken).mockClear();
  })
  mocked(refreshAuthToken).mockImplementation(
    (): Promise<AxiosResponse<any>> => Promise.resolve(refreshTokenAxiosResponse)
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
          <AdminLayout />
        </QueryParamProvider>
      </Router>
    )
  })
  return { utils, history };
}