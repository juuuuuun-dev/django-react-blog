import { mocked } from 'ts-jest/utils'
import { AxiosResponse } from 'axios';
import { cleanup, fireEvent, waitFor, act } from '@testing-library/react'
import { escapeRegExp } from '../../../../helper/str';
import { list, create, postFormItem } from '../../../../service/admin/posts';
import { list as mediaList } from '../../../../service/admin/media';
import { defaultSuccessText, defaultErrorText } from '../../../../components/common/toast'
import { listData, listAxiosResponse, createAxiosResponse, formItemAxiosResponse, error400AxiosResponse } from '../../../../__mocks__/serviceResponse/posts';
import { listAxiosResponse as mediaListAxiosResponse } from '../../../../__mocks__/serviceResponse/media';
import { error500AxiosResponse } from '../../../../__mocks__/serviceResponse/common';
import { setUp } from '../../../../__mocks__/adminSetUp';


afterEach(() => cleanup());
jest.mock('../../../../service/admin/posts');
jest.mock('../../../../service/admin/media');

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
    fireEvent.change(utils.getByTestId("text-area"), { target: { value: `#${contentTitle}\n` } });
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
    fireEvent.click(utils.getByTestId('add-media-btn'));
    fireEvent.mouseOver(await utils.findByTestId(`media-list-${mediaListAxiosResponse.data.results[0].id}`));
    fireEvent.click(await utils.findByTestId('add-media-code-btn'));
    await waitFor(() => {
      const mediaStr = `[${mediaListAxiosResponse.data.results[0].name}](${mediaListAxiosResponse.data.results[0].file})`;
      const match = new RegExp(escapeRegExp(mediaStr));
      expect(utils.getByTestId("text-area").innerHTML).toMatch(match);
    });
    // preview
    fireEvent.click(utils.getByText("Preview"));
    await waitFor(() => {
      const h1 = `<h1 id="${contentTitle}">${contentTitle}</h1>`;
      const match = new RegExp(escapeRegExp(h1));
      expect(utils.getByTestId("mde-preview").innerHTML).toMatch(match)
    })

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
    fireEvent.change(utils.getByTestId("text-area"), { target: { value: 'create context' } });
    // category
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
    // content
    fireEvent.change(utils.getByTestId("text-area"), { target: { value: 'create context' } });
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