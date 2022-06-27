// 引入axios
import axios from 'axios'

// 引入md5
import md5 from 'md5'

// 引入loading
import loading from './loading'
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

    // const token = store.state.token
    // if (token) {
    //     config.headers.authorization = "Bearer " + token
    // }
    const { icode, time } = getTestICode()
    config.headers.icode = icode
    config.headers.codeType = time
    console.log('拦截成功')
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
    console.log(res) // 后端响应的数据
    return res
  },
  (err) => {
    // 关闭loading加载
    loading.close()
    return Promise.reject(err)
  }
)

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
