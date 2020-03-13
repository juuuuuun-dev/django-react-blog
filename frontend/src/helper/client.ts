import axios from 'axios';
export const endPoint = `${process.env.REACT_APP_BACKEND}/api/v1`;

const token = '';
const client = axios.create({
  baseURL: endPoint,
});
client.defaults.headers.common['Authorization'] = token;

export const post = async (path: string, data: any) => {
  return await client.post(path, data);
};
