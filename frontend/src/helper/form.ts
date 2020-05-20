export const createFormData = (data: any): FormData => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]: [string, any]) => {
    if (Array.isArray(value)) {
      value.forEach((v, i) => {
        formData.append(`${key}[]`, v);
      })
    } else {
      formData.append(key, value);
    }
  })
  return formData;
}