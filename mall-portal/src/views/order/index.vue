<template>
  <div>
    <el-input
      v-model="search"
      prefix-icon="el-icon-search"
      placeholder="搜索订单（商品名）"
      @keyup.enter.native="searchOrder()"
    ></el-input>
    <el-table
      v-loading="loading"
      ref="multipleTable"
      :data="orderData"
      tooltip-effect="dark"
      style="width: 100%"
      row-key="id"
    >
      <el-table-column label="订单详情" align="center" prop="id" width="400">
        <template slot-scope="scope">
          <orderTableDetail :orderId="scope.row.id"></orderTableDetail>
        </template>
      </el-table-column>
      <el-table-column label="收货人" align="center">
        <template slot-scope="scope">
          <orderTableAddress :addressId="scope.row.addressId"></orderTableAddress>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" align="center" prop="status">
        <template slot-scope="scope">
          <orderTableStatus :statusCode="scope.row.status"></orderTableStatus>
        </template>
      </el-table-column>
      <el-table-column label="金额" align="center" prop="total"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <orderTableButton :statusCode="scope.row.status" :orderId="scope.row.id"></orderTableButton>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import orderTableDetail from './components/orderTableDetail';
import orderTableAddress from './components/orderTableAddress';
import orderTableStatus from './components/orderTableStatus'
import orderTableButton from './components/orderTableButton'
export default {
  name: 'order',
  data () {
    return {
      loading: true,
      orderData: [],
      search: ''
    }
  },
  components: {
    orderTableDetail: orderTableDetail,
    orderTableAddress: orderTableAddress,
    orderTableStatus: orderTableStatus,
    orderTableButton: orderTableButton
  },
  created () {
    this.getData()
  },
  computed: {
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
    searchOrder (){
      this.loading = true
      this.$axios.get('/order/search?content='+this.search)
      .then((res) => {
        // 更新数据
        this.orderData = res.data.data
         this.loading = false
      })
    },
    delete () {

    },
    pay (){
      alert('test')
    }
  }
}
</script>

<style scoped>
</style>