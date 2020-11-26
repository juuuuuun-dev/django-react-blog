
import { createMemoryHistory } from 'history';
import React from 'react';
import { Route, Router } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';

import { act, render } from '@testing-library/react';

import ErrorLayout from '../components/error/layout/ErrorLayout';

export const setUp = async (initialPath: string) => {
  const history = createMemoryHistory();
  history.push(initialPath);
  let utils: any;
  await act(async () => {
    utils = render(
      <Router history={history}>
        <QueryParamProvider ReactRouterRoute={Route}>
          <ErrorLayout />
        </QueryParamProvider>
      </Router>
    )
  })

  return { utils, history };
}