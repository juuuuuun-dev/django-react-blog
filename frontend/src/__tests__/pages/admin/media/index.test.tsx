import { mocked } from 'ts-jest/utils'
import { AxiosResponse, AxiosError } from 'axios';
import { cleanup, fireEvent, waitFor, act } from '@testing-library/react'
import { list } from '../../../../service/admin/media';
import { renderHook } from '@testing-library/react-hooks'
import { DefaultSuccessText, DefaultErrorText } from '../../../../components/common/toast'
import { listData, listAxiosResponse, errorListAxiosResponse } from '../../../../__mocks__/mediaData';
import { sortDate } from '../../../../helper/sort';
import { adminSetUp } from '../../../../__mocks__/adminSetUp';
import '../../../../__mocks__/windowMatchMedia';
import { useQueryParams, StringParam, NumberParam } from 'use-query-params';
import { useHistory } from 'react-router-dom'

// import "@testing-library/jest-dom/extend-expect";
// import '../../../../__mocks__/fileMock';

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
    const { utils, history } = await adminSetUp();
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
      // expect(utils.getByLabelText("input-filter-search")).toBeTruthy();
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
    const { utils, history } = await adminSetUp();
    fireEvent.click(utils.getByTestId('side-nav-media'));
    await waitFor(() => {
      expect(utils.getAllByText("CREATE")).toBeTruthy();
      expect(utils.getByText(listData.results[0].name)).toBeTruthy()
    })

    fireEvent.change(utils.getByLabelText("input-query-search"), { target: { value: "STAY-HOME" } })
    fireEvent.click(utils.getByLabelText("submit-query-search"));
    // expect(history.push).toHaveBeenCalled();
    await waitFor(() => {
      expect(location.pathname).toBe('/admin/media/?search=STAY-HOME')
    })
    console.log(location.pathname)

  })



  // request error
  it("request error", async () => {
    mocked(list).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.reject(errorListAxiosResponse)
    );
    const { utils, history } = await adminSetUp();
    fireEvent.click(utils.getByTestId('side-nav-media'));
    await waitFor(() => {
      expect(utils.getByText(DefaultErrorText)).toBeTruthy();
    })
  })
})
