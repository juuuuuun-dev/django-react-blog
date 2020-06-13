
import { AxiosResponse } from 'axios';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Route, Router } from 'react-router-dom';
import { mocked } from 'ts-jest/utils';
import { QueryParamProvider } from 'use-query-params';

import { act, render } from '@testing-library/react';

import MainLayout from '../components/main/layout/MainLayout';

jest.mock('../service/admin/auth');

export const setUp = async (initialPath: string) => {


  beforeEach(() => {
    // mocked(refreshAuthToken).mockClear();
  })
  // mocked(refreshAuthToken).mockImplementation(
  //   (): Promise<AxiosResponse<any>> => Promise.resolve(refreshTokenAxiosResponse)
  // )

  const history = createMemoryHistory();
  history.push(initialPath);
  let utils: any;
  await act(async () => {
    utils = render(
      <Router history={history}>
        <QueryParamProvider ReactRouterRoute={Route}>
          <MainLayout />
        </QueryParamProvider>
      </Router>
    )
  })

  return { utils, history };
}