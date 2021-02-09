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
        prop="name"
        label="产品名"
      >
      </el-table-column>
      <el-table-column
        align="center"
        label="类型">
        <template slot-scope="scope">
          {{
            scope.row.type == 1 ? '控制型' : scope.row.type == 2 ? '测量型' : scope.row.type == 3 ? '开关测量型' : scope.row.type == 4 ? '显示型' : '播放型'
          }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="subType"
        label="次类型">
        <template slot-scope="scope">
          {{
            scope.row.type == 1 && scope.row.subType == 1 ? '布尔型' : scope.row.type == 1 && scope.row.subType == 2 ? '比例型' : '模式型'
          }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="productKey"
        label="产品key">
      </el-table-column>
      <el-table-column
        align="center"
        prop="productSecret"
        label="产品secret">
      </el-table-column>
      <el-table-column
        align="center"
        prop="deviceCount"
        label="包含设备数">
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
    <el-dialog title="新增产品" :visible.sync="addDialogFormVisible">
      <!--form表单-->
      <el-form label-position="right" label-width="120px" :model="addData"
               ref="addDataForm">
        <el-form-item label="产品名称" prop="name">
          <el-input v-model="addData.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="产品类型" prop="type">
          <el-cascader
            v-model="addData.type"
            :options="cascaderOptions"
          ></el-cascader>
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
import { addProduct, productPage } from '@/api/product'

export default {
  name: 'ProductManage',
  data () {
    return {
      tableData: {},
      pageParam: {
        pageNumber: 1,
        pageSize: 10
      },
      pageData: {},
      addDialogFormVisible: false,
      addData: {},
      cascaderOptions: [
        {
          value: 1,
          label: '控制型产品',
          children: [
            {
              value: 1,
              label: '布尔型'
            },
            {
              value: 2,
              label: '比例型'

            },
            {
              value: 3,
              label: '模式型'

            }
          ]
        },
        {
          value: 2,
          label: '测量型产品',
          children: [
            {
              value: 1,
              label: '温湿度'

            },
            {
              value: 2,
              label: '空气质量'

            },
            {
              value: 3,
              label: '信标'

            }
          ]
        },
        {
          value: 3,
          label: '控制测量型产品',
          children: [
            {
              value: 1,
              label: '插座'

            }
          ]
        },
        {
          value: 4,
          label: '显示型产品',
          children: [
            {
              value: 1,
              label: '智能消息'

            }
          ]
        },
        {
          value: 5,
          label: '播放型产品',
          children: [
            {
              value: 1,
              label: '智能音箱'

            }
          ]
        }
      ]
    }
  },
  created () {
    this.loadPageData()
  },
  methods: {
    loadPageData () {
      productPage(this.pageParam).then(res => {
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
      this.addDialogFormVisible = true
      this.addData = {}
    },
    doAddData () {
      const typeArray = this.addData.type
      this.addData.type = typeArray[0]
      this.addData.subType = typeArray[1]
      addProduct(this.addData).then(res => {
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
