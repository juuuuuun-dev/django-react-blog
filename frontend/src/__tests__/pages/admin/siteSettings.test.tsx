import { AxiosResponse } from 'axios';
import { mocked } from 'ts-jest/utils';

import { act, cleanup, fireEvent, waitFor } from '@testing-library/react';

import { setUp } from '../../../__mocks__/adminSetUp';
import {
    deleteAxiosResponse, error404AxiosResponse, error500AxiosResponse
} from '../../../__mocks__/serviceResponse/common';
import {
    detailAxiosResponse, error400AxiosResponse, updateAxiosResponse
} from '../../../__mocks__/serviceResponse/siteSettings';
import {
    defaultDeleteText, defaultErrorText, defaultSuccessText
} from '../../../components/common/toast';
import { getBase64 } from '../../../helper/file';
import { retrieve, update } from '../../../service/admin/siteSettings';

afterEach(() => cleanup());
jest.mock('../../../service/admin/siteSettings');
jest.mock('../../../helper/file');

describe("Admin siteSettngs edit", () => {
  const initialPath = "/admin/site-settings";
  const base64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAoACgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJVAAAAAAAAAAAAAAAAAA//Z";
  const file = new File([base64], "tets.jpg", {
    type: "image/jpeg",
  });
  const scrollTo = global.scrollTo = jest.fn()
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

  it("Update successful", async () => {
    const { utils } = await setUp(initialPath);
    await waitFor(() => {
      expect(utils.getByTestId("container-title")).toBeTruthy();
      expect(utils.getByTestId("container-title").innerHTML).toMatch(/Site settings/)
    })
    fireEvent.change(utils.getByLabelText("input-name"), { target: { value: 'updateAbe' } });
    fireEvent.change(utils.getByLabelText("textarea-description"), { target: { value: 'update description' } });
    fireEvent.change(utils.getByLabelText("input-logo"), { target: { files: [file] } });
    fireEvent.submit(utils.getByLabelText("form-submit"))
    await waitFor(() => {
      expect(utils.getAllByText(defaultSuccessText)).toBeTruthy();
      expect(scrollTo).toHaveBeenCalled();
    });
  });

  it("Retrieve error", async () => {
    mocked(retrieve).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.reject({ response: error404AxiosResponse })
    );
    const { utils } = await setUp(initialPath);
    await waitFor(() => {
      expect(utils.getByTestId("container-title")).toBeTruthy();
      expect(utils.getByTestId("container-title").innerHTML).toMatch(/Site settings/)
      expect(utils.getAllByText(defaultErrorText)).toBeTruthy();
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
      expect(utils.getByTestId("container-title").innerHTML).toMatch(/Site settings/)
    })
    fireEvent.change(utils.getByLabelText("input-name"), { target: { value: 'updateAbe' } });
    fireEvent.change(utils.getByLabelText("textarea-description"), { target: { value: 'update description' } });
    fireEvent.change(utils.getByLabelText("input-logo"), { target: { files: [file] } });
    fireEvent.submit(utils.getByLabelText("form-submit"))
    await waitFor(() => {
      expect(utils.getAllByText(defaultErrorText)).toBeTruthy();
    });
  })

});