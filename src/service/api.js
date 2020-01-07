import { axiosRequest } from "../plugins/axios";
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
          return suc(response.data);
        }
      }
    })
    .catch(error => {
      if (showLoading) {
        window.httpCount--;
      }
      console.log(error);
      let errMsg = {
        msgcde: "net_error",
        rtnmsg: "网络异常"
      };
      if (window.httpCount === 0) {
        // loading end
      }
      // toast errmsg
      if (err) {
        return err(errMsg);
      }
    });
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
          resolve(response.data);
        }
      })
      .catch(error => {
        // let errMsg = {
        //   msgcde: "net_error",
        //   rtnmsg: "网络异常"
        // }
        if (showLoading) {
          window.httpCount--;
          // toast
        }
        console.log(error);
        // let errMsg = {
        //   msgcde: "net_error",
        //   rtnmsg: "网络异常"
        // }
        if (window.httpCount === 0) {
          // loading end
        }
        // toast(errmsg)
        if (error) {
          reject(error);
        }
      });
  });
};

const POST = "post";

// 职位报名
export const enRoll = params => {
  return axiosRequest(POST, urlConstant.enRoll, params);
};

export const userLogin = params => {
  return axiosRequest(POST, urlConstant.userLogin, params);
};

export const applyList = params => {
  return axiosRequest(POST, urlConstant.applyList, params);
};

export const applyExam = params => {
  return axiosRequest(POST, urlConstant.applyExam, params);
};

export const queryCurrentDayClock = params => {
  return axiosRequest(POST, urlConstant.queryCurrentDayClock, params);
};

export const clockInOrSignOut = params => {
  return axiosRequest(POST, urlConstant.clockInOrSignOut, params);
};

export const getPayRoll = params => {
  return axiosRequest(POST, urlConstant.getPayRoll, params);
};

export const insertEnterprise = params => {
  return axiosRequest(POST, urlConstant.insertEnterprise, params);
};

export const insertEnterpriseDirector = params => {
  return axiosRequest(POST, urlConstant.insertEnterpriseDirector, params);
};

export const queryPosition = params => {
  return axiosRequest(POST, urlConstant.queryPosition, params);
};

export const positionInfo = params => {
  return axiosRequest(POST, urlConstant.positionInfo, params);
};

export const disRoll = params => {
  return axiosRequest(POST, urlConstant.disRoll, params);
};

export const enterpisePunchCardRecord = params => {
  return axiosRequest(POST, urlConstant.enterpisePunchCardRecord, params);
};

export const getWechatSign = params => {
  return axiosRequest(POST, urlConstant.getWechatSign, params);
};
