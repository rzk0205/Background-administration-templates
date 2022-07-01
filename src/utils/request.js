// 引入axios
import axios from 'axios'

// 引入md5
import md5 from 'md5'

// 引入loading
import loading from './loading'
// 引入store
import store from '../store'

import router from '../router'
import { ElMessage } from 'element-plus'
// 引入时间戳判断
import { isCheckTimeout } from './auth'
// 创建一个实例
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 // 超时时间
})

// 请求拦截
instance.interceptors.request.use(
  (config) => {
    // 开启loading加载
    loading.open()

    const { icode, time } = getTestICode()
    config.headers.icode = icode
    config.headers.codeType = time
    // console.log('拦截成功')
    const token = store.getters.token
    if (token) config.headers.authorization = 'Bearer ' + token
    if (token) {
      if (isCheckTimeout()) {
        store.dispatch('user/logout')
        router.push('/login')
        return Promise.reject(new Error('token 失效'))
      }
    }
    return config
  },
  (err) => {
    loading.close()
    return Promise.reject(err)
  }
)

// 响应拦截
instance.interceptors.response.use(
  (res) => {
    // 关闭loading加载
    loading.close()
    // console.log(res) // 后端响应的数据
    const { data, message, success } = res.data
    // TODO 全局相应处理
    if (success) {
      return data
    } else {
      _showError(message)
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    // 关闭loading加载
    loading.close()
    console.log(error)
    // TODO token过期状态  401 描述信息  无感知登录 无感知刷新
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      store.dispatch('user/lgout')
      router.push('/login')
    }
    // 响应失败进行信息处理
    _showError(error.message)
    return Promise.reject(error)
  }
)
// 响应提示信息
const _showError = (message) => {
  const info = message || '发生未知错误'
  ElMessage.error(info)
}
// 封装 处理get请求方式的参数问题
function request(options) {
  options.method = options.method || 'get'
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data
  }
  return instance(options)
}

// 获取icode
function getTestICode() {
  const now = parseInt(Date.now() / 1000)
  const code = now + 'LGD_Sunday-1991'
  return {
    icode: md5(code),
    time: now
  }
}
export default request
