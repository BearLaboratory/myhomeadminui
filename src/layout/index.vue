<template>
  <el-container>
    <el-header class="main-header">
      <div class="main-header-logo-box"><span>MyHome</span></div>
      <div class="main-header-menu-box">
        <el-menu
          :default-active="firstActivePath"
          class="main-header-menu"
          mode="horizontal"
          background-color="#FFFFFF"
          text-color="#000000"
          active-text-color="#FFFFFF"
          router
        >
          <el-menu-item :index="menu.routerPath" v-for="menu in firstMenus" :key="menu.id"
                        @click="firstMenuClick(menu)">
            {{ menu.routerName }}
          </el-menu-item>
        </el-menu>
      </div>
      <div class="main-header-info">
        <div class="user-info-box">
          <div class="doc-box" @click="gotoDoc">
            <span>技术文档</span>
            <i class="el-icon-s-flag"></i>
          </div>
          <div class="user-name-box">{{ 123 }}</div>
          <el-avatar size="medium"
                     src="123"></el-avatar>

          <el-dropdown trigger="click" @command="doLogout">
              <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-school" command="logout">退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-header>

    <el-container>
      <el-aside :width="collapse?'64px':'200px'" class="sub-aside">
        <!--菜单-->
        <el-menu
          :default-active="lastActivePath"
          class="sub-aside-menu"
          background-color="#FFFFFF"
          text-color="#000000"
          active-text-color="#fff"
          :unique-opened="true"
          :collapse="collapse"
          router
          :collapse-transition="false"
        >
          <el-submenu :index="secondMenu.routerPath" v-for="secondMenu in secondMenus" :key="secondMenu.id">
            <template slot="title">
              <i :class="secondMenu.routerIcon"></i>
              <span>{{ secondMenu.routerName }}</span>
            </template>
            <el-menu-item :index="lastMenu.routerPath" v-for="lastMenu in secondMenu.children" :key="lastMenu.id"
                          @click="secondMenuClick(lastMenu)">
              <span slot="title">{{ lastMenu.routerName }}</span>
            </el-menu-item>
          </el-submenu>

          <!--            <div >-->
          <!--              <div v-if="secondMenu.children">-->

          <!--              </div>-->
          <!--              &lt;!&ndash;没有子菜单&ndash;&gt;-->
          <!--              <div v-else>-->
          <!--                <el-menu-item :index="lastMenu.routerPath" @click="secondMenuClick(lastMenu)"-->
          <!--                              v-for="lastMenu in secondMenu.children" :key="lastMenu.id">-->
          <!--                  <i class="el-icon-data-board"></i>-->
          <!--                  <span slot="title">{{ lastMenu.routerName }}</span>-->
          <!--                </el-menu-item>-->
          <!--              </div>-->
          <!--            </div>-->
        </el-menu>
      </el-aside>
      <el-main>
        <!--    面包屑导航    -->
        <div class="sub-header">
          <!--缩小-->
          <div>
            <i :class="collapse?'el-icon-s-unfold':'el-icon-s-fold'" style="font-size: 20px;cursor: pointer"
               @click="collapse=!collapse"></i>
          </div>
          <div class="sub-header-breadcrumb">
            <transition name="fade-transform" mode="out-in">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
              </el-breadcrumb>
            </transition>
          </div>
        </div>
        <!--  主view      -->
        <div class="main-view">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      collapse: false,
      firstActivePath: '',
      lastActivePath: '',
      firstMenus: [],
      secondMenus: []
    }
  },
  mounted () {
    // 加载sessionstorage中的用户信息及权限信息
    const parseObj = JSON.parse(window.sessionStorage.getItem('permissions'))
    console.log('加载------', parseObj)
    this.firstMenus = parseObj.menus
  },
  methods: {
    /**
     * 第一级菜单点击
     * @param menuData
     */
    firstMenuClick (menuData) {
      this.secondMenus = menuData.children
      this.firstActivePath = menuData.routerPath
    },
    secondMenuClick (lastMenuData) {
      this.lastActivePath = lastMenuData.routerPath
      // 存session
      window.sessionStorage.setItem('lastActivePath', lastMenuData.routerPath)
    },
    doLogout (command) {
      // 清空session
      window.sessionStorage.clear()
      // 重定向到登录页
      this.$router.push('/login')
    },
    gotoDoc () {
      window.location.href = 'https://myhome.dengyi.pro'
    }
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;

  .main-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .main-header-logo-box {
      font-size: 20px;
      font-weight: bold;
    }

    .main-header-menu-box {
      display: flex;
      justify-content: center;

      .main-header-menu {
        border: 0;
      }
    }

    .main-header-info {
      background-color: #FFFFFF;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .user-info-box {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .doc-box {
          margin-right: 20px;
          font-size: 14px;
          cursor: pointer;

          span {
            margin-right: 5px;
          }
        }

        .user-name-box {
          margin-right: 10px;
          font-size: 14px;
        }

        .el-dropdown {
          margin-left: 5px;
          margin-right: 10px;
        }

      }
    }

  }

  .sub-aside {
    background-color: #FFFFFF;

    .sub-aside-menu {
      border-right: 0;
    }

  }

  .el-main {
    background-color: #f6f8f9;
    padding: 0;

    .sub-header {
      height: 30px;
      padding: 0 10px;
      background-color: #f6f8f9;
      display: flex;
      align-items: center;

      .sub-header-breadcrumb {
        margin-left: 20px;
      }
    }

    .main-view {
      padding: 20px 10px;
      background-color: #f6f8f9;
    }

  }
}

.el-menu-item.is-active {
  background-color: #19be6b !important;
}

.el-menu-item:hover {
  background-color: #71d5a1 !important;
}
</style>
