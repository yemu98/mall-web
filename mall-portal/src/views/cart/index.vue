<template>
  <div>
    <el-table
      v-loading="loading"
      ref="multipleTable"
      :data="cartData"
      tooltip-effect="dark"
      show-summary
      :summary-method="getSummaries"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="100"></el-table-column>
      <el-table-column label="商品" prop="product" width="400">
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
      <el-table-column prop="product.price" label="单价" width="100" align="center">
        <template slot-scope="scope">{{ scope.row.product.price }}元</template>
      </el-table-column>
      <el-table-column prop="num" label="数量" show-overflow-tooltip width="200" align="center">
        <template slot-scope="scope">
          <el-input-number
            size="small"
            v-model="scope.row.num"
            :min="1"
           
            :disabled="isUpdate"
            @change="(currentValue,oldValue) => update(scope.$index,scope.row,currentValue,oldValue)"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="小计" prop="subTotal" show-overflow-tooltip align="center">
        <template slot-scope="scope">{{ (scope.row.product.price*scope.row.num).toFixed(2) }}元</template>
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
    <el-row class="cart_bottom">
      <el-popover placement="top" width="160" v-model="deleteBtnVisible" class="deleteAll">
        <p>确定清空吗？</p>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="deleteBtnVisible = false">取消</el-button>
          <el-button type="danger" size="mini" @click="deleteBtnVisible = false;deleteAll()">确定</el-button>
        </div>
        <el-link slot="reference">清理购物车</el-link>
      </el-popover>
      <el-button class="submitOrderBtn" @click="submit()">结算</el-button>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'cart',
  data () {
    return {
      search: '',
      cartData: [],
      selection: [],
      deleteBtnVisible: false,
      isUpdate: false,
      loading: true
    }
  },
  created () {
    // 获取数据
    this.get()

  },
  components: {
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
    // 总计功能
    getSummaries (param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价';
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (column.property === 'num') {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0)
        }
        // 计算总价
        if (column.property === 'subTotal') {
          let s = 0
          for (var j = 0, len = this.cartData.length; j < len; j++) {
            s += this.cartData[j].product.price * this.cartData[j].num
          }
          sums[index] = s.toFixed(2)
          sums[index] += '元'
        }
      })
      return sums;
    },
    // 获取购物车内容
    get () {
      this.$axios.get('/cart')
        .then((res) => {
          this.cartData = res.data.data
          this.loading = false
          // 默认全选
          this.$refs.multipleTable.toggleAllSelection()
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: err,
            type: 'error'
          })
        })
    },
    // 更新购物车中商品数量
    update (index, row, currentValue, oldValue) {
      this.isUpdate = true
      var data = this.qs.stringify({
        num: row.num
      })
      this.$axios.patch('/cart/' + row.cartItemId, data)
        .then(() => {
          this.isUpdate = false
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: err,
            type: 'error'
          })
          this.isUpdate = false
          this.cartData[index].num = oldValue
          this.get()
        })

    },
    // 清空购物车
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
          })
        })
    },
    // 删除购物车中的某个物品
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
    },
    // 去结算
    submit () {
      if (this.selection.length < 1) {
        this.$message({
          showClose: true,
          message: '请至少选择一项商品',
          type: 'error'
        })
      }
      else {
        // 序列化后存储到localstorage中防止刷新页面数据丢失
        window.localStorage.setItem('cart', JSON.stringify(this.selection))
        // 采用router的params传参时需要使用name匹配而不能使用path
        this.$router.push({
          name: 'createOrder',
          params: {
            cartList: this.selection
          }
        })
      }

    }

  }
}
</script>
<style scoped>
.cart_bottom {
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 0 1px rgba(0, 0, 0, 0.01);
}
.deleteAll {
  display: flex;
  margin-left: 10px;
}
.submitOrderBtn {
  display: flex;
  margin-left: auto;
  margin-right: 10px;
  color: white;
  background-color: rgba(231, 48, 48);
}
</style>