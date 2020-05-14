import { queryStringify } from '../../helper/query';

describe("query", () => {
  it("queryStringify", () => {
    const query = {
      page: 1,
      search: "test",
    }
    const result1 = queryStringify(query);
    expect(result1).toBe("page=1&search=test");
  })

  it("queryStringify null", () => {
    const result = queryStringify({ page: null });
    expect(result).toBe('');
  })

  it("queryStringify search null", () => {
    const query = {
      page: 1,
      search: null,
    }
    const result = queryStringify(query);
    expect(result).toBe("page=1");
  })
});