import UserApi from '../../api/user'
import { setToken, getToken } from '../../utils/auth'
export default {
  namespaced: true,
  state: {
    token: getToken('token') || ''
  },
  getters: {},
  mutations: {
    setToken(state, token) {
      state.token = token
      setToken('token', token)
    }
  },
  actions: {
    async login({ commit }, payload) {
      try {
        const res = await UserApi.login(payload)
        commit('setToken', res.token)
        return res
      } catch (err) {
        console.log(err)
      }
    }
  },
  modules: {}
}
