import Vue from "vue";
import Vuex from "vuex";
import publicModules from "./modules/publicModules";
import merchInfoModules from "./modules/merchInfoModules";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    publicModules,
    merchInfoModules
  }
});
