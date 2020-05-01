import { mocked } from 'ts-jest/utils'
import { AxiosResponse } from 'axios';
import { cleanup, fireEvent, waitFor, act } from '@testing-library/react'
import { list, create } from '../../../../service/admin/media';
import { DefaultSuccessText, DefaultErrorText } from '../../../../components/common/toast'
import { listData, listAxiosResponse, createAxiosResponse } from '../../../../__mocks__/mediaData';
import { adminSetUp } from '../../../../__mocks__/adminSetUp';
import { getBase64 } from '../../../../helper/file';
import '../../../../__mocks__/windowMatchMedia';
import '../../../../__mocks__/fileMock';
import "@testing-library/jest-dom/extend-expect";

afterEach(() => cleanup());
jest.mock('../../../../service/admin/media');
jest.mock('../../../../helper/file');

describe("Admin media create", () => {
  const base64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAoACgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJVAAAAAAAAAAAAAAAAAA//Z";
  const file = new File([base64], "tets.jpg", {
    type: "image/jpeg",
  });
  beforeEach(() => {
    mocked(list).mockClear()
    mocked(create).mockClear();
    mocked(getBase64).mockClear();
  })

  mocked(list).mockImplementation(
    (): Promise<AxiosResponse<any>> => Promise.resolve(listAxiosResponse)
  );
  mocked(create).mockImplementation(
    (): Promise<AxiosResponse<any>> => Promise.resolve(createAxiosResponse)
  );

  mocked(getBase64).mockImplementation(
    (_img, callback): void => {
      callback(base64)
    }
  )

  it("success", async () => {
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
      fireEvent.change(utils.getByLabelText("media-form-name"), { target: { value: 'createAbe' } });
    })

    fireEvent.change(utils.getByLabelText("media-form-file"), { target: { files: [file] } });
    fireEvent.submit(utils.getByLabelText("media-form-submit"))
    await waitFor(() => {
      expect(utils.getAllByText(DefaultSuccessText)).toBeTruthy();
    });
  })

  it("uploading not image", async () => {
    const { utils, history } = await adminSetUp();
    fireEvent.click(utils.getByTestId('side-nav-media'));
    await waitFor(() => {
      expect(utils.getByTestId("create-btn")).toBeTruthy();
      expect(utils.getByText(listData.results[0].name)).toBeTruthy()
    })
    fireEvent.click(utils.getByTestId("create-btn"));
    console.log("click")
    await waitFor(() => {
      expect(utils.getAllByText("Media create")).toBeTruthy();
    });
    act(() => {
      fireEvent.change(utils.getByLabelText("media-form-name"), { target: { value: 'createAbe' } });
    })

    const text = new File(['ate'], "tets.txt", {
      type: "text/plain",
    });
    fireEvent.change(utils.getByLabelText("media-form-file"), { target: { files: [text] } });
    fireEvent.submit(utils.getByLabelText("media-form-submit"))
    await waitFor(() => {
      expect(utils.getByText("You can only upload JPG/PNG file!")).toBeTruthy();
    });
  })
})