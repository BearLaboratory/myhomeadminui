<template>
  <div class="main-container">
    <!--头部-->
    <div class="header-box">
      <div>
        <span style="font-size: 14px;color: #c8c9cc;margin-right: 5px">所属产品：</span>
        <el-select v-model="pageParam.productId" placeholder="请选择产品" clearable size="mini">
          <el-option
            v-for="item in productListData"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-button type="primary" size="mini" style="margin-left: 10px" @click="doConditionPage">查询</el-button>
      </div>
      <el-button type="primary" size="mini" @click="showAddDialog">新增设备</el-button>
    </div>
    <el-table
      :data="pageData.records"
      border
      style="width: 100%">
      <el-table-column
        align="center"
        prop="id"
        label="id"
        width="200">
      </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="设备名"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="productName"
        label="产品名">
      </el-table-column>
      <el-table-column
        align="center"
        prop="productKey"
        label="产品key">
      </el-table-column>
      <el-table-column
        align="center"
        prop="deviceSecret"
        label="设备secret">
      </el-table-column>
      <el-table-column
        align="center"
        prop="deviceCount"
        label="设备在线状态">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.online? 'success' : 'info'">{{ scope.row.online ? '在线' : '离线' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        show-tooltip-when-overflow
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        align="center"
        show-tooltip-when-overflow
        prop="updateTime"
        label="更新时间">
      </el-table-column>
    </el-table>

    <!--分页页脚-->
    <div class="pager-box" v-if="pageData.total>10">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="pageNumberChange"
        :total="pageData.total">
      </el-pagination>
    </div>
    <!--新增产品dialog-->
    <el-dialog title="新增设备" :visible.sync="addDialogFormVisible">
      <!--form表单-->
      <el-form label-position="right" label-width="120px" :model="addData"
               ref="addDataForm">
        <el-form-item label="选择产品" prop="name">
          <el-select v-model="addData.productId" placeholder="请选择产品" clearable>
            <el-option
              v-for="item in productListData"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备名称" prop="name">
          <el-input v-model="addData.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择图标" prop="name">
          <el-select v-model="addData.iconPath" placeholder="请选择图标" clearable>
            <el-option
              label="电灯"
              value="lamp">
              <div style="display: flex;align-items: center;justify-content: space-between">
                <span style="float: left">电灯</span>
                <img src="../../assets/deviceicon/lamp.png" height="30" width="30"/>
              </div>
            </el-option>
            <el-option
              label="窗帘"
              value="curtain">
              <div style="display: flex;align-items: center;justify-content: space-between">
                <span style="float: left">窗帘</span>
                <img src="../../assets/deviceicon/curtain.png" height="30" width="30"/>
              </div>
            </el-option>
            <el-option
              label="窗"
              value="window">
              <div style="display: flex;align-items: center;justify-content: space-between">
                <span style="float: left">窗</span>
                <img src="../../assets/deviceicon/window.png" height="30" width="30"/>
              </div>
            </el-option>
            <el-option
              label="温度计"
              value="temp">
              <div style="display: flex;align-items: center;justify-content: space-between">
                <span style="float: left">温度计</span>
                <img src="../../assets/deviceicon/temp.png" height="30" width="30"/>
              </div>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="unShowAndClear">取 消</el-button>
        <el-button type="primary" @click="doAddData">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { productList } from '@/api/product'
import { addDevice, devicePage } from '@/api/device'
import { getUserInfo } from '@/utils/UserInfoUtil'

export default {
  name: 'DroductManage',
  data () {
    return {
      tableData: {},
      pageParam: {
        pageNumber: 1,
        pageSize: 10,
        devUserId: '',
        productId: ''
      },
      pageData: {},
      addDialogFormVisible: false,
      addData: {},
      productListData: []
    }
  },
  created () {
    this.loadPageData()
    this.loadProductList()
  },
  methods: {
    loadPageData () {
      this.pageParam.devUserId = getUserInfo().id
      devicePage(this.pageParam).then(res => {
        this.pageData = res.data
      })
    },
    loadProductList () {
      productList().then(res => {
        this.productListData = res.data
      })
    },
    /**
     * 页码改变
     * @param e 页码
     */
    pageNumberChange (e) {
      this.pageParam.pageNumber = e
      this.loadPageData()
    },
    showAddDialog () {
      this.addDialogFormVisible = true
    },
    unShowAndClear () {
      this.addDialogFormVisible = true
      this.addData = {}
    },
    doAddData () {
      addDevice(this.addData).then(res => {
        if (res.status) {
          this.addDialogFormVisible = false
          this.addData = {}
          this.loadPageData()
        }
      })
    },
    doConditionPage () {
      this.loadPageData()
    }
  }
}
</script>

<style lang="scss" scoped>

.main-container {
  margin: 20px;
  background-color: #FFFFFF;
  padding: 20px;

  .header-box {
    display: flex;
    margin-bottom: 10px;
    justify-content: space-between;
  }

  .pager-box {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}

</style>
