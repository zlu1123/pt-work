import {
  mutationsName,
  gettersName,
  actionsName
} from "../../common/constants";
import { handleRequestPromise, userLogin } from "../../service/api";
export default {
  state: {
    keepAlivePath: ["homeIndex"],
    userInfo: {},
    locationInfo: {
      lng: 108.982758,
      lat: 34.327999
    } // 默认显示万科幸福里
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
    }
  },
  actions: {
    async [actionsName.requestUserInfo]({ commit, state }) {
      let userInfo = "";
      try {
        userInfo = await handleRequestPromise(userLogin);
      } catch (error) {
      } finally {
        commit(mutationsName.setUserInfo, userInfo.data);
      }
      return userInfo;
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
    }
  }
};
