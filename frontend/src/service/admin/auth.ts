import React from 'react';
import axios from '../client';
import { clear } from 'local-storage';
import { AxiosResponse } from 'axios';
import { useHistory } from 'react-router-dom';
import { PasswordResetConfirm } from '../../types/auth';

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

export const passwordReset = async (email: string): Promise<AxiosResponse<any>> => {
  return axios.post('/users/password-reset/', { email });
}

export const passwordResetConfirm = async ({ uid, token, values }: PasswordResetConfirm): Promise<AxiosResponse<any>> => {
  return axios.post(`/users/password-reset-confirm/${uid}/${token}/`, values);
}