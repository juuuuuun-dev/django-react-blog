import axios from '../../helper/client';
const endPoint = '/users/user-profile/';

interface IData {
  username: any;
  profile: {
    message: any;
    url: any;
  };
}


export const retrieve = async () => {
  return axios.get(`${endPoint}`)
}

export const patch = async (data: IData) => {
  return axios.patch(`${endPoint}`, data)
}

