import axios from '../helper/client';

const adminEndPoint = '/tags/admin-tag/';

export const list = async () => {
  return axios.get(adminEndPoint);
};

export const retrieve = async (id: string | undefined) => {
  return axios.get(`${adminEndPoint}/${id}`)
}

export const update = async (id: string | undefined, data: any) => {
  return axios.put(`${adminEndPoint}/${id}/`, data)
}
