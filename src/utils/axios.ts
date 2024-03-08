import axios, { AxiosRequestConfig } from 'axios';

import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.request.use((config) => {
  const access_token = localStorage.getItem('access_token'); // Assuming you store the access token in localStorage after login
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args: string | [string, AxiosRequestConfig]) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });

  return res.data.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    me: '/api/auth/me',
    login: '/api/v1/login',
    register: '/api/auth/register',
  },
  introduce: {
    list: '/api/v1/introduce/list',
    update: '/api/v1/introduce/update'
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
};
