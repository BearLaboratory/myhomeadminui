<template>
  <div>
    <div class="basic-info-box">
      <el-card body-style="padding:0px" style="max-width: 250px;min-width: 230px" shadow="hover"
               @click.native="gotoPath('gameManage')">
        <div class="count-item">
          <div class="item-icon-box" style="background-color: #FF0000;">
            <i class="el-icon-menu"></i>
          </div>
          <div class="count-item-content">
            <span>产品数量</span>
            <span class="count-number">{{ dashboardInfo.productCount }}</span>
          </div>
        </div>
      </el-card>
      <el-card body-style="padding:0px" style="max-width: 250px;min-width: 230px" shadow="hover">
        <div class="count-item">
          <div class="item-icon-box" style="background-color: #FFB700;">
            <i class="el-icon-more"></i>
          </div>
          <div class="count-item-content">
            <span>设备数量</span>
            <span class="count-number">{{ dashboardInfo.deviceCount }}</span>
          </div>
        </div>
      </el-card>
      <el-card body-style="padding:0px" style="max-width: 250px;min-width: 230px" shadow="hover"
               @click.native="gotoPath('orderManage')">
        <div class="count-item">
          <div class="item-icon-box" style="background-color: #67C23A;">
            <i class="el-icon-star-on"></i>
          </div>
          <div class="count-item-content">
            <span>在线设备数</span>
            <span class="count-number">{{ dashboardInfo.onlineDevCount }}</span>
          </div>
        </div>
      </el-card>
      <el-card body-style="padding:0px" style="max-width: 250px;min-width: 230px" shadow="hover"
               @click.native="gotoPath('userManage')">
        <div class="count-item">
          <div class="item-icon-box" style="background-color:#E6A23C;">
            <i class="el-icon-s-custom"></i>
          </div>
          <div class="count-item-content">
            <span>开发者数</span>
            <span class="count-number">{{ dashboardInfo.devCount }}</span>
          </div>
        </div>
      </el-card>
    </div>
    <!--图表-->
    <div>

    </div>

  </div>
</template>

<script>
import { getDashboardInfo } from '@/api/dashboard'

export default {
  name: 'DashBoard',
  data () {
    return {
      dashboardInfo: {}
    }
  },
  methods: {
    doGetDashboardInfo () {
      getDashboardInfo().then(res => {
        this.dashboardInfo = res.data
      })
    },
    gotoPath (pathName) {
      // 存session
      window.sessionStorage.setItem('activePath', pathName)
      // 跳页面
      this.$router.push(pathName)
    }
  },
  created () {
    this.doGetDashboardInfo()
  }
}
</script>

<style lang="scss" scoped>

.basic-info-box {
  padding-left: 30px;
  padding-right: 30px;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;

  .count-item {
    display: flex;
    align-items: center;

    .item-icon-box {
      background-color: #F56C6C;
      height: 100px;
      width: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-weight: bold;
      font-size: 50px;
    }

    .count-item-content {
      padding-left: 30px;
      font-size: 18px;
      font-weight: bold;
      color: #909399;
      display: flex;
      flex-direction: column;
      text-align: center;

      .count-number {
        margin-top: 8px;
        font-size: 22px;
        color: black;
      }

    }
  }

}

</style>
