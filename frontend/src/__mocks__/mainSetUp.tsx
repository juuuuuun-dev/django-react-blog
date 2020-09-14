
import { AxiosResponse } from 'axios';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Route, Router } from 'react-router-dom';
import { mocked } from 'ts-jest/utils';
import { QueryParamProvider } from 'use-query-params';

import { act, cleanup, render } from '@testing-library/react';

import MainLayout from '../components/main/layout/MainLayout';
import { MainContextProvider } from '../context/mainContext';

export const setUp = async (initialPath: string) => {

  const history = createMemoryHistory();
  history.push(initialPath);
  let utils: any;
  await act(async () => {
    utils = render(
      <Router history={history}>
        <QueryParamProvider ReactRouterRoute={Route}>
          <MainContextProvider>
            <MainLayout />
          </MainContextProvider>
        </QueryParamProvider>
      </Router>
    )
  })

  return { utils, history };
}