import { AxiosResponse } from 'axios';
import { mocked } from 'ts-jest/utils';

import { cleanup, fireEvent, waitFor } from '@testing-library/react';

import { setUp } from '../../../__mocks__/adminSetUp';
import {
    deleteAxiosResponse, error404AxiosResponse, error500AxiosResponse
} from '../../../__mocks__/serviceResponse/common';
import {
    detailAxiosResponse, error400AxiosResponse, updateAxiosResponse
} from '../../../__mocks__/serviceResponse/profile';
import { defaultErrorText, defaultSuccessText } from '../../../components/common/toast';
import { getBase64 } from '../../../helper/file';
import { retrieve, update } from '../../../service/admin/profile';

afterEach(() => cleanup());
jest.mock('../../../service/admin/profile');
jest.mock('../../../helper/file');

describe("Admin profile edit", () => {
  const initialPath = "/admin/profile";
  const base64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAoACgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJVAAAAAAAAAAAAAAAAAA//Z";
  const file = new File([base64], "tets.jpg", {
    type: "image/jpeg",
  });
  beforeEach(() => {
    mocked(update).mockClear();
    mocked(retrieve).mockClear();
  })

  mocked(retrieve).mockImplementation(
    (): Promise<AxiosResponse<any>> => Promise.resolve(detailAxiosResponse)
  );
  mocked(update).mockImplementation(
    (): Promise<AxiosResponse<any>> => Promise.resolve(updateAxiosResponse)
  );
  mocked(getBase64).mockImplementation(
    (_img, callback): void => {
      callback(base64)
    }
  )

  it("Request successful", async () => {
    const { utils } = await setUp(initialPath);
    await waitFor(() => {
      expect(utils.getByTestId("container-title")).toBeTruthy();
      expect(utils.getByTestId("container-title").innerHTML).toMatch(/Public profile/)
    })
    fireEvent.change(utils.getByLabelText("input-public_name"), { target: { value: 'updateAbe' } });
    fireEvent.change(utils.getByLabelText("input-avator"), { target: { files: [file] } });
    fireEvent.submit(utils.getByLabelText("form-submit"))
    await waitFor(() => {
      expect(utils.getAllByText(defaultSuccessText)).toBeTruthy();
    });
  });

  it("Image preview delete", async () => {
    const { utils } = await setUp(initialPath);

    await waitFor(() => {
      expect(utils.getByTestId("container-title")).toBeTruthy();
      expect(utils.getByTestId("container-title").innerHTML).toMatch(/Public profile/);
      expect(utils.getByLabelText("image-preview")).toBeTruthy();
    })
    fireEvent.click(utils.getByLabelText("image-preview"));
    expect(utils.getByTestId("preview-modal")).toBeTruthy();
    fireEvent.click(utils.getByLabelText("close"));
    fireEvent.click(utils.getByLabelText("delete-image"));
    await waitFor(() => {
      expect(utils.queryByLabelText("image-preview")).toBeNull();
    })
    fireEvent.submit(utils.getByLabelText("form-submit"))
    await waitFor(() => {
      expect(utils.getByText("Please selected file")).toBeTruthy();
    })
  });
  it("Uploading not image", async () => {
    const { utils } = await setUp(initialPath);

    await waitFor(() => {
      expect(utils.getByTestId("container-title")).toBeTruthy();
      expect(utils.getByTestId("container-title").innerHTML).toMatch(/Public profile/)
    })

    const text = new File(['test'], "tets.txt", {
      type: "text/plain",
    });
    fireEvent.change(utils.getByLabelText("input-public_name"), { target: { value: 'updateAbe' } });
    fireEvent.change(utils.getByLabelText("input-avator"), { target: { files: [text] } });
    fireEvent.submit(utils.getByLabelText("form-submit"))
    await waitFor(() => {
      expect(utils.getByText("You can only upload JPG/PNG file!")).toBeTruthy();
    });
  })


  it("Update error", async () => {
    mocked(update).mockImplementation(
      (): Promise<AxiosResponse<any>> => {
        return Promise.reject({ response: error400AxiosResponse })
      }
    );

    const { utils } = await setUp(initialPath);
    await waitFor(() => {
      expect(utils.getByTestId("container-title")).toBeTruthy();
      expect(utils.getByTestId("container-title").innerHTML).toMatch(/Public profile/)
    })
    fireEvent.change(utils.getByLabelText("input-public_name"), { target: { value: 'updateAbe' } });
    fireEvent.change(utils.getByLabelText("input-avator"), { target: { files: [file] } });
    fireEvent.submit(utils.getByLabelText("form-submit"))
    await waitFor(() => {
      expect(utils.getByText(defaultErrorText)).toBeTruthy();
    });
  })

  it("Retrieve error", async () => {
    mocked(retrieve).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.reject({ response: error404AxiosResponse })
    );
    const { utils } = await setUp(initialPath);
    await waitFor(() => {
      expect(utils.getByTestId("container-title")).toBeTruthy();
      expect(utils.getByTestId("container-title").innerHTML).toMatch(/Public profile/)
      expect(utils.getAllByText(defaultErrorText)).toBeTruthy();
    });
  })
});