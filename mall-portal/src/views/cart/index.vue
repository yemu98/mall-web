<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="cartData"
      tooltip-effect="dark"
      show-summary
      :summary-method="getSummaries"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="100"></el-table-column>
      <el-table-column label="商品" prop="product" width="500">
        <template slot-scope="scope">
          <el-row>
            <el-col :span="8">
              <el-image style="width: 100px; height: 100px" :src="scope.row.imgList[0].url"></el-image>
            </el-col>
            <el-col :span="12">
              <el-row>{{ scope.row.product.name }}</el-row>
              <el-row>{{ scope.row.product.info}}</el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column prop="product.price" label="单价" width="100"></el-table-column>
      <el-table-column prop="num" label="数量" show-overflow-tooltip width="200">
        <template slot-scope="scope">
          <el-input-number
            size="small"
            v-model="scope.row.num"
            :min="1"
            :max="scope.row.product.stock"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="小计" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.product.price*scope.row.num}}</template>
      </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row.cartItemId)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-popover placement="top" width="160" v-model="deleteBtnVisible">
      <p>确定清空吗？</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="deleteBtnVisible = false">取消</el-button>
        <el-button type="danger" size="mini" @click="deleteBtnVisible = false;deleteAll()">确定</el-button>
      </div>
      <el-button slot="reference" type="danger">清空</el-button>
    </el-popover>
    <el-button>结算</el-button>
  </div>
</template>
<script>
export default {
  name: 'cart',
  data () {
    return {
      search: '',
      cartData: [],
      tipleSelection: [],
      deleteBtnVisible: false
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
      this.multipleSelection = val;
    },
    getSummaries (param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价';
          return;
        }

        if (index === 4) {
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = 'N/A';
          }
        }
      })
      return sums;
    },
    get () {
      this.$axios.get('/cart')
        .then((res) => {
          this.cartData = res.data.data
        })
    },
    update (pid, num) {
      alert(pid+num)
      // var data = this.qs.stringify({
      //   pid: pid,
      //   num: num
      // })
      // this.$axios.patch('/cart/2', data)
      //   .then((res) => { console.log(res) })
      //   .catch((err) => { console.log(err) })
    },
    deleteAll () {
      this.$axios.delete('/cart')
        .then((res) => {
          this.$message({
            showClose: true,
            message: res.data.message,
            type: 'success'
          })
          this.cartData = []
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: err,
            type: 'error'
          })        })
    },
    handleDelete (index, id) {
      this.$axios.delete('/cart/' + id)
        .then((res) => {
          this.$message({
            showClose: true,
            message: res.data.message,
            type: 'success'
          })
          this.cartData.splice(index, 1)
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: err,
            type: 'error'
          })
        })
    }

  }
}
</script>
<style scoped>
</style>