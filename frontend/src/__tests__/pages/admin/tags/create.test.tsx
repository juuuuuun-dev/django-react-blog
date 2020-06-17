import { AxiosResponse } from 'axios';
import { mocked } from 'ts-jest/utils';

import { act, fireEvent, waitFor } from '@testing-library/react';

import { setUp } from '../../../../__mocks__/adminSetUp';
import { error500AxiosResponse } from '../../../../__mocks__/serviceResponse/common';
import {
    createAxiosResponse, error400AxiosResponse, listAxiosResponse, listData
} from '../../../../__mocks__/serviceResponse/tags';
import { defaultErrorText, defaultSuccessText } from '../../../../components/common/toast';
import { create, list } from '../../../../service/admin/tags';

jest.mock('../../../../service/admin/tags');

describe("Admin tags create", () => {
  const initialPath = "/admin/tags";
  beforeEach(() => {
    mocked(list).mockClear()
    mocked(create).mockClear();
  })

  mocked(list).mockImplementation(
    (): Promise<AxiosResponse<any>> => Promise.resolve(listAxiosResponse)
  );
  mocked(create).mockImplementation(
    (): Promise<AxiosResponse<any>> => Promise.resolve(createAxiosResponse)
  );

  it("Create Successful", async () => {
    const { utils } = await setUp(initialPath);
    await waitFor(() => {
      expect(utils.getByTestId("create-btn")).toBeTruthy();
      expect(utils.getAllByText(listData.results[0].name)).toBeTruthy()
    })
    fireEvent.click(utils.getByTestId("create-btn"));
    await waitFor(() => {
      expect(utils.getAllByText("Tag create")).toBeTruthy();
    });
    act(() => {
      fireEvent.change(utils.getByLabelText("input-name"), { target: { value: 'createAbe' } });
      fireEvent.change(utils.getByLabelText("input-slug"), { target: { value: 'create-abe' } });
    })

    fireEvent.submit(utils.getByLabelText("form-submit"))
    await waitFor(() => {
      expect(utils.getAllByText(defaultSuccessText)).toBeTruthy();
    });
  })

  // 500 error
  it("500 error", async () => {
    mocked(create).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.reject({ response: error500AxiosResponse })
    );
    const { utils } = await setUp(initialPath);
    await waitFor(() => {
      expect(utils.getByTestId("create-btn")).toBeTruthy();
    })
    fireEvent.click(utils.getByTestId("create-btn"));
    await waitFor(() => {
      expect(utils.getAllByText("Tag create")).toBeTruthy();
    });

    fireEvent.change(utils.getByLabelText("input-name"), { target: { value: 'error-val' } });
    fireEvent.change(utils.getByLabelText("input-slug"), { target: { value: 'error-val' } });

    fireEvent.submit(utils.getByLabelText("form-submit"))
    await waitFor(() => {
      expect(utils.getByText(defaultErrorText)).toBeTruthy();
    });
  })

  // 400
  it("400 name already exists", async () => {
    mocked(create).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.reject({ response: error400AxiosResponse })
    );
    const { utils } = await setUp(initialPath);
    await waitFor(() => {
      expect(utils.getByTestId("create-btn")).toBeTruthy();
    })
    fireEvent.click(utils.getByTestId("create-btn"));
    await waitFor(() => {
      expect(utils.getAllByText("Tag create")).toBeTruthy();
    });

    fireEvent.change(utils.getByLabelText("input-name"), { target: { value: 'error-val' } });
    fireEvent.change(utils.getByLabelText("input-slug"), { target: { value: 'error-val' } });

    fireEvent.submit(utils.getByLabelText("form-submit"))
    await waitFor(() => {
      expect(utils.getAllByText(defaultErrorText)).toBeTruthy();
      expect(utils.getByText(error400AxiosResponse.data.name[0])).toBeTruthy();
    });
  })
})