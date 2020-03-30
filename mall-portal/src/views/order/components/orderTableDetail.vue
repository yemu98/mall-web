<template>
  <div>
    <el-row>
      <el-col :span="12" class="order_createTime">创建时间：{{order.createTime}}</el-col>
      <el-col :span="12" class="orderNumber">订单号：{{order.orderNumber}}</el-col>
    </el-row>

    <el-row>
      <el-col :span="8">
        <el-image style="width: 64px; height: 64px" :src="img.url" :title="product.name"></el-image>
      </el-col>
      <router-link :to="{path: '/item',query: {id:product.id}}">
        <el-col :span="14" class="product_name" :title="product.name">{{ product.name }}</el-col>
      </router-link>
      <el-col :span="2" class="order_number">x{{ order.number }}</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'orderTableDetail',
  data () {
    return {
      order: {},
      product: {},
      img: {}
    }
  },
  props: {
    orderId: {
      default: 0
    }
  },
  async created () {
    await this.getOrderDetail()
    if (this.order.pid != null) {
      this.getProduct(this.order.pid)
    }
  },
  methods: {
    getOrderDetail () {
      return this.$axios.get('/order/' + this.orderId)
        .then((res) => {
          // console.log(res)
          this.order = res.data.data
        })
    },
    getProduct (pid) {
      this.$axios.get('/product/' + pid)
        .then((res) => {
          if (res.data.data.product != null) {
            this.product = res.data.data.product
          }
          if (res.data.data.imgList != null) {
            this.img = res.data.data.imgList[0]
          }
        })
    }
  }
}
</script>

<style scoped>
.product_name {
  color: gray;
  text-decoration: underline;
  overflow: hidden;
  font-size: 12px;
  word-break: break-all;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
}
.product_name:hover {
  color: red;
}
.order_createTime{
  font-size: 13px;
}
.orderNumber{
  font-size: 13px;
}
</style>