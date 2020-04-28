import React from 'react';
import { Router, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { QueryParamProvider } from 'use-query-params';
import { AdminContextProvider } from '../../../../context/adminContext';
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react'
import App from '../../../../App';
// import { act } from '@testing-library/react-hooks'
import { act } from 'react-dom/test-utils';
import Index from '../../../../pages/admin/media/index'
import "@testing-library/jest-dom/extend-expect";
import { mocked } from 'ts-jest/utils'
import { refreshToken, login } from '../../../../service/admin/auth'
import { list } from '../../../../service/admin/media';
import { AxiosResponse } from 'axios';
import { listData } from '../../../../__mocks__/mediaData';

afterEach(() => cleanup());

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

jest.mock('../../../../service/admin/auth');
jest.mock('../../../../service/admin/media');

/**
 * @todo getb token
 */
const spyReturns = (returnValue: any) => jest.fn(() => returnValue);

describe("Admin-media", () => {

  beforeEach(() => {
    mocked(refreshToken).mockClear();
    mocked(login).mockClear();
    mocked(list).mockClear()
  })
  const history = createBrowserHistory()
  history.push('/login')
  const axiosResponse: AxiosResponse = {
    data: listData,
    status: 200,
    statusText: 'OK',
    config: {},
    headers: {},
  };

  it("renders media index", async () => {
    mocked(login).mockImplementation(
      (history, values): Promise<void> => {
        return new Promise((resolve) => {
          history.push('/admin/dashboard');
          resolve();
        })
      }
    )
    mocked(refreshToken).mockImplementation(
      (): Promise<void> => {
        return new Promise((resolve) => {
          console.log("refreshdayo")
          resolve();
        })
      }
    )
    mocked(list).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(axiosResponse)
    );

    const Wrapper = () => {
      return (
        <Router history={history}>
          <App />
        </Router>
      )
    }
    const utils = render(<Wrapper />)

    const name = await utils.getAllByText("Login")
    const inputEmail = utils.getByLabelText("email")
    fireEvent.change(inputEmail, { target: { value: 'test@test.com' } })
    fireEvent.change(utils.getByLabelText("password"), { target: { value: '123456' } })
    act(() => {
      fireEvent.submit(utils.getByLabelText("login-submit"))
    })
    await waitFor(() => expect(utils.getAllByText("Dashboard")).toBeTruthy())
    console.log(utils.container.innerHTML)


    // expect(name).toBeInTheDocument()
    // fireEvent.click(name)
    // console.log(container.innerHTML)
  })
})