import {
  handleRequestPromise,
  cardQuery,
  cardAdd,
  rechargeCallBack
} from "../../service/api";
export default {
  state: {
    bandCard: []
  },
  getters: {
    getBandCardList: state => {
      return state.bandCard;
    }
  },
  mutations: {
    setBandCard(state, data) {
      state.bandCard = data;
    }
  },
  actions: {
    async requestBankList({ commit, state }) {
      let bankInfo = "";
      try {
        bankInfo = await handleRequestPromise(cardQuery);
        if (Object.keys(bankInfo).length > 0 && bankInfo.retCode === "00000") {
          commit("setBandCard", bankInfo.data.list);
        }
      } catch (error) {}
    },
    async addBankCard({ commit, state, dispatch }, param) {
      let cardInfo = "";
      try {
        cardInfo = await handleRequestPromise(cardAdd, param);
        if (cardInfo && cardInfo.retCode === "00000") {
          await dispatch("requestBankList");
        }
      } catch (error) {}
      return cardInfo;
    },
    /**
     * 支付完成回调
     */
    async addRechargeCallBack({ commit, state }, param) {
      let result = "";
      try {
        result = await handleRequestPromise(rechargeCallBack, param);
      } catch (e) {
      } finally {
      }
      return result;
    }
  }
};
