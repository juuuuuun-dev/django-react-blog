import axios from '../../helper/client';
import { ListQuery } from '../../types/pagination';
import { queryStringify } from '../../helper/query';
const endPoint = '/media/admin-media/';

export const list = async (queries: ListQuery) => {
  const query = queryStringify(queries);
  return axios.get(`${endPoint}?${query}`);
};

export const retrieve = async (id: string | undefined) => {
  return axios.get(`${endPoint}/${id}`)
}

export const update = async (id: string | undefined, data: FormData) => {
  return axios.put(`${endPoint}/${id}/`, data)
}

export const create = async (data: FormData) => {
  const headers = { "content-type": "multipart/form-data" };
  return axios.post(`${endPoint}`, data, { headers })
}

export const destroy = async (id: string | undefined) => {
  return axios.delete(`${endPoint}/${id}`)
}
