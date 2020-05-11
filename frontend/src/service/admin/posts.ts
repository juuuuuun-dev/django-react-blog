import axios from '../../helper/client';
import { ListQuery } from '../../types/pagination';
import { queryStringify } from '../../helper/query';
import { PostDetail } from '../../types/posts'
const endPoint = '/posts/admin-post/';

export const list = async (queries: ListQuery) => {
  const query = queryStringify(queries);
  return axios.get(`${endPoint}?${query}`);
};

export const retrieve = async (id: string | undefined) => {
  return axios.get(`${endPoint}/${id}`)
}

export const update = async (id: string | undefined, data: PostDetail) => {
  return axios.put(`${endPoint}/${id}/`, data)
}

export const create = async (data: PostDetail) => {
  return axios.post(`${endPoint}`, data)
}

export const postFormItem = async () => {
  return axios.get(`${endPoint}/form-item`);
}

export const destroy = async (id: string | undefined) => {
  return axios.delete(`${endPoint}/${id}`)
}
