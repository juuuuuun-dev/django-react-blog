import { mocked } from 'ts-jest/utils'
import { AxiosResponse } from 'axios';
import { cleanup, fireEvent, waitFor, act } from '@testing-library/react'
import { list, retrieve, update, destroy } from '../../../../service/admin/posts';
import { defaultSuccessText, defaultErrorText, defaultDeleteText } from '../../../../components/common/toast'
import { listData, listAxiosResponse, detailAxiosResponse, updateAxiosResponse, error400AxiosResponse } from '../../../../__mocks__/serviceResponse/posts';
import { error404AxiosResponse, error500AxiosResponse, deleteAxiosResponse } from '../../../../__mocks__/serviceResponse/common';
import { setUp } from '../../../../__mocks__/adminSetUp';

afterEach(() => cleanup());
jest.mock('../../../../service/admin/posts');

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
      expect(utils.getByText(listData.results[0].title)).toBeTruthy()
    })
    fireEvent.click(utils.getByText(listData.results[0].title));
    await waitFor(() => {
      expect(utils.getAllByText("Post edit")).toBeTruthy();
      expect(utils.getByTestId('post-preview')).toBeTruthy();
    });
    console.log(detailAxiosResponse.data.post.content)
    act(() => {
      fireEvent.change(utils.getByLabelText("input-title"), { target: { value: 'Update Abe' } });
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