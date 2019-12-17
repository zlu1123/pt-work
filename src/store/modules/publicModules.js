import { mutationsName, gettersName } from "../../common/constants"
export default {
  state: {
    keepAlivePath: ["homeIndex"]
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
    }
  },
  actions: {
  },
  getters: {
    [gettersName.getKeepAlivePath](state, getters) {
      return state.keepAlivePath;
    }
  }
}
