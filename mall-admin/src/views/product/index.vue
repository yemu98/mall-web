<template>
  <div>
    <el-input
      v-model="search"
      prefix-icon="el-icon-search"
      placeholder="搜索"
      @keyup.enter.native="getData(1,pageSize)"
    ></el-input>
    <productTable :data="tableData" @reload="reload()"></productTable>
    <el-row type="flex" class="pagination_wrap">
      <el-pagination
        layout="prev, pager, next"
        background
        :page-size="pageSize"
        :total="total"
        :current-page.sync="currentPage"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </el-row>
  </div>
</template>

<script>
import productTable from './components/table'
export default {
  name: 'productmgt',
  data () {
    return {
      search: '',
      tableData: [],
      total: 5,
      pageSize: 5,
      pageNo: 1,
      currentPage: 1,
    }
  },
  components: {
    productTable: productTable
  },
  computed: {
  },
  created () {
    this.getData(1, 5)
  },
  methods: {
    getData (pageNo, pageSize) {
      this.$axios.get('/product?search='+this.search, {
        params: {
          'pageNo': pageNo,
          'pageSize': pageSize
        }
      })
        .then((res) => {
          this.tableData = res.data.data.records
          this.total = res.data.data.total
        })
    },
    reload () {
      this.loading = true
      this.getData(this.pageNo, this.pageSize)
    },
    handleCurrentChange (val) {
      this.loading = true
      this.pageNo = val
      this.getData(val, this.pageSize)

    },
  },
}
</script>

<style scoped>
.pagination_wrap {
  justify-content: center;
}
</style>