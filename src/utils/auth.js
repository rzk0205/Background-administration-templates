// 设置token总名称
const TOKEN_KEY = 'token'

// 设置用户信息总名称
const USER_INFO_KEY = 'userInfo'

// 设置token
export function setToken(key, value) {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}

// 设置用户信息
export function setUserInfo(userInfo) {
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo))
}

// 获取token
export const getToken = (key) => {
  const data = localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}

// 获取用户信息
export function getUserInfo() {
  return JSON.parse(localStorage.getItem(USER_INFO_KEY) || null)
}

// 删除token与用户信息
export function removeItem() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_INFO_KEY)
}
