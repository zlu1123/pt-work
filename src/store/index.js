import Vue from 'vue'
import Vuex from 'vuex'
import publicModules from "./modules/publicModules";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    publicModules
  }
})
