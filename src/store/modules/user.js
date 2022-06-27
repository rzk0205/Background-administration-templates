import UserApi from '../../api/user'
import { setToken, getToken } from '../../utils/auth'
export default {
  namespaced: true,
  state: {
    token: getToken() || ''
  },
  getters: {},
  mutations: {
    setToken(state, token) {
      state.token = token
      setToken(token)
    }
  },
  actions: {
    async login({ commit }, payload) {
      const res = await UserApi.login(payload)
      if (res) {
        console.log(res)
        commit('setToken', res.data.data.token)
      }
      return res
    }
  },
  modules: {}
}
