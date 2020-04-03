<template>
  <div>
    <el-input
      v-model="search"
      prefix-icon="el-icon-search"
      placeholder="搜索订单（商品名）"
      @keyup.enter.native="getData(1,pageSize)"
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
          <orderTableDetail :orderNumber="scope.row.orderNumber"></orderTableDetail>
        </template>
      </el-table-column>
      <el-table-column label="收货人" align="center">
        <template slot-scope="scope">
          <orderTableAddress :addressId="scope.row.addressId"></orderTableAddress>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" align="center" :filters="filters" :filter-method="filterTag">
        <template slot-scope="scope">
          <orderTableStatus :statusCode="scope.row.status"></orderTableStatus>
        </template>
      </el-table-column>
      <el-table-column label="金额" align="center" prop="total"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <orderTableButton
            :statusCode="scope.row.status"
            :orderNumber="scope.row.orderNumber"
            @reload="reload()"
          ></orderTableButton>
        </template>
      </el-table-column>
    </el-table>
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
      search: '',
      total: 0,
      pageSize: 5,
      pageNo: 1,
      currentPage: 1,
      filters: [
        {
          text: '待付款', value: 0
        },
        {
          text: '待发货', value: 1
        },
        {
          text: '待收货', value: 2
        },
        {
          text: '待评价', value: 3
        },
        {
          text: '交易完成', value: 4
        },
        {
          text: '已取消订单', value: 5
        },
        {
          text: '退款中', value: 6
        },
        {
          text: '换货中', value: 7
        },
        {
          text: '交易关闭', value: 8
        },
                {
          text: '已删除', value: 9
        },
      ]
    }
  },
  components: {
    orderTableDetail: orderTableDetail,
    orderTableAddress: orderTableAddress,
    orderTableStatus: orderTableStatus,
    orderTableButton: orderTableButton
  },
  created () {
    this.getData(1, this.pageSize)
  },
  computed: {
  },
  mounted () {

  },
  methods: {
    getData (pageNo, pageSize) {
      this.loading = true
      return this.$axios.get('/order?productName=' + this.search, {
        params: {
          'pageNo': pageNo,
          'pageSize': pageSize
        }
      })
        .then((res) => {
          this.orderData = res.data.data.records
          this.total = res.data.data.total
          this.loading = false
          
        })
    },
    handleCurrentChange (val) {
      this.getData(val, this.pageSize)

    },
    filterTag (value, row) {
      return row.status === value;
    },
    searchOrder () {
      this.loading = true
      this.$axios.get('/order?productName=' + this.search)
        .then((res) => {
          // 更新数据
          this.orderData = res.data.data.records
          this.total = res.data.data.total
          this.loading = false
        })
    },
    delete () {

    },
    reload () {
      this.loading = true
      this.orderData = []
      this.getData()
    }
  }
}
</script>

<style scoped>
.pagination_wrap {
  justify-content: center;
}
</style>