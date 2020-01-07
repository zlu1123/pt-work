"use strict";

import Vue from "vue";
import axios from "axios";
import { baseUrlConfig } from "../service/baseUrl";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || "",
  baseURL:
    process.env.NODE_ENV === "production"
      ? baseUrlConfig.proURL
      : baseUrlConfig.devURL,
  timeout: 30 * 1000, // Timeout
  withCredentials: true, // Check cross-site Access-Control
  headers: "",
  dataType: "json"
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  config => {
    // Do something before request is sent
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  response => {
    // Do something with response data
    return response;
  },
  error => {
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = (Vue, options) => {
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

Vue.use(Plugin);

export function axiosRequest(methods, requestUrl, params, header) {
  let config = {
    method: methods,
    url: requestUrl,
    data: params,
    dataType: "json",
    headers: getHeader(header)
  };
  return axios(config);
}

export function getHeader(header) {
  let headers = {
    servcUrl: "",
    transSeqNo: "",
    reqTime: "",
    termId: "",
    pageSize: "",
    pageIndex: "",
    openId: getOpenId()
  };
  return Object.assign(headers, header);
}

export function getOpenId() {
  // return Math.random(32);
  // return 0.7546318464188451
  return "2019122874054400";
  // return "11111111";
  // return "2020010641207808";
}

export default Plugin;
