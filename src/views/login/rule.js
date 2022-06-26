export const validatePassword = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error('密码最少6位'))
  } else {
    callback()
  }
}
