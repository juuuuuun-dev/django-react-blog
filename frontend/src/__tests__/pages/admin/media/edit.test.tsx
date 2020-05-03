import { mocked } from 'ts-jest/utils'
import { AxiosResponse } from 'axios';
import { cleanup, fireEvent, waitFor, act } from '@testing-library/react'
import { list, retrieve, update } from '../../../../service/admin/media';
import { DefaultSuccessText, DefaultErrorText } from '../../../../components/common/toast'
import { listData, listAxiosResponse, detailAxiosResponse, updateAxiosResponse, error400AxiosResponse } from '../../../../__mocks__/serviceResponse/media';
import { error404AxiosResponse } from '../../../../__mocks__/serviceResponse/common';
import { adminSetUp } from '../../../../__mocks__/adminSetUp';
import { getBase64 } from '../../../../helper/file';
import '../../../../__mocks__/windowMatchMedia';
import '../../../../__mocks__/fileMock';
import "@testing-library/jest-dom/extend-expect";

afterEach(() => cleanup());
jest.mock('../../../../service/admin/media');
jest.mock('../../../../helper/file');

describe("Admin media edit", () => {
  const base64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAoACgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJVAAAAAAAAAAAAAAAAAA//Z";
  const file = new File([base64], "test.jpg", {
    type: "image/jpeg",
  });
  beforeEach(() => {
    mocked(list).mockClear()
    mocked(retrieve).mockClear();
    mocked(update).mockClear();
    mocked(getBase64).mockClear();
  })

  mocked(list).mockImplementation(
    (): Promise<AxiosResponse<any>> => Promise.resolve(listAxiosResponse)
  );
  mocked(update).mockImplementation(
    (): Promise<AxiosResponse<any>> => Promise.resolve(updateAxiosResponse)
  );
  mocked(retrieve).mockImplementation(
    (): Promise<AxiosResponse<any>> => Promise.resolve(detailAxiosResponse)
  );
  mocked(getBase64).mockImplementation(
    (_img, callback): void => {
      callback(base64)
    }
  )

  it("success", async () => {
    const { utils } = await adminSetUp();
    fireEvent.click(utils.getByTestId('side-nav-media'));
    await waitFor(() => {
      expect(utils.getByTestId("create-btn")).toBeTruthy();
      expect(utils.getByText(listData.results[0].name)).toBeTruthy()
    })
    fireEvent.click(utils.getByText(listData.results[0].name));
    await waitFor(() => {
      expect(utils.getAllByText("Media edit")).toBeTruthy();
    });
    act(() => {
      fireEvent.change(utils.getByLabelText("media-form-name"), { target: { value: 'updateAbe' } });
    })
    fireEvent.click(utils.getByLabelText("media-form-preview"));
    expect(await utils.findByTestId("media-preview-modal")).toBeTruthy();
    fireEvent.click(utils.getByLabelText("media-form-delete-image"));
    expect(await utils.findByText("Please selected file")).toBeTruthy();

    fireEvent.change(utils.getByLabelText("media-form-file"), { target: { files: [file] } });
    fireEvent.submit(utils.getByLabelText("media-form-submit"))
    await waitFor(() => {
      expect(utils.getAllByText(DefaultSuccessText)).toBeTruthy();
    });
  });

  // update error
  it("update error", async () => {
    mocked(update).mockImplementation(
      (): Promise<AxiosResponse<any>> => {
        console.log("updatedayo")
        return Promise.reject({ response: error400AxiosResponse })
      }
    );

    const { utils } = await adminSetUp();
    fireEvent.click(utils.getByTestId('side-nav-media'));
    await waitFor(() => {
      expect(utils.getByTestId("create-btn")).toBeTruthy();
      expect(utils.getByText(listData.results[0].name)).toBeTruthy()
    })
    fireEvent.click(utils.getByText(listData.results[0].name));
    await waitFor(() => {
      expect(utils.getAllByText("Media edit")).toBeTruthy();
    });
    fireEvent.submit(utils.getByLabelText("media-form-submit"))
    await waitFor(() => {
      expect(utils.getByText(DefaultErrorText)).toBeTruthy();
    });
  })

  // retrieve error
  it("retrieve error", async () => {
    mocked(retrieve).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.reject({ response: error404AxiosResponse })
    );

    const { utils } = await adminSetUp();
    fireEvent.click(utils.getByTestId('side-nav-media'));
    await waitFor(() => {
      expect(utils.getByTestId("create-btn")).toBeTruthy();
      expect(utils.getByText(listData.results[0].name)).toBeTruthy()
    })
    fireEvent.click(utils.getByText(listData.results[0].name));
    await waitFor(() => {
      expect(utils.getAllByText("Media edit")).toBeTruthy();
      expect(utils.getByText(DefaultErrorText)).toBeTruthy();
    });
  })

  /**
   * @todo delete test
   */

  // it("uploading not image", async () => {
  //   const { utils } = await adminSetUp();
  //   fireEvent.click(utils.getByTestId('side-nav-media'));
  //   await waitFor(() => {
  //     expect(utils.getByTestId("create-btn")).toBeTruthy();
  //     expect(utils.getByText(listData.results[0].name)).toBeTruthy()
  //   })
  //   fireEvent.click(utils.getByTestId("create-btn"));
  //   await waitFor(() => {
  //     expect(utils.getAllByText("Media create")).toBeTruthy();
  //   });
  //   act(() => {
  //     fireEvent.change(utils.getByLabelText("media-form-name"), { target: { value: 'createAbe' } });
  //   })

  //   const text = new File(['ate'], "tets.txt", {
  //     type: "text/plain",
  //   });
  //   fireEvent.change(utils.getByLabelText("media-form-file"), { target: { files: [text] } });
  //   fireEvent.submit(utils.getByLabelText("media-form-submit"))
  //   await waitFor(() => {
  //     expect(utils.getByText("You can only upload JPG/PNG file!")).toBeTruthy();
  //   });
  // })

  // // post error
  // it("Post error", async () => {
  //   mocked(create).mockImplementation(
  //     (): Promise<AxiosResponse<any>> => Promise.reject({ response: error400AxiosResponse })
  //   );
  //   const { utils } = await adminSetUp();
  //   fireEvent.click(utils.getByTestId('side-nav-media'));
  //   await waitFor(() => {
  //     expect(utils.getByTestId("create-btn")).toBeTruthy();
  //     expect(utils.getByText(listData.results[0].name)).toBeTruthy()
  //   })
  //   fireEvent.click(utils.getByTestId("create-btn"));
  //   await waitFor(() => {
  //     expect(utils.getAllByText("Media create")).toBeTruthy();
  //   });

  //   fireEvent.change(utils.getByLabelText("media-form-name"), { target: { value: 'createAbe' } });
  //   fireEvent.change(utils.getByLabelText("media-form-file"), { target: { files: [file] } });
  //   fireEvent.submit(utils.getByLabelText("media-form-submit"))
  //   await waitFor(() => {
  //     expect(utils.getByText(DefaultErrorText)).toBeTruthy();
  //   });
  // })
})