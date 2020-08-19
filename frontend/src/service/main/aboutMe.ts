import axios from '../client';

const endPoint = '/users/about-me/';

export const retrieve = async () => {
  return axios.get(`${endPoint}`)
}
