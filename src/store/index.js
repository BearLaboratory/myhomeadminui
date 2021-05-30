import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    menuPermission: [],
    buttonPermission: []
  },
  mutations: {
    /**
     * 保存用户信息
     * @param store
     * @param userInfo
     */
    setUserInfo (store, userInfo) {
      store.userInfo = userInfo
    },
    /**
     * 保存菜单权限
     * @param store
     * @param menus
     */
    setMenuPermission (store, menus) {
      store.menuPermission = menus
    },
    /**
     * 保存按钮权限
     * @param store
     * @param buttons
     */
    setButtonPermission (store, buttons) {
      store.buttonPermission = buttons
    }
  },
  actions: {},
  modules: {}
})
