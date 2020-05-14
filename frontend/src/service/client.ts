import axios from 'axios';
export const endPoint = `${process.env.REACT_APP_BACKEND}/api/v1`;

const client = axios.create({
  baseURL: endPoint,
});

export const setClientToken = (token: string | unknown): void => {
  client.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};

export default client;
