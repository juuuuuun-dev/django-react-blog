import axios, { setToken } from '../helper/client';

const adminEndPoint = '/tags/admin-tag/';

export const list = async () => {
  return axios.get(adminEndPoint);
};
