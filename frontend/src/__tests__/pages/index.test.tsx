import { AxiosResponse } from 'axios';
import { mocked } from 'ts-jest/utils';

import { useWindowSize } from '@react-hook/window-size';
import { act, fireEvent, waitFor } from '@testing-library/react';

import { setUp } from '../../__mocks__/mainSetUp';
import { error500AxiosResponse } from '../../__mocks__/serviceResponse/common';
import { initAxiosResponse } from '../../__mocks__/serviceResponse/init';
import { list0ResultAxiosResponse, listAxiosResponse } from '../../__mocks__/serviceResponse/posts';
import { useHistoryPushError } from '../../helper/useHistoryPushError';
import { getInit } from '../../service/main/init';
import { list } from '../../service/main/posts';

jest.mock('@react-hook/window-size');
jest.mock('../../service/main/init');
jest.mock('../../service/main/posts');
jest.mock('../../helper/useHistoryPushError');

describe("Main index", () => {
  const initialPath = "/";
  beforeEach(() => {
    // @todo useWindowSizeのmock
    mocked(useWindowSize).mockClear();
    mocked(list).mockClear();
    mocked(useHistoryPushError).mockClear();
  })

  const mockPush = jest.fn()
  mocked(useHistoryPushError).mockImplementation(
    () => [mockPush]
  );

  // Header pc size category nav
  it("Request header pc size category nav", async () => {
    mocked(getInit).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(initAxiosResponse)
    );
    mocked(useWindowSize).mockImplementation(
      () => [1200, 1000]
    );
    const { utils } = await setUp(initialPath);
    await waitFor(() => {
      expect(utils.getByTestId('app-title').innerHTML).toBe(process.env.REACT_APP_TITLE);
    })
    const categoryLinks: string[] = [];
    initAxiosResponse.data.categories.forEach((value) => {
      categoryLinks.push(`nav-category-${value.slug}`);
    })
    const categoryLink = `nav-category-${initAxiosResponse.data.categories[0].slug}`;
    fireEvent.mouseOver(utils.getByTitle('Category'));
    await waitFor(() => {
      categoryLinks.forEach((value) => {
        expect(utils.getByTestId(value)).toBeTruthy();
      })
    })
  })

  // Right contents success
  it("Request right contents successful", async () => {
    mocked(getInit).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(initAxiosResponse)
    );
    const { utils } = await setUp(initialPath);
    await waitFor(() => {
      // right-contents
      expect(utils.getByTestId('right-contents-about-me').innerHTML).toMatch(new RegExp(initAxiosResponse.data.author.public_name));
      expect(utils.getByTestId('right-contents-about-me').innerHTML).toMatch(new RegExp(initAxiosResponse.data.author.message));
      expect(utils.getByTestId('recent-post-list').innerHTML).toMatch(new RegExp(initAxiosResponse.data.recent_posts[0].title));
      expect(utils.getByTestId('right-contents-category-link-list').innerHTML).toMatch(new RegExp(initAxiosResponse.data.categories[0].name));
      expect(utils.getByTestId('right-contents-tag-link-list').innerHTML).toMatch(new RegExp(initAxiosResponse.data.tags[0].name))
    })
  })

  // post success
  it("Request post successful", async () => {
    mocked(list).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(listAxiosResponse)
    );
    const { utils } = await setUp(initialPath);
    await waitFor(() => {
      expect(utils.getByTestId('post-list').innerHTML).toMatch(new RegExp(listAxiosResponse.data.results[0].title))
    })
  })



  // Filter search
  it("Filter search", async () => {
    mocked(list).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(listAxiosResponse)
    );
    const { utils } = await setUp(initialPath);

    fireEvent.change(utils.getByLabelText("input-query-search"), { target: { value: "test" } })
    fireEvent.click(utils.getByLabelText('submit-query-search'));
    await waitFor(() => {
      expect(utils.getByTestId('post-list').innerHTML).toMatch(listAxiosResponse.data.results[0].title);
      expect(utils.getByText(`(${listAxiosResponse.data.count} results)`)).toBeTruthy();
    })
  })

  // filter search 0 result
  it("filter search 0 result", async () => {
    mocked(list).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(list0ResultAxiosResponse)
    );
    const { utils } = await setUp(initialPath);
    fireEvent.change(utils.getByLabelText("input-query-search"), { target: { value: "STAY HOME" } })
    fireEvent.click(utils.getByLabelText('submit-query-search'));

    await waitFor(() => {
      expect(utils.getByText("Search: STAY HOME")).toBeTruthy();
      expect(utils.getByText("(0 results)")).toBeTruthy();
    })
  })

  it("change a page", async () => {
    mocked(list).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(listAxiosResponse)
    );
    const { utils } = await setUp("/?page=2");
    await waitFor(() => {
      expect(utils.getByText("Page: 2")).toBeTruthy()
    })
  })

  // request error
  it("Request error 500", async () => {
    mocked(list).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.reject({ response: error500AxiosResponse })
    );
    // const { result } = renderHook(() => useHistoryPushError())
    const { utils } = await setUp(initialPath);
    expect(mockPush).toHaveBeenCalledTimes(1);
  })
})
