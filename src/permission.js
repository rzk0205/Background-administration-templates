import router from './router/index'
import store from './store'

// 定义一个用户未登录情况下可以访问的白名单
const whitelList = ['/login']

router.beforeEach(async (to, from, next) => {
  // 获取token
  const token = store.getters.token
  const userInfo = store.getters.userInfo
  if (token) {
    if (to.path === '/login') {
      next(from.path)
    } else {
      if (userInfo) {
        next()
      } else {
        const res = await store.dispatch('user/getUserInfo')
        if (res) {
          next()
        } else {
          next('/login')
        }
      }
    }
  } else {
    if (whitelList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
