import { AxiosResponse } from 'axios';
import { mocked } from 'ts-jest/utils';

import { fireEvent, waitFor } from '@testing-library/react';

import { setUp } from '../../__mocks__/mainSetUp';
import { error500AxiosResponse } from '../../__mocks__/serviceResponse/common';
import { list0ResultAxiosResponse, listAxiosResponse } from '../../__mocks__/serviceResponse/posts';
import { useHistoryPushError } from '../../helper/useHistoryPushError';
import { list } from '../../service/main/posts';

jest.mock('../../service/main/posts');
jest.mock('../../helper/useHistoryPushError');

describe("Main index", () => {
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

  // Filter search
  it("Filter search", async () => {
    mocked(list).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(listAxiosResponse)
    );
    const { utils } = await setUp(initialPath);

    fireEvent.change(utils.getByLabelText("input-query-search"), { target: { value: "test" } })
    fireEvent.click(utils.getByLabelText('submit-query-search'));
    await waitFor(() => {
      expect(utils.getByText(listAxiosResponse.data.results[0].title)).toBeTruthy();
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
