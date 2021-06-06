<template>
  <div>
    <el-row class='search-box'>
      <el-col :span='24'>
        <div class='table-header-box'>
          <div style='display: flex;align-items: center'>
            <el-row :gutter='10'>
              <el-col :span='6'>
                <el-input v-model='pageParam.name' size='mini' placeholder='请输入设备名' clearable />
              </el-col>
              <el-col :span='6'>
                <el-select v-model='pageParam.online' placeholder='请选择在线状态' size='mini' clearable>
                  <el-option label='在线' :value='true'></el-option>
                  <el-option label='离线' :value='false' disabled></el-option>
                </el-select>
              </el-col>
              <el-col :span='6'>
                <el-select v-model='pageParam.publish' placeholder='请选择发布状态' size='mini' clearable>
                  <el-option label='已发布' :value='true' disabled></el-option>
                  <el-option label='未发布' :value='false'></el-option>
                </el-select>
              </el-col>
              <el-col :span='6'>
                <el-button
                  size='mini'
                  type='primary'
                  style='margin-left: 10px'
                  icon='el-icon-search'
                  @click='doPageQuery'>
                  搜索
                </el-button>
              </el-col>
            </el-row>

          </div>
        </div>
        <el-table
          ref='singleTable'
          :data='pageResult.records'
          style='width: 100%;'
          :header-cell-style="{background: '#F6F8FB'}"
          size='mini'
          highlight-current-row
          @row-click='handRowClick'
        >
          <el-table-column
            type='selection'
            width='55'>
          </el-table-column>
          <el-table-column
            prop='id'
            label='ID'
            width='180'
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
        </el-table>
      </el-col>
    </el-row>
    <el-row :gutter='20' class='debug-box'>
      <el-col :span='12'>
        <div>
          <span>标准控制报文</span>
        </div>
        <div class='sample-box'>
          <json-viewer
            :value='clickRowData.dataFormat?clickRowData.dataFormat:{}'
            style='line-height: 18px;'></json-viewer>
        </div>
      </el-col>
      <el-col :span='12'>
        <div>
          <span>下发控制报文</span>
        </div>
        <div class='sample-box'>123</div>
        <div>
          <el-button type='success'>下发命令</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { devicePageApi } from '@/api/DeviceManage'

export default {
  name: 'DeviceDebug',
  data() {
    return {
      pageResult: {},
      pageParam: {
        pageSize: 5
      },
      newObj: {},
      addDialogFormVisible: false,
      rules: {},
      clickRowData: {}
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
    pageNumberChange(e) {
      this.pageParam.pageNumber = e
      this.doPageQuery()
    },
    handRowClick(rowData) {
      this.clickRowData = rowData
      console.log(rowData)
    }
  }
}
</script>

<style lang='scss' scoped>

.search-box {
  background-color: #FFFFFF;
  padding: 0 10px;
}

.debug-box {
  margin-top: 20px;

  .sample-box {
    background-color: #FFFFFF;
    height: 200px;
  }
}

</style>
