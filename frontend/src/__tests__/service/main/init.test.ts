import axios from '../../../service/client';
import { getInit } from '../../../service/main/init';

jest.mock('../../../service/client');

describe("Service init", () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  const expectedResult = 'result';

  it("getInit", async () => {
    mockedAxios.get.mockReturnValueOnce(Promise.resolve(expectedResult));
    const result = await getInit();
    expect(result).toBe(expectedResult);
  })
});
