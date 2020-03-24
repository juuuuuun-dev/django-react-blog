import axios, { setToken } from '../helper/client';

interface refreshTokenProps {
  refresh: string
}
export const refreshToken = async ({ refresh }: refreshTokenProps) => {
  return await axios.post('/blog_auth/token/refresh/', { refresh });
};
