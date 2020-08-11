import { retrieve, update } from '../../../service/admin/aboutMe';
import axios from '../../../service/client';

jest.mock('../../../service/client');

describe("Service about me", () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  const expectedResult = 'result';

  it("retrieve", async () => {
    mockedAxios.get.mockReturnValueOnce(Promise.resolve(expectedResult));
    const result = await retrieve();
    expect(result).toBe(expectedResult);
  })

  it("update", async () => {
    mockedAxios.put.mockReturnValueOnce(Promise.resolve(expectedResult));
    const data = {
      "page_title": "test",
      "description": "test",
    }
    const result = await update(data);
    expect(result).toBe(expectedResult);
  })
});