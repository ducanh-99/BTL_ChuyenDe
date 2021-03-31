// api/axiosClient.js
import axios from 'axios';
import queryString from 'query-string';
import { notification } from 'antd';
import {BASE_API} from "./constants";

// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-
// config` for the full list of configs

const axiosClient = axios.create({
  //timeout: 5000,
  baseURL: BASE_API,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(async (config) => {
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${localStorage.getItem("dataUser") !== null && JSON.parse(localStorage.getItem("dataUser")).accessToken ? JSON.parse(localStorage.getItem("dataUser")).accessToken : ''}`,
  };
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    debugger;
    throw error;
  },
);

export default axiosClient;
