<template>
  <div class='page-container'>
    123
  </div>

</template>

<script>
import { categoryAddOrUpdateApi, categoryPageApi } from '@/api/DeviceManage'

export default {
  name: 'DeviceDebug',
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
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
