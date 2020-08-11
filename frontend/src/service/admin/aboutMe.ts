import { AboutMeDetail } from '../../types/aboutMe';
import axios from '../client';

const endPoint = '/users/admin-about-me/';

export const retrieve = async () => {
  return axios.get(`${endPoint}`)
}

export const update = async (data: AboutMeDetail) => {
  return axios.put(`${endPoint}`, data)
}
