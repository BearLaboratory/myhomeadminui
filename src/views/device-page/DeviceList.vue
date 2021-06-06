<template>
  <div class='page-container'>
    <div class='table-header-box'>
      <div style='display: flex;align-items: center'>
        <el-row :gutter='10'>
          <el-col :span='6'>
            <el-input v-model='pageParam.roleName' size='mini' placeholder='请输入设备名' clearable />
          </el-col>
          <el-col :span='6'>
            <el-select v-model='pageParam.online' placeholder='请选择在线状态' size='mini'>
              <el-option label='在线' :value='true'></el-option>
              <el-option label='离线' :value='false'></el-option>
            </el-select>
          </el-col>
          <el-col :span='6'>
            <el-select v-model='pageParam.publish' placeholder='请选择发布状态' size='mini'>
              <el-option label='已发布' :value='true'></el-option>
              <el-option label='未发布' :value='false'></el-option>
            </el-select>
          </el-col>
          <el-col :span='6'>
            <el-button size='mini' type='primary' style='margin-left: 10px' icon='el-icon-search' @click='doPageQuery'>
              搜索
            </el-button>
          </el-col>
        </el-row>

      </div>
      <div class='header-option-box'>
        <el-button icon='el-icon-plus' type='warning' size='mini' @click='showAddDia'>添加设备</el-button>
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
        label='设备名'
        align='center'
      />
      <el-table-column
        label='在线'
        align='center'
        show-overflow-tooltip
      >
        <template slot-scope='scope'>
          <el-tag :type="scope.row.online?'success':'warning' " effect='dark'>{{ scope.row.online ? '在线' : '离线' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop='type'
        label='主类型'
        align='center'
        show-overflow-tooltip
      />
      <el-table-column
        prop='deviceSecret'
        label='secret'
        align='center'
        width='300'
        show-overflow-tooltip
      />
      <el-table-column
        prop='createTime'
        label='是否发布'
        align='center'
        show-overflow-tooltip
      >
        <template slot-scope='scope'>
          <el-tag :type="scope.row.publish?'success':'warning' " effect='dark'>{{
              scope.row.publish ? '已发布' : '未发布'
            }}
          </el-tag>
        </template>
      </el-table-column>
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
            <el-button size='mini' type='warning' v-if='!scope.row.publish' @click='publishDevice(scope.row)'>发布
            </el-button>
            <el-button size='mini' type='warning' v-if='!scope.row.publish' @click='showUpdate(scope.row)'>修改
            </el-button>
            <el-button size='mini' type='danger' v-if='!scope.row.publish' @click='delPermission(scope.row)'>删除
            </el-button>
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
import { categoryAddOrUpdateApi, devicePageApi, publishDeviceApi } from '@/api/DeviceManage'

export default {
  name: 'DeviceList',
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
      devicePageApi(this.pageParam).then(res => {
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
    publishDevice(rowData) {
      publishDeviceApi(rowData).then(res => {
        this.$message.success('发布设备成功')
        this.doPageQuery()
      })
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
