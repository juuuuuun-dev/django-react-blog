import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { refreshAuthToken, login, useLogout, passwordReset, passwordResetConfirm } from '../../../service/admin/auth'
import { renderHook } from '@testing-library/react-hooks'
import axios from '../../../service/client';

const mockHistoryPush = jest.fn();
jest.mock('../../../service/client');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe("service auth", () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  const expectedResult = 'result';

  it("reshreshAuthTAoken", async () => {
    mockedAxios.post.mockReturnValueOnce(Promise.resolve(expectedResult));
    const result = await refreshAuthToken("refresh");
    expect(result).toBe(expectedResult);
  })

  it("login", async () => {
    mockedAxios.post.mockReturnValueOnce(Promise.resolve(expectedResult));
    const result = await login({ email: 'test', password: 'test' });
    expect(result).toBe(expectedResult);
  });

  it("logout", async () => {
    const { result } = renderHook(() => useLogout());
    const [logout] = result.current;
    logout();
    expect(mockHistoryPush).toHaveBeenCalledTimes(1)
  });

  it("passwordResetn", async () => {
    mockedAxios.post.mockReturnValueOnce(Promise.resolve(expectedResult));
    const result = await passwordReset("test@test.com");
    expect(result).toBe(expectedResult);
  })

  it("passwordResetConfirm", async () => {
    mockedAxios.post.mockReturnValueOnce(Promise.resolve(expectedResult));
    const result = await passwordResetConfirm({ uid: '1', token: 'token', values: { new_password: 'test', new_password2: 'test' } });
    expect(result).toBe(expectedResult);
  })


});