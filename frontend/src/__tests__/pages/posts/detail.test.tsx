import { AxiosResponse } from 'axios';
import { mocked } from 'ts-jest/utils';

import { fireEvent, waitFor } from '@testing-library/react';

import { setUp } from '../../../__mocks__/mainSetUp';
import { error500AxiosResponse } from '../../../__mocks__/serviceResponse/common';
import { initAxiosResponse } from '../../../__mocks__/serviceResponse/init';
import {
    detailAxiosResponse, list0ResultAxiosResponse, listAxiosResponse
} from '../../../__mocks__/serviceResponse/posts';
import { useHistoryPushError } from '../../../helper/useHistoryPushError';
import { getInit } from '../../../service/main/init';
import { list, retrieve } from '../../../service/main/posts';

jest.mock('../../../service/main/init');
jest.mock('../../../service/main/posts');
jest.mock('../../../helper/useHistoryPushError');

describe("Post detail", () => {
  const initialPath = "/";
  const mockPush = jest.fn()
  mocked(useHistoryPushError).mockImplementation(
    () => [mockPush]
  );

  beforeEach(() => {
    mocked(list).mockClear();
    mocked(useHistoryPushError).mockClear();
    mocked(mockPush).mockClear();
  })


  // success
  it("Request successful", async () => {
    mocked(getInit).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(initAxiosResponse)
    );
    mocked(list).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(listAxiosResponse)
    );
    mocked(retrieve).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(detailAxiosResponse)
    );
    const { utils } = await setUp(initialPath);
    const tagetDataKey = 0;
    const link = `post-list-link-${listAxiosResponse.data.results[tagetDataKey].id}`;
    fireEvent.click(utils.getByTestId(link));


    await waitFor(() => {
      expect(utils.getByTestId('post-detail-title').innerHTML).toMatch(listAxiosResponse.data.results[tagetDataKey].title)
      // expect(utils.getByTestId('post-list-page-count-results').innerHTML).toMatch(`${listCategoryFilterAxiosResponse.data.results.length} results`)
    })
  })

})
