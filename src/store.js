import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  accountInfo: {}
};
const getters = {
  accountInfo(state) {
    if (Object.keys(state.accountInfo).length === 0 && sessionStorage.accountInfo !== undefined) {
      state.accountInfo = JSON.parse(sessionStorage.accountInfo);
    }
    return state.accountInfo;
  },
};
const mutations = {
  accountInfo(state, accountInfo) {
    state.accountInfo = accountInfo;
    sessionStorage.accountInfo = JSON.stringify(accountInfo);
  },
};


export default new Vuex.Store({
  state,
  mutations,
  getters
});
