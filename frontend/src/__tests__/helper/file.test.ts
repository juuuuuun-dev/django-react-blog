import { waitFor } from '@testing-library/react';

import { getBase64 } from '../../helper/file';

describe("file", () => {
  beforeEach(() => {
    window.Image = jest.fn();
  });


  const base64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAoACgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJVAAAAAAAAAAAAAAAAAA//Z";
  const file = new File([base64], "tets.jpg", {
    type: "image/jpeg",
  });

  const blob = new Blob(['test'], { type: 'image/jpeg' });
  it("getBase64", async () => {
    const callback = jest.fn();
    getBase64(file, callback);
    await waitFor(() => {
      expect(window.Image).toHaveBeenCalledTimes(1)
    })
  })
});