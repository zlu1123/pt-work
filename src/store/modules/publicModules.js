import { mutationsName, gettersName } from "../../common/constants";
import {
  handleRequestPromise,
  userLogin,
  getUserInfo,
  uploadImageUrl,
  getWechatSign
} from "../../service/api";
import { wechatConfig } from "../../plugins/wechatUtil";
export default {
  state: {
    keepAlivePath: ["homeIndex"],
    userInfo: {},
    locationInfo: {}, // 默认显示万科幸福里 {lng: 108.982758,lat: 34.327999}
    loading: false,
    personalInfo: {},
    wechatInfo: {}
  },
  mutations: {
    [mutationsName.setKeepAlivePath]: (state, data) => {
      if (state.keepAlivePath.findIndex(item => item === data) < 0) {
        state.keepAlivePath.push(data);
      }
    },
    [mutationsName.deleteKeepAlive]: (state, data) => {
      const index = state.keepAlivePath.findIndex(item => item === data);
      if (index >= 0) {
        state.keepAlivePath.splice(index, 1);
      }
    },
    [mutationsName.deleteAllKeepAlive]: (state, data) => {
      state.keepAlivePath = [];
    },
    [mutationsName.setUserInfo]: (state, data) => {
      state.userInfo = data;
    },
    [mutationsName.setLocationInfo]: (state, data) => {
      state.locationInfo = data;
    },
    showLoading: state => {
      state.loading = true;
    },
    hideLoading: state => {
      state.loading = false;
    },
    setPersonalInfo: (state, data) => {
      state.personalInfo = data;
    },
    setWechatInfo: (state, data) => {
      state.wechatInfo = data;
    }
  },
  actions: {
    async requestUserInfo({ commit, state }, params) {
      let userInfo = "";
      try {
        userInfo = await handleRequestPromise(userLogin, params);
      } catch (error) {
      } finally {
        if (userInfo && userInfo.retCode === "00000") {
          commit(mutationsName.setUserInfo, userInfo.data);
        }
      }
      return userInfo;
    },

    /**
     * 获取个人信息
     */
    async requestPersonalInfo({ commit, state }, params) {
      let info = "";
      try {
        info = await handleRequestPromise(getUserInfo, params);
      } catch (error) {
        console.log(error);
      } finally {
        commit("setPersonalInfo", info.data);
      }
      return info;
    },

    async uploadImagePublic({ commit, state }, file) {
      // new 一个FormData格式的参数
      let formListData = new FormData();
      if (!file.flag) {
        formListData.append("files", file.file);
        formListData.append("type", "postion");
      } else {
        file.file.formData.append("type", "postion");
        formListData = file.file.formData;
      }
      // 第二种
      for (var [a, b] of formListData.entries()) {
        console.log(a, b);
      }
      let config = {
        headers: {
          // 添加请求头
          "Content-Type": "multipart/form-data"
        }
      };
      let fileInfo = "";
      try {
        fileInfo = await handleRequestPromise(
          uploadImageUrl,
          formListData,
          false,
          config
        );
      } catch (e) {
        console.log(e);
      } finally {
      }
      return fileInfo;
    },

    async requestWechatInfo({ commit, state }) {
      let urlBase = location.href.split("#")[0]; // 获取当前url,不能带路由
      let data = "";
      try {
        data = await handleRequestPromise(getWechatSign, {
          url: urlBase
        });
      } catch (e) {}

      commit("setWechatInfo", data.data);
      wechatConfig(
        data.data.sign,
        data.data.nonceStr,
        data.data.timestamp,
        data.data.appId
      );
      return data.data.appId;
    }
  },
  getters: {
    [gettersName.getKeepAlivePath](state, getters) {
      return state.keepAlivePath;
    },

    [gettersName.getUserInfo](state, getters) {
      return state.userInfo;
    },

    getLocationInfo(state, getters) {
      return state.locationInfo;
    },

    getLoading(state, getters) {
      return state.loading;
    },

    getPersonalInfo(state, getters) {
      return state.personalInfo;
    },

    getWechatInfo(state, getters) {
      return state.wechatInfo;
    }
  }
};
