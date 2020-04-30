import { mocked } from 'ts-jest/utils'
import { AxiosResponse, AxiosError } from 'axios';
import { cleanup, fireEvent, waitFor, act } from '@testing-library/react'
import { list } from '../../../../service/admin/media';
import { listData, listAxiosResponse, errorListAxiosResponse } from '../../../../__mocks__/mediaData';
import { adminSetUp } from '../../../../__mocks__/adminSetUp';
import '../../../../__mocks__/windowMatchMedia';
// import "@testing-library/jest-dom/extend-expect";
// import '../../../../__mocks__/fileMock';

afterEach(() => cleanup());
jest.mock('../../../../service/admin/media');

describe("Admin media index", () => {
  beforeEach(() => {
    mocked(list).mockClear()
  })

  // read index
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
})

describe("Admin media index", () => {
  it("request error", async () => {
    mocked(list).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.reject(errorListAxiosResponse)
    );
    const { utils, history } = await adminSetUp();
    fireEvent.click(utils.getByTestId('side-nav-media'));
    await waitFor(() => {
      expect(utils.getAllByText("CREATE")).toBeTruthy();
      expect(utils.getByText("Request error")).toBeTruthy()
    })
  })
});