import { handleRequestPromise, cardQuery } from "../../service/api";
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
    }
  }
};
