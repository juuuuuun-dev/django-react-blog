import { AxiosResponse } from 'axios';
import { mocked } from 'ts-jest/utils';

import { act, cleanup, fireEvent, waitFor } from '@testing-library/react';

import { setUp } from '../../../../__mocks__/adminSetUp';
import { error500AxiosResponse } from '../../../../__mocks__/serviceResponse/common';
import {
    listAxiosResponse as mediaListAxiosResponse
} from '../../../../__mocks__/serviceResponse/media';
import {
    createAxiosResponse, error400AxiosResponse, formItemAxiosResponse, listAxiosResponse, listData
} from '../../../../__mocks__/serviceResponse/posts';
import { defaultErrorText, defaultSuccessText } from '../../../../components/common/toast';
import { escapeRegExp } from '../../../../helper/str';
import { list as mediaList } from '../../../../service/admin/media';
import { create, list, postFormItem } from '../../../../service/admin/posts';

afterEach(() => cleanup());
jest.mock('../../../../service/admin/posts');
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

describe("Admin posts create", () => {
  const initialPath = "/admin/posts";
  beforeEach(() => {
    mocked(list).mockClear()
    mocked(create).mockClear();
    mocked(postFormItem).mockClear();
    mocked(mediaList).mockClear();
  })

  mocked(list).mockImplementation(
    (): Promise<AxiosResponse<any>> => Promise.resolve(listAxiosResponse)
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
    // title
    fireEvent.change(utils.getByLabelText("input-title"), { target: { value: 'createAbe' } });
    // content
    const contentTitle = "create";
    await waitFor(() => {
      utils.getByTestId('text-area').firstElementChild.value = `#${contentTitle}\n`;
    })

    // category
    fireEvent.mouseDown(utils.getByLabelText("select-category").firstElementChild);
    fireEvent.click(utils.getByLabelText(`option-category-${formItemAxiosResponse.data.categories[0].id}`));
    // tag
    fireEvent.mouseDown(utils.getByLabelText("select-tag").firstElementChild);
    fireEvent.click(utils.getByLabelText(`option-tag-${formItemAxiosResponse.data.tags[0].id}`));
    fireEvent.click(utils.getByLabelText(`option-tag-${formItemAxiosResponse.data.tags[1].id}`));
    // is_show
    fireEvent.click(utils.getByTestId("switch-is_show"));

    // media modal
    fireEvent.click(utils.getByTitle('Add media'));
    expect(await utils.findByTestId("media-modal")).toBeTruthy();
    fireEvent.mouseOver(await utils.findByTestId(`media-list-${mediaListAxiosResponse.data.results[0].id}`));
    fireEvent.click(await utils.findByTestId('add-media-code-btn'));

    await waitFor(() => {
      const mediaStr = `${mediaListAxiosResponse.data.results[0].file}`;
      const match = new RegExp(escapeRegExp(mediaStr));
      expect(utils.getByTestId("post-md-content").innerHTML).toMatch(match)
    });

    fireEvent.submit(utils.getByLabelText("form-submit"))
    await waitFor(() => {
      expect(utils.getAllByText(defaultSuccessText)).toBeTruthy();
    });
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

    // title
    fireEvent.change(utils.getByLabelText("input-title"), { target: { value: 'createAbe' } });
    // content
    utils.getByTestId('text-area').firstElementChild.value = 'test';
    fireEvent.mouseDown(utils.getByLabelText("select-category").firstElementChild);
    fireEvent.click(utils.getByLabelText(`option-category-${formItemAxiosResponse.data.categories[0].id}`));
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

    // title
    fireEvent.change(utils.getByLabelText("input-title"), { target: { value: 'createAbe' } });
    // category
    fireEvent.mouseDown(utils.getByLabelText("select-category").firstElementChild);
    fireEvent.click(utils.getByLabelText(`option-category-${formItemAxiosResponse.data.categories[0].id}`));
    fireEvent.submit(utils.getByLabelText("form-submit"))
    await waitFor(() => {
      expect(utils.getAllByText(defaultErrorText)).toBeTruthy();
      expect(utils.getByText("This title already exists")).toBeTruthy();
    });
  })
})