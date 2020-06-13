import { AxiosResponse } from 'axios';
import { mocked } from 'ts-jest/utils';

import { act, cleanup, fireEvent, waitFor } from '@testing-library/react';

import { setUp } from '../../../../__mocks__/adminSetUp';
import {
    detailAxiosResponse, listAxiosResponse, listData, updateAxiosResponse
} from '../../../../__mocks__/serviceResponse/categories';
import {
    deleteAxiosResponse, error404AxiosResponse, error500AxiosResponse
} from '../../../../__mocks__/serviceResponse/common';
import {
    defaultDeleteText, defaultErrorText, defaultSuccessText
} from '../../../../components/common/toast';
import { destroy, list, retrieve, update } from '../../../../service/admin/categories';

afterEach(() => cleanup());
jest.mock('../../../../service/admin/categories');

describe("Admin categories edit", () => {
  const initialPath = "/admin/categories";

  beforeEach(() => {
    mocked(list).mockClear()
    mocked(retrieve).mockClear();
    mocked(update).mockClear();
    mocked(destroy).mockClear();
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
  mocked(destroy).mockImplementation(
    (): Promise<AxiosResponse<any>> => Promise.resolve(deleteAxiosResponse)
  );

  it("Request successful", async () => {
    const { utils } = await setUp(initialPath);
    await waitFor(() => {
      expect(utils.getByTestId("create-btn")).toBeTruthy();
      expect(utils.getAllByText(listData.results[0].name)).toBeTruthy()
      expect(utils.getAllByText(listData.results[0].slug)).toBeTruthy()
    })
    fireEvent.click(utils.getAllByText(listData.results[0].name));
    await waitFor(() => {
      expect(utils.getAllByText("Category edit")).toBeTruthy();
    });
    act(() => {
      fireEvent.change(utils.getByLabelText("input-name"), { target: { value: 'updateAbe' } });
      fireEvent.change(utils.getByLabelText("input-slug"), { target: { value: 'updateAbe' } });
    })
    fireEvent.submit(utils.getByLabelText("form-submit"))
    await waitFor(() => {
      expect(utils.getAllByText(defaultSuccessText)).toBeTruthy();
    });
  });

  it("500 put error", async () => {
    mocked(update).mockImplementation(
      (): Promise<AxiosResponse<any>> => {
        return Promise.reject({ response: error500AxiosResponse })
      }
    );

    const { utils } = await setUp(initialPath);
    await waitFor(() => {
      expect(utils.getByTestId("create-btn")).toBeTruthy();
      expect(utils.getByText(listData.results[0].name)).toBeTruthy()
    })
    fireEvent.click(utils.getByText(listData.results[0].name));
    await waitFor(() => {
      expect(utils.getByText("Category edit")).toBeTruthy();
    });
    fireEvent.submit(utils.getByLabelText("form-submit"))
    await waitFor(() => {
      expect(utils.getByText(defaultErrorText)).toBeTruthy();
    });
  });

  it("404 retrieve error", async () => {
    mocked(retrieve).mockImplementation(
      (id): Promise<AxiosResponse<any>> => Promise.reject({ response: error404AxiosResponse })
    );

    const { utils } = await setUp(initialPath);
    await waitFor(() => {
      expect(utils.getByTestId("create-btn")).toBeTruthy();
      expect(utils.getByText(listData.results[0].name)).toBeTruthy()
    })
    fireEvent.click(utils.getByText(listData.results[0].name));
    await waitFor(() => {
      expect(utils.getByText(defaultErrorText)).toBeTruthy();
    });
  });

  it("Delete successful", async () => {
    const { utils } = await setUp(initialPath);
    await waitFor(() => {
      expect(utils.getByTestId("create-btn")).toBeTruthy();
      expect(utils.getByText(listData.results[0].name)).toBeTruthy()
    })
    fireEvent.click(utils.getByText(listData.results[0].name));
    fireEvent.click(utils.getByLabelText("delete-btn"));
    fireEvent.click(utils.getByLabelText("delete-submit"));
    await waitFor(() => {
      expect(utils.getByTestId("create-btn")).toBeTruthy();
      expect(utils.getByText(defaultDeleteText)).toBeTruthy()
    });
  })

  // delete error
  it("Delete error", async () => {
    mocked(destroy).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.reject({ response: error404AxiosResponse })
    );
    const { utils } = await setUp(initialPath);
    await waitFor(() => {
      expect(utils.getByTestId("create-btn")).toBeTruthy();
      expect(utils.getByText(listData.results[0].name)).toBeTruthy()
    })
    fireEvent.click(utils.getByText(listData.results[0].name));
    fireEvent.click(utils.getByLabelText("delete-btn"));
    fireEvent.click(utils.getByLabelText("delete-submit"));
    await waitFor(() => {
      expect(utils.getAllByText(defaultErrorText)).toBeTruthy()
    });
  })
})