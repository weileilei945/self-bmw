import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userInfo: null,
    ticket: localStorage.getItem("ticket") ? localStorage.getItem("ticket") : ''
  },
  getters:{
    userInfo: state => state.userInfo,
    ticket: state => state.ticket,
  },
  mutations: {
    setUserInfo(state, payload) {
      sessionStorage.setItem("userInfo", JSON.stringify(payload))
      state.userInfo = payload;
    },
    setTicket(state, payload) {
      localStorage.setItem("ticket", payload)
      state.ticket = payload;
    },
    loginOut(state) {
      state.userInfo = null;
      state.ticket = "";
      localStorage.clear();
      sessionStorage.clear();
    }
  }
})