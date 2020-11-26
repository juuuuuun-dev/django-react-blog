import { fireEvent, waitFor } from '@testing-library/react';

import { setUp } from '../../__mocks__/errorSetUp';
import { statusCodes } from '../../config/statusCodes';

describe("Error page", () => {
  it("404 error", async () => {

    const { utils, history } = await setUp('/error');
    await waitFor(() => {
      expect(utils.getByTestId('error-code').innerHTML).toMatch('404')
      expect(utils.getByTestId('back-to-home-page-link').innerHTML).toMatch('Back to home page');
    })
    fireEvent.click(utils.getByTestId('back-to-home-page-link'));
    await waitFor(() => {
      expect(history.location.pathname).toBe('/')
    })
  });
  it("Each statsu code", async () => {
    const { utils, history } = await setUp('/error');
    await waitFor(() => {
      expect(utils.getByTestId('error-code').innerHTML).toMatch('404')
      expect(utils.getByTestId('back-to-home-page-link').innerHTML).toMatch('Back to home page');
    })

    for (const [key, value] of Object.entries(statusCodes)) {
      history.push(`/error?status=${key}`)
      await waitFor(() => {
        expect(utils.getByTestId('error-code').innerHTML).toBe(key)
        expect(utils.getByTestId('error-name').innerHTML).toBe(value.name)
      })

    }

  });


});