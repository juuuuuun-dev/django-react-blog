import { mocked } from 'ts-jest/utils'
import { AxiosResponse } from 'axios';
import { cleanup, fireEvent, waitFor, act } from '@testing-library/react'
import { list, retrieve, create, update, destroy } from '../../../../service/admin/media';
import { listData, resultData, updateResultData } from '../../../../__mocks__/mediaData';
import { adminSetUp } from '../../../../__mocks__/adminSetUp';
import testJpg from '../../../../__mocks__/test.jpg';
import '../../../../__mocks__/windowMatchMedia';
// import "@testing-library/jest-dom/extend-expect";
// import '../../../../__mocks__/fileMock';

afterEach(() => cleanup());
jest.mock('../../../../service/admin/media');

describe("Admin-media", () => {

  beforeEach(() => {
    mocked(list).mockClear()
  })

  const listAxiosResponse: AxiosResponse = {
    data: listData,
    status: 200,
    statusText: 'OK',
    config: {},
    headers: {},
  };
  mocked(list).mockImplementation(
    (): Promise<AxiosResponse<any>> => Promise.resolve(listAxiosResponse)
  );

  // read index
  it("renders media index", async () => {
    const { utils, history } = await adminSetUp();
    fireEvent.click(utils.getByTestId('side-nav-media'));
    await waitFor(() => {
      expect(utils.getAllByText("CREATE")).toBeTruthy();
      expect(utils.getByText(listData.results[0].name)).toBeTruthy()
    })
  })
})