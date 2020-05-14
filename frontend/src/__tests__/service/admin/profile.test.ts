import { retrieve, update } from '../../../service/admin/profile'
import axios from '../../../service/client';

jest.mock('../../../service/client');

describe("Service media", () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  const expectedResult = 'result';

  it("retrieve", async () => {
    mockedAxios.get.mockReturnValueOnce(Promise.resolve(expectedResult));
    const result = await retrieve();
    expect(result).toBe(expectedResult);
  })

  it("update", async () => {
    mockedAxios.put.mockReturnValueOnce(Promise.resolve(expectedResult));
    const params = new FormData();
    params.append('public_name', 'test');
    params.append('message', 'message');
    const file = new File(['test'], "test.jpg", {
      type: "image/jpeg",
    });
    params.append('avator', file);
    const result = await update(params);
    expect(result).toBe(expectedResult);
  })
});