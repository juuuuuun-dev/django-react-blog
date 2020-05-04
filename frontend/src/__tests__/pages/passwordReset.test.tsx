import React from 'react';
import { mocked } from 'ts-jest/utils';
import { AxiosResponse } from 'axios';
import { createMemoryHistory } from 'history'
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react'
import { Router } from 'react-router-dom';
import { defaultErrorText } from '../../components/common/toast'
import { sendingText } from '../../pages/PasswordReset';
import { passwordReset } from '../../service/admin/auth';
import LoginLayout from '../../components/login/layout/LoginLayout';
import '../../__mocks__/windowMatchMedia';

afterEach(() => cleanup());
jest.mock('../../service/admin/auth');


export const successAxiosResponse: AxiosResponse = {
  data: { sending: true },
  status: 200,
  statusText: 'OK',
  config: {},
  headers: {},
};
export const sendingErrorAxiosResponse: AxiosResponse = {
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
  history.push('/password-reset');
  const utils = render(
    <Router history={history}>
      <LoginLayout />
    </Router>
  )
  return utils;
}

describe("Password reset", () => {
  beforeEach(() => {
    mocked(passwordReset).mockClear();
  })
  it("Successful submit email", async () => {
    mocked(passwordReset).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(successAxiosResponse)
    );
    const utils = setUp();
    expect(utils.getByText("Forgot password")).toBeTruthy();
    fireEvent.change(utils.getByLabelText("input-password-reset-email"), { target: { value: "test@test.com" } });
    fireEvent.click(utils.getByLabelText("submit-password-reset-email"));
    await waitFor(() => {
      expect(utils.getByText('Sending email')).toBeTruthy();
      expect(utils.getByText(sendingText)).toBeTruthy();
    })
  });

  it("submit error", async () => {
    mocked(passwordReset).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.reject({ response: errorAxiosResponse })
    );
    const utils = setUp();
    expect(utils.getByText("Forgot password")).toBeTruthy();
    fireEvent.change(utils.getByLabelText("input-password-reset-email"), { target: { value: "test@test.com" } });
    fireEvent.click(utils.getByLabelText("submit-password-reset-email"));
    await waitFor(() => {
      expect(utils.getByText(defaultErrorText)).toBeTruthy();
    })
  });

  // email sending error
  it("Email sending error", async () => {
    mocked(passwordReset).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(sendingErrorAxiosResponse)
    );
    const utils = setUp();
    expect(utils.getByText("Forgot password")).toBeTruthy();
    fireEvent.change(utils.getByLabelText("input-password-reset-email"), { target: { value: "test@test.com" } });
    fireEvent.click(utils.getByLabelText("submit-password-reset-email"));
    await waitFor(() => {
      expect(utils.getByText("Email sending error")).toBeTruthy();
    })
  });
});