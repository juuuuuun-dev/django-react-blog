import axios from '../../../service/client';
import { categoryPagelist, list, retrieve, tagPagelist } from '../../../service/main/posts';

jest.mock('../../../service/client');

describe("Service posts", () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;
  const expectedResult = 'result';
  const requestData = {
    title: 'title test',
    content: 'content test',
    category: {
      id: 1,
      name: 'category test',
    },
    tag: [
      { id: 1, name: 'tag test' }
    ]
  }
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

  it("categoryPagelist", async () => {
    mockedAxios.get.mockReturnValueOnce(Promise.resolve(expectedResult));
    const slug = "test";
    const query = {
      page: 1,
      category: 1
    }
    const result = await categoryPagelist(slug, query);
    expect(result).toBe(expectedResult);
  })

  it("tagPagelist", async () => {
    mockedAxios.get.mockReturnValueOnce(Promise.resolve(expectedResult));
    const slug = "test";
    const query = {
      page: 1,
      category: 1
    }
    const result = await tagPagelist(slug, query);
    expect(result).toBe(expectedResult);
  })
});