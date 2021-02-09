<template>
  <el-container>
    <el-aside :width="collapse?'64px':'200px'">
      <!--菜单头-->
      <el-header v-if="!collapse">
        <div style="margin-left: 0px">
          <span>MyHome</span>
        </div>
      </el-header>
      <el-header v-if="collapse" style="padding: 5px">
        <img src="../../public/myhomelogo.png" height="50px" width="50px">
      </el-header>
      <!--菜单-->
      <el-menu
        :default-active="activePath"
        class="el-menu-vertical"
        background-color="rgb(40, 44, 52)"
        text-color="#fff"
        active-text-color="#fff"
        router
        :unique-opened="true"
        :collapse="collapse"
        :collapse-transition="false"
      >

        <!--仪表-->
        <el-menu-item index="dashBoard" @click="savePath('dashBoard')">
          <i class="el-icon-data-board"></i>
          <span slot="title">仪表台</span>
        </el-menu-item>
        <!--产品管理-->
        <el-menu-item index="productManage" @click="savePath('productManage')" v-if="!userInfo.isDev">
          <i class="el-icon-menu"></i>
          <span slot="title">产品管理</span>
        </el-menu-item>
        <el-menu-item index="deviceManage" @click="savePath('deviceManage')">
          <i class="el-icon-shopping-bag-1"></i>
          <span slot="title">设备管理</span>
        </el-menu-item>
        <!--app版本-->
        <el-menu-item index="appVersionManage" @click="savePath('appVersionManage')" v-if="!userInfo.isDev">
          <i class="el-icon-menu"></i>
          <span slot="title">APP版本</span>
        </el-menu-item>
        <el-menu-item index="systemManage" @click="savePath('systemManage')">
          <i class="el-icon-s-home"></i>
          <span slot="title">基础设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="main-header-box">
        <!--缩小-->
        <i :class="collapse?'el-icon-s-unfold':'el-icon-s-fold'" style="font-size: 20px;cursor: pointer"
           @click="collapse=!collapse"></i>
        <div class="user-info-box">
          <div class="doc-box" @click="gotoDoc">
            <span>文档</span>
            <i class="el-icon-s-flag"></i>
          </div>
          <div class="user-name-box">{{ userInfo.name }}</div>
          <el-avatar size="medium"
                     :src="userInfo.avatar"></el-avatar>
          <el-dropdown trigger="click" @command="doLogout">
              <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-school" command="logout">退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getUserInfo } from '@/utils/UserInfoUtil'

export default {
  name: 'Layout',
  data () {
    return {

      activePath: 'dashBoard',
      imgUrl: '../../public/myhomelogo.png',
      collapse: false,
      userInfo: {}
    }
  },
  mounted () {
    this.userInfo = getUserInfo()
  },
  methods: {
    savePath (pathName) {
      this.activePath = pathName
      // 存session
      window.sessionStorage.setItem('activePath', pathName)
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
  },
  created () {
    this.activePath = window.sessionStorage.getItem('activePath')
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;

  .el-aside {
    background-color: rgb(40, 44, 52);

    .el-header {
      font-size: 22px;
      font-weight: bold;
      color: #FFFFFF;
      background-color: rgb(40, 44, 52);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .el-menu-vertical {
      border-right: 0;
    }
  }

  .main-header-box {
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

  .el-main {
    background-color: #f6f8f9;
    padding: 10px;
    height: 100%;

  }
}

.el-menu-item.is-active {
  background-color: #1890FF !important;
}

.el-menu-item:hover {
  background-color: #1890FF !important;
}

</style>
