<template>
  <div>
    <el-button @click="addAddress">新建</el-button>
    <el-table
      v-loading="loading"
      ref="multipleTable"
      :data="addressData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      row-key="id"
    >
      <el-table-column type="selection" width="100"></el-table-column>
      <el-table-column label="收件人" prop="name"></el-table-column>
      <el-table-column label="手机号" prop="phone"></el-table-column>
      <el-table-column prop="address" label="地址" align="center"></el-table-column>
      <el-table-column align="center" prop="visible" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" style="margin:5px">编辑</el-button>
          <el-popover placement="top" width="160" v-model="scope.row.visible">
            <p>确定删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="close(scope)">取消</el-button>
              <el-button
                type="danger"
                size="mini"
                @click="close(scope);handleDelete(scope.$index)"
              >确定</el-button>
            </div>
            <el-button slot="reference" size="mini" type="danger">删除</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  // address好像是个关键字，使用address做组件名就会报错
  name: 'addressTable',
  data () {
    return {
      loading: true,
      addressData: [
      ],
    }
  },
  created () {
    this.get()
  },
  methods: {
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange (val) {
      this.selection = val;
    },
    handleDelete (index) {
      let id = this.addressData[index].id
      this.$axios.delete('/address/' + id)
        .then((res) => {
          this.addressData.splice(index, 1)
          this.$message({
            showClose: true,
            message: res.data.message,
            type: 'success'
          })
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: err.data.message,
            type: 'error'
          })
        })
    },
    handleClick (scope) {
      console.log(scope)
    },
    addAddress () {
      this.$router.push('/address/add')
    },
    get () {
      this.$axios.get('/address')
        .then((res) => {
          this.addressData = res.data.data.addressList
          this.loading = false
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: err,
            type: 'error'
          })
          this.loading = false
        })
    },
    update () {

    },
    close (scope) {
      // 给这一行的数据添加visible属性触发视图更新，用来关闭popover
      this.$set(scope.row, 'visible', false)
      // 一种关闭popover简单粗暴的方法
      // document.querySelector("#app").click()
    }
  }
}
</script>

<style scoped>

</style>