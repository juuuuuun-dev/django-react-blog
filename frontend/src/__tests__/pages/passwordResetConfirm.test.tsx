import React from 'react';
import { mocked } from 'ts-jest/utils';
import { AxiosResponse } from 'axios';
import { createMemoryHistory } from 'history'
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react'
import { Router } from 'react-router-dom';
import { defaultErrorText } from '../../components/common/toast'
import { passwordResetConfirm } from '../../service/admin/auth';
import LoginLayout from '../../components/login/layout/LoginLayout';
import '../../__mocks__/windowMatchMedia';

afterEach(() => cleanup());
jest.mock('../../service/admin/auth');

export const successAxiosResponse: AxiosResponse = {
  data: {},
  status: 200,
  statusText: 'OK',
  config: {},
  headers: {},
};

export const errorAxiosResponse: AxiosResponse = {
  data: {},
  status: 400,
  statusText: 'error',
  config: {},
  headers: {},
};

const setUp = () => {
  const history = createMemoryHistory();
  history.push('/password-reset-confirm/1/test-token');
  const utils = render(
    <Router history={history}>
      <LoginLayout />
    </Router>
  )
  return { utils, history };
}

describe("Password reset confirm", () => {
  beforeEach(() => {
    mocked(passwordResetConfirm).mockClear();
  })
  it("Successful submit", async () => {
    mocked(passwordResetConfirm).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(successAxiosResponse)
    );
    const { utils } = setUp();
    expect(utils.getByText("Reset password")).toBeTruthy();
    fireEvent.change(utils.getByLabelText("input-new-password"), { target: { value: "test1234" } });
    fireEvent.change(utils.getByLabelText("input-new-password2"), { target: { value: "test1234" } });
    fireEvent.submit(utils.getByLabelText("submit-new-password"));
    await waitFor(() => {
      expect(utils.getByText("Successful changed password")).toBeTruthy();
    })
  });

  // error
  it("Sending error", async () => {
    mocked(passwordResetConfirm).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.reject({ response: successAxiosResponse })
    );
    const { utils } = setUp();
    expect(utils.getByText("Reset password")).toBeTruthy();
    fireEvent.change(utils.getByLabelText("input-new-password"), { target: { value: "test1234" } });
    fireEvent.change(utils.getByLabelText("input-new-password2"), { target: { value: "test1234" } });
    fireEvent.submit(utils.getByLabelText("submit-new-password"));
    await waitFor(() => {
      expect(utils.getByText(defaultErrorText)).toBeTruthy();
    })
  });

  // validation
  it("Validation confirm password", async () => {
    const { utils } = setUp();
    expect(utils.getByText("Reset password")).toBeTruthy();
    fireEvent.change(utils.getByLabelText("input-new-password"), { target: { value: "test1234" } });
    fireEvent.change(utils.getByLabelText("input-new-password2"), { target: { value: "test5678" } });
    await waitFor(() => {
      expect(utils.getByText('The two passwords that you entered do not match!')).toBeTruthy();
    })
  });
})