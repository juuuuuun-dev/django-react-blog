import '@testing-library/jest-dom/extend-expect'
import { list, retrieve, update, create, destroy } from '../../../service/admin/categories'
import { renderHook } from '@testing-library/react-hooks'
import axios from '../../../service/client';

const mockHistoryPush = jest.fn();
jest.mock('../../../service/client');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe("Service categories", () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  const expectedResult = 'result';

  it("list", async () => {
    mockedAxios.get.mockReturnValueOnce(Promise.resolve(expectedResult));
    const result = await list({ page: 1 });
    expect(result).toBe(expectedResult);
  })

  it("retrieve", async () => {
    mockedAxios.get.mockReturnValueOnce(Promise.resolve(expectedResult));
    const result = await retrieve("1");
    expect(result).toBe(expectedResult);
  })

  it("update", async () => {
    mockedAxios.put.mockReturnValueOnce(Promise.resolve(expectedResult));
    const result = await update("1", { name: "test" });
    expect(result).toBe(expectedResult);
  })

  it("create", async () => {
    mockedAxios.post.mockReturnValueOnce(Promise.resolve(expectedResult));
    const result = await create({ name: "test" });
    expect(result).toBe(expectedResult);
  })

  it("destroy", async () => {
    mockedAxios.delete.mockReturnValueOnce(Promise.resolve(expectedResult));
    const result = await destroy("1");
    expect(result).toBe(expectedResult);
  })
});