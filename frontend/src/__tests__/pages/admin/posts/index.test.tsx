import { AxiosResponse } from 'axios';
import { mocked } from 'ts-jest/utils';

import { act, cleanup, fireEvent, waitFor } from '@testing-library/react';

import { setUp } from '../../../../__mocks__/adminSetUp';
import { listAxiosResponse, listData } from '../../../../__mocks__/serviceResponse/posts';
import { defaultErrorText } from '../../../../components/common/toast';
import { sortBoolean, sortDate, sortTextLength } from '../../../../helper/sort';
import { list } from '../../../../service/admin/posts';

afterEach(() => cleanup());
jest.mock('../../../../service/admin/posts');
jest.mock('../../../../helper/sort')
describe("Admin posts index", () => {
  const initialPath = "/admin/posts";
  beforeEach(() => {
    mocked(list).mockClear();
  })

  // success
  it("Request successful", async () => {
    mocked(list).mockImplementation(
      (): Promise<AxiosResponse<any>> => {
        console.log("mock")
        return Promise.resolve(listAxiosResponse)
      }
    );
    const { utils } = await setUp(initialPath);
    await waitFor(() => {
      expect(utils.getAllByText("CREATE")).toBeTruthy();
      expect(utils.getByText(listData.results[0].title)).toBeTruthy();
    })
  })

  // filter search
  it("Filter search", async () => {
    mocked(list).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(listAxiosResponse)
    );
    const { utils } = await setUp(initialPath);
    await waitFor(() => {
      expect(utils.getAllByText("CREATE")).toBeTruthy();
      expect(utils.getByText(listData.results[0].title)).toBeTruthy()
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
      expect(utils.getByText(listData.results[0].title)).toBeTruthy()
    })
  })

  // filter category
  it("Filter category", async () => {
    mocked(list).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(listAxiosResponse)
    );
    const { utils } = await setUp(initialPath);
    await waitFor(() => {
      expect(utils.getAllByText("CREATE")).toBeTruthy();
      expect(utils.getByText(listData.results[0].title)).toBeTruthy()
    })
    fireEvent.click(utils.getByLabelText('open-filter-select-category'));
    await waitFor(() => {
      expect(utils.getByLabelText("filter-select-category")).toBeTruthy();
    })
    // category
    fireEvent.mouseDown(utils.getByLabelText("filter-select-category").firstElementChild);
    fireEvent.click(utils.getByLabelText(`filter-option-${listData.categories[0].id}`));

    await waitFor(() => {
      expect(utils.getAllByText(listData.categories[0].name)).toBeTruthy();
    })
  })

  // sort
  it("Sort", async () => {
    mocked(list).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(listAxiosResponse)
    );
    const { utils } = await setUp(initialPath);
    await waitFor(() => {
      expect(utils.getAllByText("CREATE")).toBeTruthy();
      expect(utils.getByText(listData.results[0].title)).toBeTruthy()
    })
    // date
    fireEvent.click(utils.getByText('created'));
    fireEvent.click(utils.getByText('created'));
    fireEvent.click(utils.getByText('updated'));
    fireEvent.click(utils.getByText('updated'));
    expect(sortDate).toHaveBeenCalledTimes(4);
    // boolean
    fireEvent.click(utils.getByText('show'));
    fireEvent.click(utils.getByText('show'));
    expect(sortBoolean).toHaveBeenCalledTimes(2);
  });

  // query search
  it("Query search", async () => {
    mocked(list).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(listAxiosResponse)
    );
    const { utils, history } = await setUp(initialPath);
    expect(await utils.findAllByText("CREATE")).toBeTruthy();
    expect(await utils.findByText(listData.results[0].title)).toBeTruthy()
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
      expect(utils.getAllByText(defaultErrorText)).toBeTruthy();
    })
  })
})
