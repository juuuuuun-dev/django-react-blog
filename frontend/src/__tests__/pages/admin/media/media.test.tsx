import React from 'react';
import { render, cleanup, fireEvent, waitFor, act } from '@testing-library/react'
// import { act } from '@testing-library/react-hooks'
// import { act } from 'react-dom/test-utils';
import "@testing-library/jest-dom/extend-expect";
import { mocked } from 'ts-jest/utils'
import { list, retrieve, update, destroy } from '../../../../service/admin/media';
import { AxiosResponse } from 'axios';
import { listData, resultData, updateResultData } from '../../../../__mocks__/mediaData';
import { adminSetUp } from '../../../../__mocks__/adminSetUp';
import '../../../../__mocks__/windowMatchMedia';

afterEach(() => cleanup());
jest.mock('../../../../service/admin/media');

describe("Admin-media", () => {

  beforeEach(() => {
    mocked(list).mockClear()
    mocked(retrieve).mockClear();
    mocked(update).mockClear();
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

  it("renders media CRUD", async () => {
    mocked(list).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(listAxiosResponse)
    );
    mocked(retrieve).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(detailAxiosResponse)
    );
    mocked(update).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(updateAxiosResponse)
    );

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
    // @todo delete

    console.log(utils.container.innerHTML)

  })
})