import axios from 'axios';

import { url } from '../config/baseURL';

let defaultHeaderOptions = {
  'Content-Type': 'application/json',
  'Accept': '*/*',
};

const service = axios.create({
  baseURL: url,
  headers: defaultHeaderOptions,
});


service.interceptors.request.use(config => {
  // config.headers['Cache-Control'] = 'no-store, no-cache';
  // config.headers['Accept'] = 'application/json';
  // config.headers["Authorization"] = "bearer " + store.getState().vAgent.access_token;
  // config.params = config.params || {};
  // config.params['timestamp'] = timestamp;
  return config;
}, error => {
  console.log('Api Request Error - ', error);
  return Promise.reject(error);
});

// service.interceptors.response.use(response => {
//   return response;
// }, error => {
//   console.log('Api Response Error - ', error)
//   // if (error.response.status === 401) {
//   //   EventBus.dispatch('show_snack', { message: 'トークンの有効期限が切れました', type: "error" })
//   // store.dispatch({ type: 'ACCESS_TOKEN', access_token: '' });
//   //   return window.location.href = '/'   // login 
//   // }
//   return Promise.reject(error);
// });

export default service;