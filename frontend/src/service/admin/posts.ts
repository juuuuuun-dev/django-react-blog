import { queryStringify } from '../../helper/query';
import { ListQuery } from '../../types/pagination';
import { PostDetail } from '../../types/posts';
import axios from '../client';

const endPoint = '/posts/admin-post/';

export const list = async (queries: ListQuery) => {
  const query = queryStringify(queries);
  return axios.get(`${endPoint}?${query}`);
};

export const retrieve = async (slug: string | undefined) => {
  return axios.get(`${endPoint}${slug}`)
}

export const update = async (slug: string | undefined, data: PostDetail) => {
  return axios.put(`${endPoint}${slug}/`, data)
  // const headers = { "content-type": "multipart/form-data" };
  // return axios.put(`${endPoint}${id}/`, data, { headers })
}

export const create = async (data: PostDetail) => {
  return axios.post(`${endPoint}`, data)
}

export const postFormItem = async () => {
  return axios.get(`${endPoint}form-item`);
}

export const destroy = async (id: string | undefined) => {
  return axios.delete(`${endPoint}${id}`)
}
