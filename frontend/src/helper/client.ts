import axios from 'axios';
export const endPoint = `${process.env.REACT_APP_BACKEND}/api/v1`;

const client = axios.create({
  baseURL: endPoint,
});

export const setToken = (token: string | unknown): void => {
  client.defaults.headers.common['Authorization'] = 'Token ' + token;
}

export const post = async (path: string, data: any) => {
  return await client.post(path, data);
};
export const get = async (path: string) => {
  return await client.get(path);
};


