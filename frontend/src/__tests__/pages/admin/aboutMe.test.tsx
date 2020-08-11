import { AxiosResponse } from 'axios';
import { mocked } from 'ts-jest/utils';

import { cleanup, fireEvent, waitFor } from '@testing-library/react';

import { setUp } from '../../../__mocks__/adminSetUp';
import {
    detailAxiosResponse, error400AxiosResponse, updateAxiosResponse
} from '../../../__mocks__/serviceResponse/aboutMe';
import { error404AxiosResponse } from '../../../__mocks__/serviceResponse/common';
import {
    listAxiosResponse as mediaListAxiosResponse
} from '../../../__mocks__/serviceResponse/media';
import { defaultErrorText, defaultSuccessText } from '../../../components/common/toast';
import { getBase64 } from '../../../helper/file';
import { retrieve, update } from '../../../service/admin/aboutMe';
import { list as mediaList } from '../../../service/admin/media';

afterEach(() => cleanup());
jest.mock('../../../service/admin/aboutMe');
jest.mock('../../../helper/file');
jest.mock('../../../service/admin/media');


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


describe("Admin about me edit", () => {
  const initialPath = "/admin/about-me";
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
  mocked(mediaList).mockImplementation(
    (): Promise<AxiosResponse<any>> => Promise.resolve(mediaListAxiosResponse)
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
      expect(utils.getByTestId("container-title").innerHTML).toMatch(/About me/)
    })
    fireEvent.change(utils.getByLabelText("input-page-title"), { target: { value: 'updateAbe' } });
    const descriptionTitle = "Description title";
    await waitFor(() => {
      utils.getByTestId('text-area').firstElementChild.value = `#${descriptionTitle}\n`;
    })

    // media modal
    fireEvent.click(utils.getByTitle('Add media'));
    expect(await utils.findByTestId("media-modal")).toBeTruthy();
    fireEvent.mouseOver(await utils.findByTestId(`media-list-${mediaListAxiosResponse.data.results[0].id}`));
    fireEvent.click(await utils.findByTestId('add-media-code-btn'));
    // submit
    fireEvent.submit(utils.getByLabelText("form-submit"))
    await waitFor(() => {
      expect(utils.getAllByText(defaultSuccessText)).toBeTruthy();
    });
  });

  it("Update error", async () => {
    mocked(update).mockImplementation(
      (): Promise<AxiosResponse<any>> => {
        return Promise.reject({ response: error400AxiosResponse })
      }
    );

    const { utils } = await setUp(initialPath);
    await waitFor(() => {
      expect(utils.getByTestId("container-title")).toBeTruthy();
      expect(utils.getByTestId("container-title").innerHTML).toMatch(/About me/)
    })
    fireEvent.change(utils.getByLabelText("input-page-title"), { target: { value: 'updateAbe' } });
    fireEvent.submit(utils.getByLabelText("form-submit"))
    await waitFor(() => {
      expect(utils.getByText(defaultErrorText)).toBeTruthy();
    });
  })

  it("Retrieve error 404", async () => {
    mocked(retrieve).mockImplementation(
      (): Promise<AxiosResponse<any>> => Promise.reject({ response: error404AxiosResponse })
    );
    const { utils } = await setUp(initialPath);
    await waitFor(() => {
      expect(utils.getByTestId("container-title")).toBeTruthy();
      expect(utils.getByTestId("container-title").innerHTML).toMatch(/About me/)
      expect(utils.getAllByText(defaultErrorText)).toBeTruthy();
    });
  })
});