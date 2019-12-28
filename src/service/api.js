import {
  axiosRequest
} from "../plugins/axios";
import * as urlConstant from "./urlConstant";

// 用户管理
window.httpCount = 0;
export const handleRequest = (
  methods,
  params,
  suc,
  err,
  showLoading = true,
  headers
) => {
  if (window.httpCount < 0) {
    window.httpCount = 0;
  }
  if (showLoading) {
    window.httpCount++;
  }
  if (window.httpCount > 0) {
    // loading start
  }
  methods(params, headers)
    .then(response => {
      if (showLoading) {
        window.httpCount--;
      }
      if (window.httpCount === 0) {
        // loading end
      }

      let retCode = response.data.retCode;
      if (retCode !== undefined && retCode !== "000000") {
        if (err && showLoading) {
          response.data.msgcde = "cuowu";
          return err(response.data);
        }
      } else {
        if (suc) {
          return suc(response.data)
        }
      }
    }).catch(error => {
      if (showLoading) {
        window.httpCount--;
      }
      console.log(error)
      let errMsg = {
        msgcde: "net_error",
        rtnmsg: "网络异常"
      }
      if (window.httpCount === 0) {
        // loading end
      }
      // toast errmsg
      if (err) {
        return err(errMsg)
      }
    })
};

export const handleRequestPromise = (
  methods,
  params,
  showLoading = true,
  headers
) => {
  return new Promise((resolve, reject) => {
    if (window.httpCount < 0) {
      window.httpCount = 0;
    }
    if (showLoading) {
      window.httpCount++;
    }
    if (window.httpCount > 0) {
      // loading start
    }
    methods(params, headers)
      .then(response => {
        if (showLoading) {
          window.httpCount--;
        }
        if (window.httpCount === 0) {
          // loading end
        }

        let retCode = response.data.retCode;
        if (retCode !== undefined && retCode !== "00000") {
          if (showLoading) {
            response.data.msgcde = "cuowu";
            reject(response.data);
          }
        } else {
          resolve(response.data)
        }
      }).catch(error => {
        // let errMsg = {
        //   msgcde: "net_error",
        //   rtnmsg: "网络异常"
        // }
        if (showLoading) {
          window.httpCount--;
          // toast
        }
        console.log(error)
        // let errMsg = {
        //   msgcde: "net_error",
        //   rtnmsg: "网络异常"
        // }
        if (window.httpCount === 0) {
          // loading end
        }
        // toast(errmsg)
        if (error) {
          reject(error)
        }
      })
  })
};

const POST = "post";

// 职位报名
export const enRoll = (params) => {
  return axiosRequest(POST, urlConstant.enRoll, params);
}

export const userLogin = () => {
  return axiosRequest(POST, urlConstant.userLogin)
}
