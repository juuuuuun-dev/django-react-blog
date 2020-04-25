import axios from '../../helper/client';
import { IListQuery } from '../../types/pagination';
import { queryStringify } from '../../helper/query';

const endPoint = '/tags/admin-tag/';

interface IData {
  name: string;
}

export const list = async (queries: IListQuery) => {
  const query = queryStringify(queries);
  return axios.get(`${endPoint}?${query}`);
};

export const retrieve = async (id: string | undefined) => {
  return axios.get(`${endPoint}/${id}`)
}

export const update = async (id: string | undefined, data: IData) => {
  return axios.put(`${endPoint}/${id}/`, data)
}

export const create = async (data: IData) => {
  return axios.post(`${endPoint}`, data)
}

export const destroy = async (id: string | undefined) => {
  return axios.delete(`${endPoint}/${id}`)
}
