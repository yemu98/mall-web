<template>
  <el-table :data="data" style="width: 100%">
    <el-table-column label="商品名" prop="name" align="center"></el-table-column>
    <el-table-column label="标题" prop="info" align="center"></el-table-column>
    <el-table-column label="品牌" prop="brand" align="center"></el-table-column>
    <el-table-column label="单价(元)" prop="price" align="center"></el-table-column>
    <el-table-column label="库存" prop="stock" align="center"></el-table-column>
    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-button size="mini" @click="edit(scope.row.id)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          v-if="scope.row.status=='false'"
          @click="pullOn(scope.row.id)"
        >上架</el-button>
        <el-button size="mini" type="danger" v-else @click="pullOff(scope.row.id)">下架</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'productTable',
  data () {
    return {
    }
  },
  props: {
    data: {
      type: [Object, Array],
      default: () => { }
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row);
    },
    handleDelete (index, row) {
      console.log(index, row);
    },
    reloadData () {
      this.$emit('reload')
    },
    pullOn (id) {
      this.$axios.patch('/product/' + id + '/pullOn')
        .then((res) => {
          this.$message({
            showClose: true,
            message: res.data.message,
            type: res.data.status == 200 ? 'success' : 'error'
          })
          this.$emit("reload")
        })
    },
    pullOff (id) {
      this.$axios.delete('/product/' + id)
        .then((res) => {
          this.$message({
            showClose: true,
            message: res.data.message,
            type: res.data.status == 200 ? 'success' : 'error'
          })
          this.$emit("reload")
        })
    },
    edit (id){
        this.$router.push({path:id+'/edit'});
    }
  }
}
</script>

<style scoped>
</style>