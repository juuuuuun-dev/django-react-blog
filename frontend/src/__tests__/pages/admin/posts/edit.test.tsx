import { AxiosResponse } from 'axios';
import { mocked } from 'ts-jest/utils';

import { act, fireEvent, waitFor } from '@testing-library/react';

import { setUp } from '../../../../__mocks__/adminSetUp';
import {
    deleteAxiosResponse, error404AxiosResponse, error500AxiosResponse
} from '../../../../__mocks__/serviceResponse/common';
import {
    listAxiosResponse as mediaListAxiosResponse
} from '../../../../__mocks__/serviceResponse/media';
import {
    detailAxiosResponse, error400AxiosResponse, listAxiosResponse, listData, updateAxiosResponse
} from '../../../../__mocks__/serviceResponse/posts';
import {
    defaultDeleteText, defaultErrorText, defaultSuccessText
} from '../../../../components/common/toast';
import { getBase64 } from '../../../../helper/file';
import { list as mediaList } from '../../../../service/admin/media';
import { destroy, list, retrieve, update } from '../../../../service/admin/posts';

jest.mock('../../../../service/admin/posts');
jest.mock('../../../../helper/file');
jest.mock('../../../../service/admin/media');

// @ts-ignore
global.document.createRange = () => ({
  setStart: () => { },
  setEnd: () => { },
  collapsed: true,
  getBoundingClientRect: function () {
    return {
      width: 0,
      height: 0,
      top: 0,
      left: 0
    }
  },
  getClientRects: function () {
    return {
      width: 0,
      height: 0,
    }
  },
  // @ts-ignore
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
});

describe("Admin posts edit", () => {
  const initialPath = "/admin/posts";
  const base64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAoACgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJVAAAAAAAAAAAAAAAAAA//Z";
  const file = new File([base64], "test.jpg", {
    type: "image/jpeg",
  });
  beforeEach(() => {
    mocked(list).mockClear()
    mocked(retrieve).mockClear();
    mocked(update).mockClear();
    mocked(destroy).mockClear();
    mocked(getBase64).mockClear();
    mocked(mediaList).mockClear();
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
  mocked(getBase64).mockImplementation(
    (_img, callback): void => {
      callback(base64)
    }
  );
  mocked(mediaList).mockImplementation(
    (): Promise<AxiosResponse<any>> => Promise.resolve(mediaListAxiosResponse)
  );

  it("Request successful", async () => {
    const { utils } = await setUp(initialPath);
    await waitFor(() => {
      expect(utils.getByTestId("create-btn")).toBeTruthy();
      expect(utils.getByText(listData.results[0].title)).toBeTruthy()
    })
    fireEvent.click(utils.getByText(listData.results[0].title));
    await waitFor(() => {
      expect(utils.getAllByText("Post edit")).toBeTruthy();
      expect(utils.getByTestId('post-preview')).toBeTruthy();
    });
    act(() => {
      fireEvent.change(utils.getByLabelText("input-title"), { target: { value: 'Update Abe' } });
      fireEvent.change(utils.getByLabelText("input-slug"), { target: { value: 'update-abe' } });
    })
    // cover
    expect(await utils.findByTestId("post-preview-cover")).toBeTruthy();
    fireEvent.click(utils.getByLabelText("delete-cover"));
    expect(utils.queryAllByTestId("post-preview-cover").length).toBe(0);
    // cover select
    fireEvent.click(utils.getByLabelText('select-cover'));
    expect(await utils.findByTestId("media-modal")).toBeTruthy();
    fireEvent.mouseOver(await utils.findByTestId(`media-list-${mediaListAxiosResponse.data.results[0].id}`));
    fireEvent.click(await utils.findByTestId('add-media-btn'));
    await waitFor(() => {
      const match = new RegExp(mediaListAxiosResponse.data.results[0].cover)
      expect(utils.getByLabelText('cover-media-image').innerHTML).toMatch(match)
    });

    fireEvent.mouseDown(utils.getByTestId("select-category").firstElementChild);
    fireEvent.click(utils.getByTestId(`option-category-${listData.categories[0].id}`));


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
      expect(utils.getByText(listData.results[0].title)).toBeTruthy()
    })
    fireEvent.click(utils.getByText(listData.results[0].title));
    await waitFor(() => {
      expect(utils.getByText("Post edit")).toBeTruthy();
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
      expect(utils.getByText(listData.results[0].title)).toBeTruthy()
    })
    fireEvent.click(utils.getByText(listData.results[0].title));
    await waitFor(() => {
      expect(utils.getByText(defaultErrorText)).toBeTruthy();
    });
  });

  it("Delete successful", async () => {
    const { utils } = await setUp(initialPath);
    await waitFor(() => {
      expect(utils.getByTestId("create-btn")).toBeTruthy();
      expect(utils.getByText(listData.results[0].title)).toBeTruthy()
    })
    fireEvent.click(utils.getByText(listData.results[0].title));
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
      expect(utils.getByText(listData.results[0].title)).toBeTruthy()
    })
    fireEvent.click(utils.getByText(listData.results[0].title));
    fireEvent.click(utils.getByLabelText("delete-btn"));
    fireEvent.click(utils.getByLabelText("delete-submit"));
    await waitFor(() => {
      expect(utils.getAllByText(defaultErrorText)).toBeTruthy()
    });
  })
})