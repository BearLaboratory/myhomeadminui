import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户token
    userToken: '',
    // 用户信息
    userInfo: {},
    // 菜单权限树
    menuPermission: [],
    // 按钮权限数组
    buttonPermission: [],
    // 第一级激活菜单标识
    firstActivePath: '',
    // 最后一级激活菜单标识
    lastActivePath: '',
    // 已经被选中的二级菜单
    secondMenus: [],
    // 侧边菜单是否收起
    collapse: false
  },
  mutations: {
    /**
     * 保存用户token
     * @param store
     * @param token
     */
    setUserToken(store, token) {
      store.userToken = token
      window.sessionStorage.setItem('userToken', token)
    },
    /**
     * 保存用户信息
     * @param store
     * @param userInfo
     */
    setUserInfo(store, userInfo) {
      store.userInfo = userInfo
    },
    /**
     * 保存菜单权限
     * @param store
     * @param menus
     */
    setMenuPermission(store, menus) {
      store.menuPermission = menus
    },
    /**
     * 保存按钮权限
     * @param store
     * @param buttons
     */
    setButtonPermission(store, buttons) {
      store.buttonPermission = buttons
    },
    setFirstActivePath(store, path) {
      store.firstActivePath = path
    },
    setLastActivePath(store, path) {
      store.lastActivePath = path
    },
    setSecondMenus(store, menus) {
      store.secondMenus = menus
    },
    setCollapse(state, flag) {
      state.collapse = flag
    }
  },
  actions: {},
  modules: {}
})
