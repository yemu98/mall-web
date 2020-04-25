<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="id" prop="id" align="center"></el-table-column>
    <el-table-column label="目标链接" prop="link" align="center">
      <template slot-scope="scope">
        <el-link :href="scope.row.link">{{scope.row.link}}</el-link>
      </template>
    </el-table-column>
    <el-table-column label="图片" prop="imgUrl" align="center">
      <template slot-scope="scope">
        <el-image :src="scope.row.imgUrl"></el-image>
      </template>
    </el-table-column>
    <el-table-column label="描述" prop="info" align="center"></el-table-column>
    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-button size="mini" @click="edit(scope.row.id)">编辑</el-button>
        <el-button type="danger" size="mini" @click="deleteCarousel(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'carouselTable',
  data () {
    return {
    }
  },
  props: {
    tableData: {
      type: [Object, Array],
      default: () => { }
    }
  },
  methods: {
    reloadData () {
      this.$emit('reload')
    },
    edit (id) {
      this.$router.push({ path: id + '/edit' });
    },
    deleteCarousel (id) {
      this.$axios.delete("/carousel/" + id)
        .then((res) => {
          this.$message({
            showClose: true,
            message: res.data.message,
            type: 'success'
          })
          this.reloadData()
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: err.response.data.message,
            type: 'error'
          })
          this.reloadData()
        })
    }
  }
}
</script>

<style scoped>
</style>