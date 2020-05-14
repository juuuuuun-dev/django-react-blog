import { getBase64 } from '../../helper/file';
import { waitFor, act } from '@testing-library/react'

describe("file", () => {
  const blob = new Blob(['test'], { type: 'image/jpeg' });
  it("getBase64", async () => {
    const callback = jest.fn();
    getBase64(blob, callback);
    await waitFor(() => {
      expect(callback).toHaveBeenCalledTimes(1)
    })
  })
});