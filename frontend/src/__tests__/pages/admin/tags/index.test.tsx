import { mocked } from 'ts-jest/utils'
import { AxiosResponse } from 'axios';
import { cleanup, fireEvent, waitFor, act } from '@testing-library/react'
import { list } from '../../../../service/admin/tags';
import { defaultErrorText } from '../../../../components/common/toast'
import { listData, listAxiosResponse } from '../../../../__mocks__/serviceResponse/tags';
import { sortDate } from '../../../../helper/sort';
import { setUp } from '../../../../__mocks__/adminSetUp';

afterEach(() => cleanup());
jest.mock('../../../../service/admin/tags');
jest.mock('../../../../helper/sort')
describe("Admin tags index", () => {
  const initialPath = "/admin/tags";
  beforeEach(() => {
    mocked(list).mockClear();
    // mocked(sortDate).mockClear();
  })

  // success
  it("successful request", async () => {
    mocked(list).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(listAxiosResponse)
    );
    const { utils } = await setUp(initialPath);
    await waitFor(() => {
      expect(utils.getAllByText("CREATE")).toBeTruthy();
      expect(utils.getByText(listData.results[0].name)).toBeTruthy()
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
      expect(utils.getByText(listData.results[0].name)).toBeTruthy()
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
      expect(utils.getByText(listData.results[0].name)).toBeTruthy()
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
      expect(utils.getByText(listData.results[0].name)).toBeTruthy()
    })
    fireEvent.click(utils.getByText('created'));
    fireEvent.click(utils.getByText('created'));
    fireEvent.click(utils.getByText('updated'));
    fireEvent.click(utils.getByText('updated'));
    expect(sortDate).toHaveBeenCalledTimes(4);
  });

  // query search
  it("query search", async () => {
    mocked(list).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(listAxiosResponse)
    );
    const { utils, history } = await setUp(initialPath);

    expect(await utils.findAllByText("CREATE")).toBeTruthy();
    expect(await utils.findByText(listData.results[0].name)).toBeTruthy()

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
  it("request error", async () => {
    mocked(list).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.reject()
    );
    const { utils } = await setUp(initialPath);
    await waitFor(() => {
      expect(utils.getByText(defaultErrorText)).toBeTruthy();
    })
  })
})
