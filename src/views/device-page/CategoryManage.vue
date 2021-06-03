<template>
  <div class="device-container">
    <div class="table-header-box">
      <div style="display: flex;align-items: center">
        <el-input v-model="pageParam.roleName" size="mini" placeholder="请输入角色名称" clearable/>
        <el-button size="mini" type="primary" style="margin-left: 10px" icon="el-icon-search" @click="conditionPage">
          搜索
        </el-button>
      </div>
      <div class="header-option-box">
        <el-button icon="el-icon-plus" type="warning" size="mini" @click="showAddDia">添加角色</el-button>
      </div>
    </div>

    <el-table
      :data="pageResult.records"
      style="width: 100%;"
      height="650"
      :header-cell-style="{background: '#F6F8FB'}"
    >
      <el-table-column
        prop="id"
        label="ID"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        prop="roleName"
        label="角色名"
        align="center"
      />
      <el-table-column
        prop="roleDesc"
        label="角色描述"
        align="center"
        width="300"
        show-overflow-tooltip
      />
      <el-table-column
        prop="createTime"
        label="创建时间"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        prop="updateTime"
        label="更新时间"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        width="180"
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <div style="display: flex;justify-content: center">
            <el-button size="mini" type="warning" @click="showUpdate(scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="delPermission(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div v-if="pageResult.pages>1" class="pagination-box">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="pageResult.total"
        @current-change="pageNumberChange"
      />
    </div>

    <el-dialog title="新增/修改角色" :visible.sync="addDialogFormVisible">
      <el-form
        ref="addForm"
        :model="newObj"
        status-icon
        :rules="addRules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="newObj.roleName" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input
            v-model="newObj.roleDesc"
            type="textarea"
            :show-word-limit="true"
            placeholder="请将角色所拥有的权限详细描述"
            maxlength="250"
            :rows="5"
          />
        </el-form-item>

        <el-form-item label="角色权限">
          <el-tree
            ref="tree"
            :data="permissionTree"
            show-checkbox
            :default-expand-all="false"
            node-key="id"
            highlight-current
            :props="defaultProps"
          />
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdateRole">保 存</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
export default {
  name: 'CategoryManage'
}
</script>

<style scoped>

</style>
