import { sortDate, sortBoolean, sortTextLength } from '../../helper/sort';

describe("sort", () => {
  it("sortDate", async () => {
    const daySec = 86400;
    const a = '2020-05-14';
    const b = '2020-05-15';
    const c = '2020-05-24';

    const result1 = sortDate(a, b);
    expect(result1).toBe(parseInt(`-${daySec}`))

    const result2 = sortDate(a, c);
    expect(result2).toBe(parseInt(`-${daySec * 10}`))

    const result3 = sortDate(c, a);
    expect(result3).toBe(parseInt(`${daySec * 10}`))

    const result4 = sortDate(b, b);
    expect(result4).toBe(0);
  })

  it("sortBoolean", () => {
    const a = true;
    const b = false;

    const result1 = sortBoolean(a, b);
    expect(result1).toBe(1);

    const result2 = sortBoolean(b, a);
    expect(result2).toBe(1);

    const result3 = sortBoolean(a, a);
    expect(result3).toBe(0);
  })

  it("sortTextLength", () => {
    const a1 = "a";
    const b3 = "bbb";
    const c6 = "cccccc";

    const result1 = sortTextLength(a1, b3);
    expect(result1).toBe(-2);

    const result2 = sortTextLength(a1, c6);
    expect(result2).toBe(-5);

    const result3 = sortTextLength(c6, b3);
    expect(result3).toBe(3);

    const result4 = sortTextLength(a1, a1);
    expect(result4).toBe(0);
  })
});