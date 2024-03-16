import axios, { AxiosRequestConfig } from 'axios';

import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: HOST_API,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

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

  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    me: '/api/v1/authenticate',
    login: '/api/v1/login',
    register: '/api/auth/register',
    changePassword: '/api/v1/recovery',
    logout: "/api/v1/logout"
  },
  introduce: {
    list: '/api/v1/introduce/list',
    update: '/api/v1/introduce/update'
  },
  about: {
    list: '/api/v1/towards-us/list',
    update: '/api/v1/towards-us/update'
  },
  employee: {
    list: '/api/v1/employee/list',
    details: '/api/v1/employee',
    update: '/api/v1/employee/update',
    delete: '/api/v1/employee/delete',
    add: '/api/v1/employee/add'
  },
  item: {
    add: '/api/v1/item/add',
    list: '/api/v1/item/list',
    details: '/api/v1/item',
    delete: '/api/v1/item/delete',
    update: '/api/v1/item/update'
  },
  partner: {
    list: '/api/v1/partner/list',
    delete: '/api/v1/partner/delete',
    add: '/api/v1/partner/add',
    details: '/api/v1/partner',
    update: '/api/v1/partner/update'
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
};
