"use strict";

import Vue from "vue";
import store from "../store";
import axios from "axios";
import { localData } from "../plugins/local";
import { Toast } from "vant";
// import { baseUrlConfig } from "../service/baseUrl";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// let config = {
//   // baseURL: process.env.baseURL || process.env.apiUrl || "",
//   baseURL:
//     process.env.NODE_ENV === "production"
//       ? baseUrlConfig.proURL
//       : baseUrlConfig.devURL,
//   timeout: 30 * 1000, // Timeout
//   withCredentials: true, // Check cross-site Access-Control
//   headers: "",
//   dataType: "json"
// };

// const _axios = axios.create(config);

// _axios.interceptors.request.use(
//   config => {
//     // Do something before request is sent
//     store.commit("showLoading");
//     return config;
//   },
//   error => {
//     // Do something with request error
//     store.commit("hideLoading");
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor
// _axios.interceptors.response.use(
//   response => {
//     // Do something with response data
//     store.commit("hideLoading");
//     return response;
//   },
//   error => {
//     // Do something with response error
//     store.commit("hideLoading");
//     return Promise.reject(error);
//   }
// );

// Plugin.install = (Vue, options) => {
//   Vue.axios = _axios;
//   window.axios = _axios;
//   Object.defineProperties(Vue.prototype, {
//     axios: {
//       get() {
//         return _axios;
//       }
//     },
//     $axios: {
//       get() {
//         return _axios;
//       }
//     }
//   });
// };

axios.interceptors.request.use(
  config => {
    // Do something before request is sent
    store.commit("showLoading");
    return config;
  },
  error => {
    // Do something with request error
    store.commit("hideLoading");
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  response => {
    // Do something with response data
    store.commit("hideLoading");
    // return response.data;
    if (response && response.data.retCode !== "00000") {
      Toast(response.data.retInfo);
    }
    return response;
  },
  error => {
    // Do something with response error
    store.commit("hideLoading");
    return Promise.reject(error);
  }
);

Plugin.install = (Vue, options) => {
  Vue.axios = axios;
  window.axios = axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return axios;
      }
    },
    $axios: {
      get() {
        return axios;
      }
    }
  });
};

Vue.use(Plugin);

export function axiosRequest(methods, requestUrl, params, header) {
  let config = {
    timeout: 30 * 1000, // Timeout
    withCredentials: true, // Check cross-site Access-Control
    method: methods,
    url: requestUrl,
    data: params || {},
    dataType: "json",
    headers: getHeader(header)
  };
  return axios(config);
}

export function getHeader(header) {
  let headers = {
    openId: localData("get", "userInfo").openid || ""
  };
  return Object.assign(headers, header);
}

export default Plugin;
