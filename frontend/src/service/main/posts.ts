import { queryStringify } from '../../helper/query';
import { ListQuery } from '../../types/pagination';
import axios from '../client';

const endPoint = '/posts/';


export const list = async (queries: ListQuery) => {
  const query = queryStringify(queries);
  return axios.get(`${endPoint}?${query}`);
};

export const retrieve = async (id: string | undefined) => {
  return axios.get(`${endPoint}/${id}`)
}

export const postFormItem = async () => {
  return axios.get(`${endPoint}/form-item`);
}


export const categoryPagelist = async (slug: string, queries: ListQuery) => {
  const query = queryStringify(queries);
  return axios.get(`${endPoint}?${query}`);
};