import { AxiosResponse } from 'axios';
import { mocked } from 'ts-jest/utils';

import { fireEvent, waitFor } from '@testing-library/react';

import { setUp } from '../../../__mocks__/mainSetUp';
import { error500AxiosResponse } from '../../../__mocks__/serviceResponse/common';
import { initAxiosResponse } from '../../../__mocks__/serviceResponse/init';
import {
    list0ResultAxiosResponse, listCategoryFilterAxiosResponse
} from '../../../__mocks__/serviceResponse/posts';
import { useHistoryPushError } from '../../../helper/useHistoryPushError';
import { getInit } from '../../../service/main/init';
import { categoryPagelist } from '../../../service/main/posts';

jest.mock('../../../service/main/init');
jest.mock('../../../service/main/posts');
jest.mock('../../../helper/useHistoryPushError');

describe("Categories index", () => {
  const initialPath = "/";
  beforeEach(() => {
    mocked(categoryPagelist).mockClear();
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
    mocked(categoryPagelist).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(listCategoryFilterAxiosResponse)
    );
    const { utils } = await setUp(initialPath);
    const link = `right-contents-category-link-${initAxiosResponse.data.categories[0].slug}`;
    fireEvent.click(utils.getByTestId(link));
    console.log(listCategoryFilterAxiosResponse.data.category_name)
    await waitFor(() => {
      expect(utils.getByTestId('list-title').innerHTML).toMatch(`${listCategoryFilterAxiosResponse.data.category_name}`)
      expect(utils.getByTestId('post-list-page-count-results').innerHTML).toMatch(`${listCategoryFilterAxiosResponse.data.results.length} results`)
    })
  })

  it("Request 500 error", async () => {
    mocked(getInit).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(initAxiosResponse)
    );
    mocked(categoryPagelist).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.reject({ response: error500AxiosResponse })
    );
    const { utils } = await setUp(initialPath);
    const link = `right-contents-category-link-${initAxiosResponse.data.categories[0].slug}`;

    fireEvent.click(utils.getByTestId(link));
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledTimes(1);
    });
  })
  // Change a page
  it("Change a page", async () => {
    mocked(getInit).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(initAxiosResponse)
    );
    mocked(categoryPagelist).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(listCategoryFilterAxiosResponse)
    );
    const { utils } = await setUp(initialPath);
    const link = `right-contents-category-link-${initAxiosResponse.data.categories[0].slug}`;
    fireEvent.click(utils.getByTestId(link));
    await waitFor(() => {
      expect(utils.getByTitle("2")).toBeTruthy();
      fireEvent.click(utils.getByTitle("2"));
    });
    await waitFor(() => {
      expect(utils.getByTestId('post-list-page-count-results').innerHTML).toMatch("Page: 2")
    });
  });
})
