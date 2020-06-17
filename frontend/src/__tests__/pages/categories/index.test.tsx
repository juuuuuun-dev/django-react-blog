import { AxiosResponse } from 'axios';
import { mocked } from 'ts-jest/utils';

import { fireEvent, waitFor } from '@testing-library/react';

import { setUp } from '../../../__mocks__/mainSetUp';
import { error500AxiosResponse } from '../../../__mocks__/serviceResponse/common';
import {
    list0ResultAxiosResponse, listAxiosResponse
} from '../../../__mocks__/serviceResponse/posts';
import { useHistoryPushError } from '../../../helper/useHistoryPushError';
import { list } from '../../../service/main/posts';

jest.mock('../../../service/main/posts');
jest.mock('../../../helper/useHistoryPushError');

describe("Categories index", () => {
  const initialPath = "/";
  beforeEach(() => {
    mocked(list).mockClear();
    mocked(useHistoryPushError).mockClear();
  })

  const mockPush = jest.fn()
  mocked(useHistoryPushError).mockImplementation(
    () => [mockPush]
  );

  // success
  it("Request successful", async () => {
    mocked(list).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(listAxiosResponse)
    );
    const { utils } = await setUp(initialPath);
    await waitFor(() => {
      expect(utils.getByText(listAxiosResponse.data.results[0].title)).toBeTruthy()
    })
  })

})
