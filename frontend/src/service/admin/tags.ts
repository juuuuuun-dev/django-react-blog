import axios from '../client';
import { ListQuery } from '../../types/pagination';
import { queryStringify } from '../../helper/query';
import { RequestData } from '../../types/tags';

const endPoint = '/tags/admin-tag/';

export const list = async (queries: ListQuery) => {
  const query = queryStringify(queries);
  return axios.get(`${endPoint}?${query}`);
};

export const retrieve = async (id: string | undefined) => {
  return axios.get(`${endPoint}/${id}`)
}

export const update = async (id: string | undefined, data: RequestData) => {
  return axios.put(`${endPoint}/${id}/`, data)
}

export const create = async (data: RequestData) => {
  return axios.post(`${endPoint}`, data)
}

export const destroy = async (id: string | undefined) => {
  return axios.delete(`${endPoint}/${id}`)
}
