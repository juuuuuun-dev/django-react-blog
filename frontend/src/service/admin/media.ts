import axios from '../../helper/client';
import { IMediaData } from '../../types/media'
const endPoint = '/media/admin-media/';


export const list = async () => {
  return axios.get(endPoint);
};

export const retrieve = async (id: string | undefined) => {
  return axios.get(`${endPoint}/${id}`)
}

export const update = async (id: string | undefined, data: FormData) => {
  return axios.put(`${endPoint}/${id}/`, data)
}

export const create = async (data: FormData) => {
  console.log("create")
  const headers = { "content-type": "multipart/form-data" };
  return axios.post(`${endPoint}`, data, { headers })
}

export const destroy = async (id: string | undefined) => {
  return axios.delete(`${endPoint}/${id}`)
}
