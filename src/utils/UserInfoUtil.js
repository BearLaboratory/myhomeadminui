const TokenKey = 'userInfo'

export function getUserInfo () {
  return JSON.parse(window.sessionStorage.getItem(TokenKey))
}

export function setUserInfo (userInfo) {
  window.sessionStorage.setItem(TokenKey, JSON.stringify(userInfo))
}

export function removeUserInfo () {
  return window.sessionStorage.removeItem(TokenKey)
}
