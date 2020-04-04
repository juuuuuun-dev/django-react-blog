import axios from '../helper/client';

const adminEndPoint = '/categories/admin-category/';

interface IData {
  name: string;
}

export const list = async () => {
  return axios.get(adminEndPoint);
};

export const retrieve = async (id: string | undefined) => {
  return axios.get(`${adminEndPoint}/${id}`)
}

export const update = async (id: string | undefined, data: IData) => {
  return axios.put(`${adminEndPoint}/${id}/`, data)
}

export const create = async (data: IData) => {
  return axios.post(`${adminEndPoint}`, data)
}

export const destroy = async (id: string | undefined) => {
  return axios.delete(`${adminEndPoint}/${id}`)
}
