import React from 'react';
import axios from '../../helper/client';
import { clear } from 'local-storage';
// import toast from '../../components/common/toast';
import { AxiosResponse } from 'axios';
import { useHistory } from 'react-router-dom';


export const refreshAuthToken = async (refresh: string) => {
  return axios.post('/blog_auth/token/refresh/', { refresh });
}

export const useLogout = () => {
  const history = useHistory();
  const logout = React.useCallback(() => {
    history.push('/login');
    clear();
  }, [history]);
  return [logout]
}

export const login = async (values: any): Promise<AxiosResponse<any>> => {
  return axios.post('/blog_auth/token/', values);
}

// export const login = async (history: any, values: any): Promise<void> => {
//   try {
//     const res = await axios.post('/blog_auth/token/', values);
//     const { data } = res;
//     set<string>('token', data.access);
//     set<string>('refresh', data.refresh);
//     set<string>('username', data.username);
//     history.push('/admin/dashboard');
//   } catch {
//     toast({ type: "ERROR" });
//   }
// }

export const passwordReset = async (email: string): Promise<AxiosResponse<any>> => {
  return axios.post('/users/password-reset/', { email });
}


interface IPasswordResetConfirm {
  uid: string | undefined;
  token: string | undefined;
  values: {
    new_password: string;
    new_password2: string;
  };
}
export const passwordResetConfirm = async ({ uid, token, values }: IPasswordResetConfirm): Promise<AxiosResponse<any>> => {
  return axios.post(`/users/password-reset-confirm/${uid}/${token}/`, values);
}