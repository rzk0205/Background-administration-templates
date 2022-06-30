import UserApi from '../../api/user'
import { setItem, getItem, removeItem } from '../../utils/storage'
export default {
  namespaced: true,
  state: {
    token: getItem('token') || '',
    userInfo: getItem('userInfo') || ''
  },
  getters: {},
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem('token', token)
    },
    setUserInfo(state, uesrInfo) {
      state.userInfo = uesrInfo
      setItem('userInfo', uesrInfo)
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
    },
    async getUserInfo({ commit }) {
      try {
        const res = await UserApi.getUserInfo()
        commit('setUserInfo', res)
        return res
      } catch (error) {
        console.log(error)
      }
    },
    logout({ commit }) {
      commit('setToken', '')
      commit('setUserInfo', '')
      removeItem('token')
      removeItem('userInfo')
    }
  },
  modules: {}
}
