<template>
  <div class='page-container'>
    <div class='table-header-box'>
      <div style='display: flex;align-items: center'>
        <el-input v-model='pageParam.name' size='mini' placeholder='请输入分类名' clearable />
        <el-button size='mini' type='primary' style='margin-left: 10px' icon='el-icon-search' @click='doPageQuery'>
          搜索
        </el-button>
      </div>
      <div class='header-option-box'>
        <el-button icon='el-icon-plus' type='warning' size='mini' @click='showAddDia'>添加分类</el-button>
      </div>
    </div>

    <el-table
      :data='pageResult.records'
      style='width: 100%;'
      height='650'
      :header-cell-style="{background: '#F6F8FB'}"
    >
      <el-table-column
        prop='id'
        label='ID'
        align='center'
        show-overflow-tooltip
      />
      <el-table-column
        prop='name'
        label='分类名'
        align='center'
      />
      <el-table-column
        prop='type'
        label='主类型'
        align='center'
        show-overflow-tooltip
      />
      <el-table-column
        prop='subType'
        label='子类型'
        align='center'
        show-overflow-tooltip
      />
      <el-table-column
        prop='dataFormat'
        label='通讯协议内容'
        width='300'
      >
        <template slot-scope='scope'>
          <json-viewer :value='JSON.parse(scope.row.dataFormat)' style='line-height: 18px;'></json-viewer>
        </template>
      </el-table-column>
      <el-table-column
        prop='createTime'
        label='创建时间'
        align='center'
        show-overflow-tooltip
      />
      <el-table-column
        prop='updateTime'
        label='更新时间'
        align='center'
        show-overflow-tooltip
      />
      <el-table-column
        width='180'
        label='操作'
        align='center'
      >
        <template slot-scope='scope'>
          <div style='display: flex;justify-content: center'>
            <el-button size='mini' type='warning' @click='showUpdate(scope.row)'>修改</el-button>
            <el-button size='mini' type='danger' @click='deleteCategory(scope.row)'>删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div v-if='pageResult.pages>1' class='pagination-box'>
      <el-pagination
        background
        layout='prev, pager, next'
        :total='pageResult.total'
        @current-change='pageNumberChange'
      />
    </div>

    <el-dialog title='新增/修改分类' :visible.sync='addDialogFormVisible'>
      <el-form
        ref='addForm'
        :model='newObj'
        status-icon
        :rules='rules'
        label-width='100px'
        class='demo-ruleForm'
      >
        <el-form-item label='分类名' prop='name'>
          <el-input v-model='newObj.name' autocomplete='off' />
        </el-form-item>
        <el-form-item label='主类型' prop='type'>
          <el-col :span='24'>
            <el-select v-model='newObj.type' placeholder='请选择' style='width: 100%'>
              <el-option
                label='控制型'
                :value='1'>
              </el-option>
              <el-option
                label='测量型'
                :value='2'>
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label='次类型' prop='subType'>
          <el-col :span='24'>
            <el-select v-model='newObj.subType' placeholder='请选择' style='width: 100%'>
              <el-option
                label='控制型'
                :value='1'>
              </el-option>
              <el-option
                label='测量型'
                :value='2'>
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label='通讯协议' prop='roleDesc'>
          <el-input
            v-model='newObj.dataFormat'
            type='textarea'
            :show-word-limit='true'
            placeholder='请输入通讯协议内容'
            maxlength='250'
            :rows='5'
          />
        </el-form-item>
      </el-form>
      <div slot='footer' class='dialog-footer'>
        <el-button @click='addDialogFormVisible = false'>取 消</el-button>
        <el-button type='primary' @click='saveOrUpdate'>保 存</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import { categoryAddOrUpdateApi, categoryPageApi, delCategoryApi } from '@/api/DeviceManage'

export default {
  name: 'CategoryManage',
  data() {
    return {
      pageResult: {},
      pageParam: {},
      newObj: {},
      addDialogFormVisible: false,
      rules: {}
    }
  },
  created() {
    this.doPageQuery()
  },
  methods: {
    doPageQuery() {
      categoryPageApi(this.pageParam).then(res => {
        console.log(res.data)
        this.pageResult = res.data
      })
    },
    showAddDia() {
      this.addDialogFormVisible = true
    },
    pageNumberChange(e) {
      this.pageParam.pageNumber = e
      this.doPageQuery()
    },
    saveOrUpdate() {
      this.newObj.dataFormat = JSON.stringify(this.newObj.dataFormat)
      categoryAddOrUpdateApi(this.newObj).then(res => {
        this.$message.success('操作成功')
        this.addDialogFormVisible = false
        this.doPageQuery()
      })
    },
    showUpdate(rowData) {
      console.log(rowData)
      this.newObj = rowData
      this.addDialogFormVisible = true
    },
    deleteCategory(rowData) {
      delCategoryApi(rowData).then(res => {
        this.$message.success('分类删除成功')
        this.doPageQuery()
      })
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
