import { AxiosResponse } from 'axios';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { mocked } from 'ts-jest/utils';

import { fireEvent, render, waitFor } from '@testing-library/react';

import { defaultErrorText } from '../../components/common/toast';
import ErrorLayout from '../../components/error/layout/ErrorLayout';
import { login } from '../../service/admin/auth';

jest.mock('../../service/admin/auth');

export const successAxiosResponse: AxiosResponse = {
  data: {
    access: "test-token",
    refresh: "test-refresh",
    username: "Abe",
  },
  status: 200,
  statusText: 'OK',
  config: {},
  headers: {},
};


export const errorAxiosResponse: AxiosResponse = {
  data: {
    detail: "No active account found with the given credentials",
  },
  status: 404,
  statusText: 'Error',
  config: {},
  headers: {},
};

export const errorRestrictingRequestAxiosResponse: AxiosResponse = {
  data: {
    detail: "Restricting requests",
  },
  status: 429,
  statusText: 'Error',
  config: {},
  headers: {},
};


export const errorNoneDetailAxiosResponse: AxiosResponse = {
  data: {},
  status: 500,
  statusText: 'Error',
  config: {},
  headers: {},
};

const setUp = (path: string = '/error') => {
  const history = createMemoryHistory();
  history.push(path);
  const utils = render(
    <Router history={history}>
      <ErrorLayout />
    </Router>
  )
  return { utils, history };
}

describe("Error page", () => {
  beforeEach(() => {
    mocked(login).mockClear();
  });
  it("404 error", async () => {
    mocked(login).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(successAxiosResponse)
    );
    const { utils, history } = setUp('/error');
    console.log(utils.container.innerHTML)
    await waitFor(() => {
      expect(utils.getByTestId('error-code').innerHTML).toMatch('404')
    })
    // await waitFor(() => {
    //   expect(history.location.pathname).toBe('/admin/dashboard');
    // })
  });
});