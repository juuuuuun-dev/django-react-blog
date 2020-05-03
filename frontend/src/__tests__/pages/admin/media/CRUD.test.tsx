import { mocked } from 'ts-jest/utils'
import { AxiosResponse } from 'axios';
import { cleanup, fireEvent, waitFor, act } from '@testing-library/react'
import { list, retrieve, create, update, destroy } from '../../../../service/admin/media';
import { listData, resultData, updateResultData } from '../../../../__mocks__/serviceResponse/media';
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
    mocked(retrieve).mockClear();
    mocked(update).mockClear();
    mocked(create).mockClear();
    mocked(destroy).mockClear();
  })

  const listAxiosResponse: AxiosResponse = {
    data: listData,
    status: 200,
    statusText: 'OK',
    config: {},
    headers: {},
  };
  const detailAxiosResponse: AxiosResponse = {
    data: resultData,
    status: 200,
    statusText: 'OK',
    config: {},
    headers: {},
  }
  const updateAxiosResponse: AxiosResponse = {
    data: updateResultData,
    status: 200,
    statusText: 'OK',
    config: {},
    headers: {},
  }
  mocked(list).mockImplementation(
    (): Promise<AxiosResponse<any>> => Promise.resolve(listAxiosResponse)
  );
  mocked(retrieve).mockImplementation(
    (): Promise<AxiosResponse<any>> => Promise.resolve(detailAxiosResponse)
  );
  mocked(create).mockImplementation(
    (): Promise<AxiosResponse<any>> => Promise.resolve(detailAxiosResponse)
  );
  mocked(update).mockImplementation(
    (): Promise<AxiosResponse<any>> => Promise.resolve(updateAxiosResponse)
  );

  // read update
  it("renders media read update", async () => {
    const { utils, history } = await adminSetUp();
    fireEvent.click(utils.getByTestId('side-nav-media'));
    await waitFor(() => {
      expect(utils.getAllByText("CREATE")).toBeTruthy();
      expect(utils.getByText(listData.results[0].name)).toBeTruthy()
    })
    fireEvent.click(utils.getByText(listData.results[0].name));
    await waitFor(() => {
      expect(utils.getAllByText("Media edit")).toBeTruthy();
    });
    fireEvent.change(utils.getByLabelText("media-form-name"), { target: { value: 'updateAbe' } });
    act(() => {
      fireEvent.submit(utils.getByLabelText("media-form-submit"))
    })
    await waitFor(() => {
      expect(utils.getByText("Success")).toBeTruthy();
    });
  })

  // create
  it("renders media create", async () => {
    const { utils, history } = await adminSetUp();
    fireEvent.click(utils.getByTestId('side-nav-media'));
    await waitFor(() => {
      expect(utils.getByTestId("create-btn")).toBeTruthy();
      expect(utils.getByText(listData.results[0].name)).toBeTruthy()
    })
    fireEvent.click(utils.getByTestId("create-btn"));
    await waitFor(() => {
      expect(utils.getAllByText("Media create")).toBeTruthy();
    });
    act(() => {
      const img = new Image();
      img.src = testJpg;
      img.width = 50;
      img.height = 50;

      fireEvent.change(utils.getByLabelText("media-form-name"), { target: { value: 'createAbe' } });
      fireEvent.change(utils.getByLabelText("media-form-file"), { target: { files: [img] } });
    })
    fireEvent.submit(utils.getByLabelText("media-form-submit"))
    await waitFor(() => {
      expect(utils.getAllByText("Success")).toBeTruthy();
    });
  })

  // delete
  it("renders media delete", async () => {
    const { utils, history } = await adminSetUp();
    fireEvent.click(utils.getByTestId('side-nav-media'));
    await waitFor(() => {
      expect(utils.getByTestId("create-btn")).toBeTruthy();
      expect(utils.getByText(listData.results[0].name)).toBeTruthy()
    })
    fireEvent.click(utils.getByText(listData.results[0].name));
    await waitFor(() => {
      expect(utils.getAllByText("Media edit")).toBeTruthy();
    });
    fireEvent.click(utils.getByLabelText("delete-btn"));
    await waitFor(() => {
      expect(utils.getByLabelText("delete-submit")).toBeTruthy();
    });
    fireEvent.click(utils.getByLabelText("delete-submit"));
    await waitFor(() => {
      expect(utils.getAllByText("Success")).toBeTruthy();
    });

  });
})