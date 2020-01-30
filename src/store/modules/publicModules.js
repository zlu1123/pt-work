import { mutationsName, gettersName } from "../../common/constants";
import {
  handleRequestPromise,
  userLogin,
  getUserInfo,
  uploadImageUrl
} from "../../service/api";
export default {
  state: {
    keepAlivePath: ["homeIndex"],
    userInfo: {},
    locationInfo: {
      lng: 108.982758,
      lat: 34.327999
    }, // 默认显示万科幸福里
    loading: false,
    personalInfo: {}
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
    }
  },
  actions: {
    async requestUserInfo({ commit, state }, params) {
      let userInfo = "";
      try {
        userInfo = await handleRequestPromise(userLogin, params);
      } catch (error) {
      } finally {
        commit(mutationsName.setUserInfo, userInfo.data);
        sessionStorage.setItem("userInfo", userInfo.data);
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
      formListData.append("files", file.file);
      formListData.append("type", "postion");
      let config = {
        headers: {
          // 添加请求头
          "Content-Type": "multipart/form-data"
        }
      };
      let fileInfo = await handleRequestPromise(
        uploadImageUrl,
        formListData,
        false,
        config
      );
      return fileInfo;
    }
  },
  getters: {
    [gettersName.getKeepAlivePath](state, getters) {
      return state.keepAlivePath;
    },

    [gettersName.getUserInfo](state, getters) {
      return state.userInfo;
    },

    [gettersName.getLocationInfo](state, getters) {
      return state.locationInfo;
    },

    getLoading(state, getters) {
      return state.loading;
    },

    getPersonalInfo(state, getters) {
      return state.personalInfo;
    }
  }
};
