"use strict";

import Vue from 'vue';
import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseURL: process.env.baseURL || process.env.apiUrl || "",
  timeout: 30 * 1000, // Timeout
  withCredentials: true, // Check cross-site Access-Control
  headers: "",
  dataType: "json"
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response;
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = function (Vue, options) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    }
  });
};

Vue.use(Plugin)

export function axiosRequest(methods, requestUrl, params, header) {
  let config = {
    method: methods,
    url: requestUrl,
    data: params,
    dataType: 'json',
    headers: getHeader(header)
  }
  return axios(config);
}

export function getHeader(header) {
  let headers = {
    "servcUrl": "",
    "transSeqNo": "",
    "reqTime": "",
    "termId": "",
    "pageSize": "",
    "pageIndex": ""
  }
  return Object.assign(headers, header);
}

export default Plugin;
