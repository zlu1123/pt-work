import { mutationsName, gettersName } from "../common/constants"
export default {
  state: {
    keepAlivePath: []
  },
  mutations: {
    [mutationsName.setKeepAlivePath]: (state, data) => {
      if (!state.keepAlivePath.includes(data)) {
        state.keepAlivePath.push(data);
      }
    }
  },
  actions: {
  },
  getter: {
    [gettersName.getKeepAlivePath]: (state, getters) => {
      return state.keepAlivePath;
    }
  }
}
