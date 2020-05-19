import React from 'react';
import { mocked } from 'ts-jest/utils';
import { AxiosResponse } from 'axios';
import { createMemoryHistory } from 'history'
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react'
import { Router } from 'react-router-dom';
import { defaultErrorText } from '../../components/common/toast'
import { login } from '../../service/admin/auth';
import LoginLayout from '../../components/login/layout/LoginLayout';

afterEach(() => cleanup());
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

const setUp = () => {
  const history = createMemoryHistory();
  history.push('/login');
  const utils = render(
    <Router history={history}>
      <LoginLayout />
    </Router>
  )
  return { utils, history };
}

describe("Login", () => {
  beforeEach(() => {
    mocked(login).mockClear();
  });
  // success
  it("Successful login", async () => {
    mocked(login).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(successAxiosResponse)
    );
    const { utils, history } = setUp();
    expect(utils.getByLabelText("input-email")).toBeTruthy();
    fireEvent.change(utils.getByLabelText("input-email"), { target: { value: 'test@test.com' } })
    fireEvent.change(utils.getByLabelText("input-password"), { target: { value: '123456' } })
    fireEvent.submit(utils.getByLabelText("login-submit"))
    await waitFor(() => {
      expect(history.location.pathname).toBe('/admin/dashboard');
    })
  });
  // 401
  it("401 error", async () => {
    mocked(login).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.reject({ response: errorAxiosResponse })
    );
    const { utils, history } = setUp();
    expect(utils.getByLabelText("input-email")).toBeTruthy();
    fireEvent.change(utils.getByLabelText("input-email"), { target: { value: 'test@test.com' } })
    fireEvent.change(utils.getByLabelText("input-password"), { target: { value: '123456' } })
    fireEvent.submit(utils.getByLabelText("login-submit"))
    await waitFor(() => {
      expect(utils.getByText("No active account found with the given credentials")).toBeTruthy();
      expect(history.location.pathname).toBe('/login');
    })
  })
});