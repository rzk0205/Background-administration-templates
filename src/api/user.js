import request from '../utils/request'

const login = (data) => {
  return request({ url: '/sys/login', method: 'post', data })
}

const getUserInfo = () => {
  return request({ url: '/sys/profile', method: 'get' })
}

export default {
  login,
  getUserInfo
}
