import router from './router/index'
import store from './store'

// 定义一个用户未登录情况下可以访问的白名单
const whitelList = ['/login']

router.beforeEach((to, from, next) => {
  // 获取token
  const token = store.getters.token
  if (token) {
    if (to.path === '/login') {
      next(from.path)
    } else {
      next()
    }
  } else {
    if (whitelList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
