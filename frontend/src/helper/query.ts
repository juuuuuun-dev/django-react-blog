
export const queryStringify = (queries: any): string => {
  let query = '';
  const arr: string[] = [];
  for (let [key, value] of Object.entries(queries)) {
    if (value) {
      arr.push(`${key}=${value}`);
    }
  }
  query = arr.join('&');
  return query;
}
