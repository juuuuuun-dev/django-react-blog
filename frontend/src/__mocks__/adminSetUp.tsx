import React from 'react';
import { mocked } from 'ts-jest/utils'
import { refreshToken, login } from '../service/admin/auth'
import { createBrowserHistory } from 'history'
import { render, cleanup, fireEvent, waitFor, act } from '@testing-library/react'
import { Router } from 'react-router-dom'
import App from '../App';
import { AxiosResponse } from 'axios';

afterEach(() => cleanup());
jest.mock('../service/admin/auth');


export const successAxiosResponse: AxiosResponse = {
  data: {},
  status: 200,
  statusText: 'OK',
  config: {},
  headers: {},
};

export const adminSetUp = async () => {
  beforeEach(() => {
    mocked(refreshToken).mockClear();
    mocked(login).mockClear();
  })
  const history = createBrowserHistory()
  history.push('/login')
  /**
   * @todo edit mock
   */
  mocked(login).mockImplementation(
    (values): Promise<AxiosResponse<any>> => {
      return new Promise((resolve) => {
        resolve();
      })
    }
  )
  mocked(refreshToken).mockImplementation(
    (): Promise<void> => {
      return new Promise((resolve) => {
        resolve();
      })
    }
  )
  const Wrapper = () => {
    return (
      <Router history={history}>
        <App />
      </Router>
    )
  }
  const utils = render(<Wrapper />)
  const inputEmail = utils.getByLabelText("input-email")
  fireEvent.change(inputEmail, { target: { value: 'test@test.com' } })
  fireEvent.change(utils.getByLabelText("input-password"), { target: { value: '123456' } })
  act(() => {
    fireEvent.submit(utils.getByLabelText("login-submit"))
  })
  await waitFor(() => expect(utils.getAllByText("Dashboard")).toBeTruthy())
  return { utils, history };
}