<template>
  <div>
    <el-table
      v-loading="loading"
      ref="multipleTable"
      :data="orderData"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column label="订单详情" align="center" prop="id">
        <template slot-scope="scope">
          <orderTableDetail :orderId="scope.row.id"></orderTableDetail>
        </template>
      </el-table-column>
      <el-table-column label="收货人" align="center">
        <template slot-scope="scope">
          <orderTableAddress :addressId="scope.row.addressId"></orderTableAddress>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" align="center" prop="status"></el-table-column>
      <el-table-column label="金额" align="center" prop="total"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini">查看详情</el-button>
          <el-button size="mini" v-if="scope.row.status!='已付款'">去付款</el-button>
          <el-button size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import orderTableDetail from './components/orderTableDetail';
import orderTableAddress from './components/orderTableAddress';
export default {
  name: 'order',
  data () {
    return {
      loading: true,
      orderData: [

      ]
    }
  },
  components: {
    orderTableDetail: orderTableDetail,
    orderTableAddress: orderTableAddress
  },
  created () {
    this.getData()
  },
  mounted () {

  },
  methods: {
    getData () {
      return this.$axios.get('/order')
        .then((res) => {
          this.orderData = res.data.data
          this.loading = false
        })
    },
    delete () {

    }
  }
}
</script>

<style scoped>
</style>