import axios from '../client';

const endPoint = '/site-settings/admin-site-setting/';

export const retrieve = async () => {
  return axios.get(`${endPoint}`)
}

export const update = async (data: FormData) => {
  const headers = { "content-type": "multipart/form-data" };
  return axios.put(`${endPoint}`, data, { headers })
}
