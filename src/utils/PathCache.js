/**
 * 保存激活的路径
 * @param type 1一级2最后一级
 * @param routerPath 路由标志
 */

export function saveActivePathFlag (type, routerPath) {
  if (type === 1) {
    window.sessionStorage.setItem('firstActivePath', routerPath)
  } else {
    window.sessionStorage.setItem('lastActivePath', routerPath)
  }
}

/**
 * 获取激活的标识
 * @param type
 * @returns {string}
 */
export function getActivePathFlag (type) {
  if (type === 1) {
    return window.sessionStorage.getItem('firstActivePath')
  } else {
    return window.sessionStorage.getItem('lastActivePath')
  }
}
