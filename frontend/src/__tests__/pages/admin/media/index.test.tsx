import { mocked } from 'ts-jest/utils'
import { AxiosResponse } from 'axios';
import { cleanup, fireEvent, waitFor, act } from '@testing-library/react'
import { list } from '../../../../service/admin/media';
import { DefaultErrorText } from '../../../../components/common/toast'
import { listData, listAxiosResponse, errorListAxiosResponse } from '../../../../__mocks__/mediaData';
import { sortDate } from '../../../../helper/sort';
import { adminSetUp } from '../../../../__mocks__/adminSetUp';
import '../../../../__mocks__/windowMatchMedia';
import "@testing-library/jest-dom/extend-expect";
import '../../../../__mocks__/fileMock';

afterEach(() => cleanup());
jest.mock('../../../../service/admin/media');
jest.mock('../../../../helper/sort')
describe("Admin media index", () => {
  beforeEach(() => {
    mocked(list).mockClear();
    // mocked(sortDate).mockClear();
  })

  // success
  it("request success", async () => {
    mocked(list).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(listAxiosResponse)
    );
    const { utils } = await adminSetUp();
    fireEvent.click(utils.getByTestId('side-nav-media'));
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
    const { utils } = await adminSetUp();
    fireEvent.click(utils.getByTestId('side-nav-media'));
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
    const { utils } = await adminSetUp();
    fireEvent.click(utils.getByTestId('side-nav-media'));
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

  // imgwindow open
  it("imgwindow open", async () => {
    mocked(list).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(listAxiosResponse)
    );
    const { utils } = await adminSetUp();
    fireEvent.click(utils.getByTestId('side-nav-media'));
    await waitFor(() => {
      expect(utils.getAllByText("CREATE")).toBeTruthy();
      expect(utils.getByText(listData.results[0].name)).toBeTruthy()
    })
    window.open = jest.fn();
    fireEvent.click(utils.getByTestId('list-thumb-1'));
    expect(window.open).toHaveBeenCalledTimes(1);
  })

  // query search
  it("query search", async () => {
    mocked(list).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(listAxiosResponse)
    );
    const { utils } = await adminSetUp();
    fireEvent.click(utils.getByTestId('side-nav-media'));

    expect(await utils.findAllByText("CREATE")).toBeTruthy();
    expect(await utils.findByText(listData.results[0].name)).toBeTruthy()

    const searchText = 'STAY-HOME';
    expect(utils.queryByTestId('result-query-search-text')).toBeNull();

    fireEvent.change(utils.getByLabelText("input-query-search"), { target: { value: searchText } })
    fireEvent.click(utils.getByLabelText("submit-query-search"));

    await waitFor(() => {
      expect(utils.getByTestId("result-query-search-text")).toBeTruthy();
      const matchText = new RegExp(searchText);
      expect(utils.getByText(matchText)).toBeTruthy();
    })
  });


  // request error
  it("request error", async () => {
    mocked(list).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.reject(errorListAxiosResponse)
    );
    const { utils } = await adminSetUp();
    fireEvent.click(utils.getByTestId('side-nav-media'));
    await waitFor(() => {
      expect(utils.getByText(DefaultErrorText)).toBeTruthy();
    })
  })
})
