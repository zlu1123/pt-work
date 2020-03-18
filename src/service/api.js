import { axiosRequest } from "../plugins/axios";
import * as urlConstant from "./urlConstant";
import store from "../store";

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
    // store.commit();
    store.commit("showLoading");
  }
  methods(params, headers)
    .then(response => {
      if (showLoading) {
        window.httpCount--;
      }
      if (window.httpCount === 0) {
        // loading end
        store.commit("hideLoading");
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
        store.commit("hideLoading");
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
    window.httpCount++;
    if (showLoading) {
      window.httpCount++;
    }
    if (window.httpCount > 0) {
      // loading start
      store.commit("showLoading");
    }
    methods(params, headers)
      .then(response => {
        if (showLoading) {
          window.httpCount--;
        }
        if (window.httpCount === 0) {
          // loading end
          store.commit("hideLoading");
        }

        let retCode = response.data.retCode;
        if (retCode !== undefined && retCode !== "00000") {
          if (showLoading) {
            response.data.msgcde = "访问错误";
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
          store.commit("hideLoading");
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

export const noticeAdPage = params => {
  return axiosRequest(POST, urlConstant.noticeAdPage, params);
};

export const getOpenId = params => {
  return axiosRequest(POST, urlConstant.getOpenId, params);
};

export const getUserInfo = params => {
  return axiosRequest(POST, urlConstant.getUserInfo, params);
};

export const updateUserInfoMath = params => {
  return axiosRequest(POST, urlConstant.updateUserInfoMath, params);
};

export const uploadImageUrl = params => {
  return axiosRequest(POST, urlConstant.uploadImageUrl, params);
};

export const queryBillInfo = params => {
  return axiosRequest(POST, urlConstant.queryBillInfo, params);
};

export const queryClockIn = params => {
  return axiosRequest(POST, urlConstant.queryClockIn, params);
};

export const payRollInfo = params => {
  return axiosRequest(POST, urlConstant.payRollInfo, params);
};

export const upLoadHealthCert = params => {
  return axiosRequest(POST, urlConstant.upLoadHealthCert, params);
};

export const usrIdtfyCert = params => {
  return axiosRequest(POST, urlConstant.usrIdtfyCert, params);
};

export const enterpiseRecharge = params => {
  return axiosRequest(POST, urlConstant.enterpiseRecharge, params);
};

export const enterpriseReleasePage = (params, headers) => {
  return axiosRequest(POST, urlConstant.enterpriseReleasePage, params, headers);
};

export const postionReleasePage = (params, headers) => {
  return axiosRequest(POST, urlConstant.postionReleasePage, params, headers);
};

export const cardAdd = (params, headers) => {
  return axiosRequest(POST, urlConstant.cardAdd, params);
};

export const cardQuery = (params, headers) => {
  return axiosRequest(POST, urlConstant.cardQuery, params);
};

export const rechargeCallBack = (params, headers) => {
  return axiosRequest(POST, urlConstant.rechargeCallBack, params);
};

export const examCardRecordList = (params, headers) => {
  return axiosRequest(POST, urlConstant.examCardRecordList, params);
};

export const userLoginOut = (params, headers) => {
  return axiosRequest(POST, urlConstant.userLoginOut, params);
};
