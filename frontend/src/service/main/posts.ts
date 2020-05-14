import axios from '../client';
const endPoint = '/posts/';

export const list = async () => {
  return axios.get(endPoint);
};

export const retrieve = async (id: string | undefined) => {
  return axios.get(`${endPoint}/${id}`)
}

export const postFormItem = async () => {
  return axios.get(`${endPoint}/form-item`);
}
