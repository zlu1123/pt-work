import {
  handleRequestPromise,
  enterpriseReleasePage,
  postionReleasePage
} from "../../service/api";
export default {
  state: {
    allMerchInfo: [],
    allPositionInfo: []
  },
  mutations: {
    setAllMerchInfo: (state, data) => {
      state.allMerchInfo = data;
    },
    setAllPositionInfo: (state, data) => {
      state.allPositionInfo = data;
    }
  },
  actions: {
    async requestAllMerchListInfo({ commit, state }, params) {
      let reqParam = {
        pageNum: "1",
        pageSize: "1000"
      };
      let userInfo = "";
      try {
        userInfo = await handleRequestPromise(
          enterpriseReleasePage,
          reqParam,
          true,
          { openId: "" }
        );
        if (Object.keys(userInfo).length > 0 && userInfo.retCode === "00000") {
          commit("setAllMerchInfo", userInfo.data.list);
        }
      } catch (error) {}
      return userInfo;
    },

    async requestAllPositionInfo({ commit, state }, params) {
      let reqParam = {
        merchId: params.merchId,
        pageNum: "1",
        pageSize: "1000"
      };
      let positionList = "";
      try {
        positionList = await handleRequestPromise(
          postionReleasePage,
          reqParam,
          true,
          { openId: "" }
        );
        if (
          Object.keys(positionList).length > 0 &&
          positionList.retCode === "00000"
        ) {
          commit("setAllPositionInfo", positionList.data.list);
        }
      } catch (error) {}
      return positionList;
    }
  },
  getters: {
    getAllMerchInfo(state, getters) {
      return state.allMerchInfo;
    },
    getTheMerchInfo: (state, getters) => merchId => {
      return getters.getAllMerchInfo.find(item => item.merchId === merchId);
    },
    getThePostionInfo: (state, getters) => postionId => {
      return state.allPositionInfo.find(item => item.postionId === postionId);
    }
  }
};
