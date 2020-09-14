import { AxiosResponse } from 'axios';
import { mocked } from 'ts-jest/utils';

import { fireEvent, waitFor } from '@testing-library/react';

import { setUp } from '../../../__mocks__/mainSetUp';
import { detailAxiosResponse } from '../../../__mocks__/serviceResponse/aboutMe';
import { error500AxiosResponse } from '../../../__mocks__/serviceResponse/common';
import { initAxiosResponse } from '../../../__mocks__/serviceResponse/init';
import { useHistoryPushError } from '../../../helper/useHistoryPushError';
import { retrieve } from '../../../service/main/aboutMe';
import { getInit } from '../../../service/main/init';

jest.mock('../../../service/main/init');
jest.mock('../../../service/main/aboutMe');
jest.mock('../../../helper/useHistoryPushError');

describe("About me index", () => {
  const initialPath = "/";
  beforeEach(() => {
    mocked(retrieve).mockClear();
    mocked(useHistoryPushError).mockClear();
  })

  const mockPush = jest.fn()
  mocked(useHistoryPushError).mockImplementation(
    () => [mockPush]
  );

  // success
  it("Request successful", async () => {
    mocked(getInit).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(initAxiosResponse)
    );
    mocked(retrieve).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(detailAxiosResponse)
    );
    const { utils } = await setUp(initialPath);
    const link = `right-contents-about-me-name`;
    fireEvent.click(utils.getByTestId(link));
    await waitFor(() => {
      expect(utils.getByTestId('page-title').innerHTML).toMatch(`${detailAxiosResponse.data.page_title}`)
      // expect(utils.getByTestId('markdown-content').innerHTML).toMatch(`${detailAxiosResponse.data.content}`)
    })
  })
  // Error 500
  it("Request 500 error", async () => {
    mocked(getInit).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(initAxiosResponse)
    );
    mocked(retrieve).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.reject({ response: error500AxiosResponse })
    );
    const { utils } = await setUp(initialPath);
    const link = `right-contents-about-me-name`;
    fireEvent.click(utils.getByTestId(link));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledTimes(1);
    });
  })

})
