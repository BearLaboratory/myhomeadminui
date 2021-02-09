<template>
  <div class="main-container">
    <!--头部-->
    <div class="header-box">
      <el-button type="primary" size="mini" @click="showAddDialog">新增产品</el-button>
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
        prop="version"
        label="版本号"
      >
      </el-table-column>
      <el-table-column
        show-tooltip-when-overflow
        align="center"
        prop="wgtUrl"
        label="下载地址"
      >
      </el-table-column>
      <el-table-column
        align="center"
        show-tooltip-when-overflow
        prop="createTime"
        label="发布时间">
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
    <el-dialog title="新增版本" :visible.sync="addDialogFormVisible">
      <!--form表单-->
      <el-form label-position="right" label-width="120px" :model="addData"
               ref="addDataForm">
        <el-form-item label="版本号" prop="version">
          <el-input v-model="addData.version" autocomplete="off" placeholder="大版本和小版本必须区分好，例如：1.0.0"></el-input>
        </el-form-item>
        <el-form-item label="下载地址" prop="type">
          <el-input v-model="addData.wgtUrl" autocomplete="off" placeholder="下载地址"></el-input>
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
import { addAppVersion, appVersionPage } from '@/api/appversion'

export default {
  name: 'appVersionManage',
  data () {
    return {
      tableData: {},
      pageParam: {
        pageNumber: 1,
        pageSize: 10
      },
      pageData: {},
      addDialogFormVisible: false,
      addData: {}
    }
  },
  created () {
    this.loadPageData()
  },
  methods: {
    loadPageData () {
      appVersionPage(this.pageParam).then(res => {
        this.pageData = res.data
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
      this.addDialogFormVisible = false
      this.addData = {}
    },
    doAddData () {
      addAppVersion(this.addData).then(res => {
        if (res.status) {
          this.addDialogFormVisible = false
          this.addData = {}
          this.loadPageData()
        }
      })
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
    justify-content: flex-end;
  }

  .pager-box {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}

</style>
