import axios from '../../../service/client';
import { retrieve } from '../../../service/main/aboutMe';

jest.mock('../../../service/client');

describe("Service about me", () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  const expectedResult = 'result';

  it("retrieve", async () => {
    mockedAxios.get.mockReturnValueOnce(Promise.resolve(expectedResult));
    const result = await retrieve();
    expect(result).toBe(expectedResult);
  })
});