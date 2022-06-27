import request from '../utils/request'

const login = (data) => {
  return request({ url: '/sys/login', method: 'post', data })
}

export default {
  login
}
