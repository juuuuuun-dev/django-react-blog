import axios from '../client';

const endPoint = '/init/';

export const getInit = async () => {
  return axios.get(`${endPoint}`);
};
