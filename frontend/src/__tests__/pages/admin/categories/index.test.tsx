import { AxiosResponse } from 'axios';
import { mocked } from 'ts-jest/utils';

import { act, cleanup, fireEvent, waitFor } from '@testing-library/react';

import { setUp } from '../../../../__mocks__/adminSetUp';
import { listAxiosResponse, listData } from '../../../../__mocks__/serviceResponse/categories';
import { defaultErrorText } from '../../../../components/common/toast';
import { sortDate } from '../../../../helper/sort';
import { list } from '../../../../service/admin/categories';

afterEach(() => cleanup());
jest.mock('../../../../service/admin/categories');
jest.mock('../../../../helper/sort')
describe("Admin categories index", () => {
  const initialPath = "/admin/categories";
  beforeEach(() => {
    mocked(list).mockClear();
    // mocked(sortDate).mockClear();
  })

  // success
  it("Request successful", async () => {
    mocked(list).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(listAxiosResponse)
    );
    const { utils } = await setUp(initialPath);
    await waitFor(() => {
      expect(utils.getAllByText("CREATE")).toBeTruthy();
      expect(utils.getAllByText(listData.results[0].name)).toBeTruthy()
      expect(utils.getAllByText(listData.results[0].slug)).toBeTruthy()
    })
  })

  // filter search
  it("filter search", async () => {
    mocked(list).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(listAxiosResponse)
    );
    const { utils } = await setUp(initialPath);
    await waitFor(() => {
      expect(utils.getAllByText("CREATE")).toBeTruthy();
      expect(utils.getAllByText(listData.results[0].name)).toBeTruthy()
    })
    fireEvent.click(utils.getByLabelText('open-filter-serach'));
    await waitFor(() => {
      expect(utils.getByLabelText("input-filter-search")).toBeTruthy();
      fireEvent.change(utils.getByLabelText("input-filter-search"), { target: { value: "STAY HOME" } })
    })
    fireEvent.click(utils.getByLabelText('submit-filter-search'));

    await waitFor(() => {
      expect(utils.getAllByText("No Data")).toBeTruthy();
    })
    fireEvent.click(utils.getByLabelText('open-filter-serach'));
    fireEvent.click(utils.getByLabelText('reset-filter-search'));
    await waitFor(() => {
      expect(utils.getAllByText(listData.results[0].name)).toBeTruthy()
      expect(utils.getAllByText(listData.results[0].slug)).toBeTruthy()
    })
  })

  // sort
  it("sort", async () => {
    mocked(list).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(listAxiosResponse)
    );
    const { utils } = await setUp(initialPath);
    await waitFor(() => {
      expect(utils.getAllByText("CREATE")).toBeTruthy();
      expect(utils.getAllByText(listData.results[0].name)).toBeTruthy()
    })
    fireEvent.click(utils.getByText('created_at'));
    fireEvent.click(utils.getByText('created_at'));
    fireEvent.click(utils.getByText('updated_at'));
    fireEvent.click(utils.getByText('updated_at'));
    expect(sortDate).toHaveBeenCalledTimes(4);
  });

  // query search
  it("Query search", async () => {
    mocked(list).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(listAxiosResponse)
    );
    const { utils, history } = await setUp(initialPath);

    expect(await utils.findAllByText("CREATE")).toBeTruthy();
    expect(await utils.findAllByText(listData.results[0].name)).toBeTruthy()

    const searchText = 'STAY-HOME';
    expect(utils.queryByTestId('result-query-search-text')).toBeNull();

    fireEvent.change(utils.getByLabelText("input-query-search"), { target: { value: searchText } })
    act(() => {
      fireEvent.click(utils.getByLabelText("submit-query-search"));
    })

    await waitFor(() => {
      expect(utils.queryByTestId("result-query-search-text")).toBeTruthy();
      const matchText = new RegExp(searchText);
      expect(utils.getAllByText(matchText)).toBeTruthy();
      expect(history.location.search).toMatch(matchText)
    })
  });

  // request error
  it("Request error", async () => {
    mocked(list).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.reject()
    );
    const { utils } = await setUp(initialPath);
    await waitFor(() => {
      expect(utils.getByText(defaultErrorText)).toBeTruthy();
    })
  })
})
