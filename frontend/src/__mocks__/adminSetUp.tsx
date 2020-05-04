import React from 'react';
import { mocked } from 'ts-jest/utils'
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history'
import { QueryParamProvider } from 'use-query-params';
import { render, cleanup, act } from '@testing-library/react'
import { refreshToken } from '../service/admin/auth'
import AdminLayout from '../components/admin/layout/AdminLayout';
import "@testing-library/jest-dom/extend-expect";

afterEach(() => cleanup());
jest.mock('../service/admin/auth');


export const setUp = async (initialPath: string) => {
  beforeEach(() => {
    mocked(refreshToken).mockClear();
  })
  mocked(refreshToken).mockImplementation(
    (): Promise<void> => {
      return new Promise((resolve) => {
        resolve();
      })
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