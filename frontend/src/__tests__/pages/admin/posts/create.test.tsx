import { AxiosResponse } from 'axios';
import { act } from 'react-dom/test-utils';
import { mocked } from 'ts-jest/utils';

import { cleanup, fireEvent, waitFor } from '@testing-library/react';

import { setUp } from '../../../../__mocks__/adminSetUp';
import { error500AxiosResponse } from '../../../../__mocks__/serviceResponse/common';
import {
    listAxiosResponse as mediaListAxiosResponse
} from '../../../../__mocks__/serviceResponse/media';
import {
    adminListAxiosResponse, createAxiosResponse, error400AxiosResponse, formItemAxiosResponse,
    listData
} from '../../../../__mocks__/serviceResponse/posts';
import { defaultErrorText, defaultSuccessText } from '../../../../components/common/toast';
import { getBase64 } from '../../../../helper/file';
import { escapeRegExp } from '../../../../helper/str';
import { list as mediaList } from '../../../../service/admin/media';
import { create, list, postFormItem } from '../../../../service/admin/posts';

afterEach(() => cleanup());
jest.mock('../../../../service/admin/posts');
jest.mock('../../../../service/admin/media');
jest.mock('../../../../helper/file');

// Use to SimpleMDE
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

describe("Admin posts create", () => {
  const initialPath = "/admin/posts";
  const base64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAoACgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJVAAAAAAAAAAAAAAAAAA//Z";
  const file = new File([base64], "tets.jpg", {
    type: "image/jpeg",
  });

  beforeEach(() => {
    mocked(list).mockClear()
    mocked(create).mockClear();
    mocked(postFormItem).mockClear();
    mocked(mediaList).mockClear();
    mocked(getBase64).mockClear();
  })

  mocked(list).mockImplementation(
    (): Promise<AxiosResponse<any>> => Promise.resolve(adminListAxiosResponse)
  );
  mocked(create).mockImplementation(
    (): Promise<AxiosResponse<any>> => Promise.resolve(createAxiosResponse)
  );
  mocked(postFormItem).mockImplementation(
    (): Promise<AxiosResponse<any>> => Promise.resolve(formItemAxiosResponse)
  );
  mocked(mediaList).mockImplementation(
    (): Promise<AxiosResponse<any>> => Promise.resolve(mediaListAxiosResponse)
  );
  mocked(getBase64).mockImplementation(
    (_img, callback): void => {
      callback(base64)
    }
  )

  it("Create Successful", async () => {
    mocked(postFormItem).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.resolve(formItemAxiosResponse)
    );

    const { utils } = await setUp(initialPath);
    await waitFor(() => {
      expect(utils.getByTestId("create-btn")).toBeTruthy();
      expect(utils.getByText(listData.results[0].title)).toBeTruthy()
    })
    fireEvent.click(utils.getByTestId("create-btn"));
    await waitFor(() => {
      expect(utils.getAllByText("Post create")).toBeTruthy();
    });
    // change
    fireEvent.change(utils.getByLabelText("input-title"), { target: { value: 'createAbe' } });
    fireEvent.change(utils.getByLabelText("input-slug"), { target: { value: 'create-abe' } });
    const contentTitle = "create";
    await waitFor(() => {
      utils.getByTestId('text-area').firstElementChild.value = `#${contentTitle}\n`;
    })
    // category
    fireEvent.mouseDown(utils.getByTestId("select-category").firstElementChild);
    await waitFor(() => {
      fireEvent.click(utils.getByTestId(`option-category-${formItemAxiosResponse.data.categories[0].id}`));
    })

    // // tag
    fireEvent.mouseDown(utils.getByTestId("select-tag").firstElementChild);
    fireEvent.click(utils.getByTestId(`option-tag-${formItemAxiosResponse.data.tags[0].id}`));
    fireEvent.click(utils.getByTestId(`option-tag-${formItemAxiosResponse.data.tags[1].id}`));

    // is_show
    fireEvent.click(utils.getByTestId("switch-is_show"));

    // cover modal
    fireEvent.click(utils.getByLabelText('select-cover'));
    expect(await utils.findByTestId("media-modal")).toBeTruthy();
    fireEvent.mouseOver(await utils.findByTestId(`media-list-${mediaListAxiosResponse.data.results[0].id}`));
    fireEvent.click(await utils.findByTestId('add-media-btn'));
    await waitFor(() => {
      const match = new RegExp(mediaListAxiosResponse.data.results[0].cover)
      expect(utils.getByLabelText('cover-media-image').innerHTML).toMatch(match)
    });

    // media modal
    fireEvent.click(utils.getByTitle('Add media'));
    expect(await utils.findByTestId("media-modal")).toBeTruthy();
    fireEvent.mouseOver(await utils.findByTestId(`media-list-${mediaListAxiosResponse.data.results[0].id}`));
    fireEvent.click(await utils.findByTestId('add-media-btn'));

    await waitFor(() => {
      const mediaStr = `${mediaListAxiosResponse.data.results[0].file}`;
      const match = new RegExp(escapeRegExp(mediaStr));
      expect(utils.getByTestId("text-area").innerHTML).toMatch(match)
    });

    fireEvent.submit(utils.getByLabelText("form-submit"))
    await waitFor(() => {
      expect(utils.getAllByText(defaultSuccessText)).toBeTruthy();
    });
  })

  it("Swich preview", async () => {
    const { utils } = await setUp(initialPath);
    await waitFor(() => {
      expect(utils.getByTestId("create-btn")).toBeTruthy();
    })
    fireEvent.click(utils.getByTestId("create-btn"));
    await waitFor(() => {
      expect(utils.getAllByText("Post create")).toBeTruthy();
    });

    fireEvent.click(utils.getByTestId("switch-editor"));
    expect(await utils.queryAllByTestId('col-editor').length).toBe(0)
    fireEvent.click(utils.getByTestId("switch-editor"));
    expect(await utils.queryAllByTestId('col-editor').length).toBe(1)
    fireEvent.click(utils.getByTestId("switch-preview"));
    expect(await utils.queryAllByTestId('col-preview').length).toBe(0)
    fireEvent.click(utils.getByTestId("switch-preview"));
    expect(await utils.queryAllByTestId('col-preview').length).toBe(1)
  })

  // 500 error
  it("Post 500 error", async () => {
    mocked(create).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.reject({ response: error500AxiosResponse })
    );
    const { utils } = await setUp(initialPath);
    await waitFor(() => {
      expect(utils.getByTestId("create-btn")).toBeTruthy();
      expect(utils.getByText(listData.results[0].title)).toBeTruthy()
    })
    fireEvent.click(utils.getByTestId("create-btn"));
    await waitFor(() => {
      expect(utils.getAllByText("Post create")).toBeTruthy();
    });

    // change
    fireEvent.change(utils.getByLabelText("input-title"), { target: { value: 'createAbe' } });
    fireEvent.change(utils.getByLabelText("input-slug"), { target: { value: 'create-abe' } });
    utils.getByTestId('text-area').firstElementChild.value = 'test';

    // category
    fireEvent.mouseDown(utils.getByTestId("select-category").firstElementChild);
    await waitFor(() => {
      fireEvent.click(utils.getByTestId(`option-category-${formItemAxiosResponse.data.categories[0].id}`));
    })
    // tag
    fireEvent.mouseDown(utils.getByTestId("select-tag").firstElementChild);
    fireEvent.click(utils.getByTestId(`option-tag-${formItemAxiosResponse.data.tags[0].id}`));
    fireEvent.click(utils.getByTestId(`option-tag-${formItemAxiosResponse.data.tags[1].id}`));

    fireEvent.submit(utils.getByLabelText("form-submit"))
    await waitFor(() => {
      expect(utils.getByText(defaultErrorText)).toBeTruthy();
    });
  })

  // 400
  it("400 title already exists", async () => {
    mocked(create).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.reject({ response: error400AxiosResponse })
    );
    const { utils } = await setUp(initialPath);
    await waitFor(() => {
      expect(utils.getByTestId("create-btn")).toBeTruthy();
      expect(utils.getByText(listData.results[0].title)).toBeTruthy()
    })
    fireEvent.click(utils.getByTestId("create-btn"));
    await waitFor(() => {
      expect(utils.getAllByText("Post create")).toBeTruthy();
    });

    // change
    fireEvent.change(utils.getByLabelText("input-title"), { target: { value: 'createAbe' } });
    fireEvent.change(utils.getByLabelText("input-slug"), { target: { value: 'create-abe' } });
    // category
    fireEvent.mouseDown(utils.getByTestId("select-category").firstElementChild);
    await waitFor(() => {
      fireEvent.click(utils.getByTestId(`option-category-${formItemAxiosResponse.data.categories[0].id}`));
    })
    fireEvent.mouseDown(utils.getByTestId("select-tag").firstElementChild);
    fireEvent.click(utils.getByTestId(`option-tag-${formItemAxiosResponse.data.tags[0].id}`));
    fireEvent.click(utils.getByTestId(`option-tag-${formItemAxiosResponse.data.tags[1].id}`));

    fireEvent.submit(utils.getByLabelText("form-submit"))
    await waitFor(() => {
      expect(utils.getAllByText(defaultErrorText)).toBeTruthy();
      expect(utils.getByText(error400AxiosResponse.data.title[0])).toBeTruthy();
    });
  })
})
