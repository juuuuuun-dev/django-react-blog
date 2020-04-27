import React from 'react';
import { Router, Route } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { QueryParamProvider } from 'use-query-params';
import { AdminContextProvider } from '../../../../context/adminContext';
import { render, cleanup } from '@testing-library/react'
import ReactDOM from 'react-dom';
// import { act } from '@testing-library/react-hooks'
import { act } from 'react-dom/test-utils';
import Index from '../../../../pages/admin/media/index'
import "@testing-library/jest-dom/extend-expect";
import { mocked } from 'ts-jest/utils'
import { refreshToken } from '../../../../service/admin/auth'
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

describe("Admin media", () => {

  beforeEach(() => {
    mocked(refreshToken).mockClear();
    mocked(list).mockClear()
  })
  const axiosResponse: AxiosResponse = {
    data: listData,
    status: 200,
    statusText: 'OK',
    config: {},
    headers: {},
  };

  it("renders media index", async () => {
    mocked(refreshToken).mockImplementation(
      (): Promise<void> => {
        return new Promise((resolve) => {
          resolve();
        })
      }
    )
    mocked(list).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(axiosResponse)
    );
    const history = createMemoryHistory()
    const MediaIndex = () => {
      return (
        <Router history={history}>
          <QueryParamProvider ReactRouterRoute={Route}>
            <AdminContextProvider>
              <Index />
            </AdminContextProvider>
          </QueryParamProvider>
        </Router>
      )
    }
    const { container, findByText } = render(<MediaIndex />)
    expect(await findByText(listData.results[0].name)).toBeInTheDocument()
  })
})