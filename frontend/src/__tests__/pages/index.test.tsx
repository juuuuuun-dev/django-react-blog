import { AxiosResponse } from 'axios';
import { mocked } from 'ts-jest/utils';

import { act, cleanup, fireEvent, waitFor } from '@testing-library/react';

import { setUp } from '../../__mocks__/mainSetUp';
import { listAxiosResponse } from '../../__mocks__/serviceResponse/posts';
import { list } from '../../service/main/posts';

afterEach(() => cleanup());
jest.mock('../../service/main/posts');
describe("Main index", () => {
  const initialPath = "/";
  beforeEach(() => {
    mocked(list).mockClear();
  })

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

  // filter search
  it("filter search", async () => {
    mocked(list).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(listAxiosResponse)
    );
    const { utils } = await setUp(initialPath);
    await waitFor(() => {
      expect(utils.getAllByText("CREATE")).toBeTruthy();
      expect(utils.getByText(listAxiosResponse.data.results.results[0].title)).toBeTruthy()
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
      expect(utils.getByText(listAxiosResponse.data.results.results[0].name)).toBeTruthy()
    })
  })


  // query search
  it("Query search", async () => {
    mocked(list).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(listAxiosResponse)
    );
    const { utils, history } = await setUp(initialPath);

    expect(await utils.findAllByText("CREATE")).toBeTruthy();
    expect(await utils.findByText(listAxiosResponse.data.results.results[0].name)).toBeTruthy()

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
  // it("Request error", async () => {
  //   mocked(list).mockImplementation(
  //     (): Promise<AxiosResponse<any>> => Promise.reject()
  //   );
  //   const { utils } = await setUp(initialPath);
  //   await waitFor(() => {
  //     expect(utils.getByText(defaultErrorText)).toBeTruthy();
  //   })
  // })
})
