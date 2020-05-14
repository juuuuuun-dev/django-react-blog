import { list, retrieve, update, create, destroy, postFormItem } from '../../../service/admin/posts'
import axios from '../../../service/client';

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

  it("update", async () => {
    mockedAxios.put.mockReturnValueOnce(Promise.resolve(expectedResult));

    const result = await update("1", requestData);
    expect(result).toBe(expectedResult);
  })

  it("create", async () => {
    mockedAxios.post.mockReturnValueOnce(Promise.resolve(expectedResult));
    const result = await create(requestData);
    expect(result).toBe(expectedResult);
  })

  it("destroy", async () => {
    mockedAxios.delete.mockReturnValueOnce(Promise.resolve(expectedResult));
    const result = await destroy("1");
    expect(result).toBe(expectedResult);
  })

  it("postFormItem", async () => {
    mockedAxios.get.mockReturnValueOnce(Promise.resolve(expectedResult));
    const result = await postFormItem();
    expect(result).toBe(expectedResult);
  })
});