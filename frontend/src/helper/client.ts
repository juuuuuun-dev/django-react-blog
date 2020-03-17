import axios from 'axios';
export const endPoint = `${process.env.REACT_APP_BACKEND}/api/v1`;

const client = axios.create({
  baseURL: endPoint,
});

export const setToken = (token: string | unknown): void => {
  client.defaults.headers.common['Authorization'] = 'Token ' + token;
};

export default client;
