import React from 'react';
import { Router, Route } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { QueryParamProvider } from 'use-query-params';
import { AdminContextProvider } from '../../../../context/adminContext';
import { render, cleanup, getByTestId, getByText } from '@testing-library/react'
// import { act } from '@testing-library/react-hooks'
import { act } from 'react-dom/test-utils';
import Index from '../../../../pages/admin/media/index'
import "@testing-library/jest-dom/extend-expect";
import { mocked } from 'ts-jest/utils'
import { refreshToken } from '../../../../service/admin/auth'


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
/**
 * @todo getb token
 */
const spyReturns = (returnValue: any) => jest.fn(() => returnValue);

describe("Admin media", () => {

  beforeEach(() => {
    mocked(refreshToken).mockClear()
  })

  it("renders media", async () => {
    mocked(refreshToken).mockImplementation(
      (): Promise<void> => {
        return new Promise((resolve) => {
          console.log("refreshToken")
          resolve();
        })
      }
    )
    const history = createMemoryHistory()
    await act(async () => {
      const { container, getByText } = render(
        <Router history={history}>
          <QueryParamProvider ReactRouterRoute={Route}>
            <AdminContextProvider>
              <Index />
            </AdminContextProvider>
          </QueryParamProvider>
        </Router>
      )
    })

  })
})