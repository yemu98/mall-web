<template>
  <div>
    <el-steps :active="active" finish-status="success">
      <el-step title="购物车"></el-step>
      <el-step title="填写订单信息"></el-step>
      <el-step title="提交订单"></el-step>
    </el-steps>
    <el-form ref="form" :model="orderForm" v-loading="submitLoading">
      <el-form-item label="收件人信息">
        <el-select v-model="address" placeholder="收货地址">
          <el-option
            v-for="address in addressList"
            :key="address.id"
            :label="address.name+' '+address.phone+' '+address.address"
            :value="address.id"
          ></el-option>
        </el-select>
        <router-link to="/address/add">
          <el-link>新建地址</el-link>
        </router-link>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item label="支付方式">
        <el-radio v-model="payWay" label="online">在线支付</el-radio>
        <el-radio v-model="payWay" label="outline">货到付款</el-radio>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item label="货物清单">
        <el-table
          ref="multipleTable"
          :data="cartList"
          tooltip-effect="dark"
          style="width: 100%"
          v-loading="loading"
        >
          <el-table-column label="商品" prop="product" align="center">
            <template slot-scope="scope">
              <el-row class="product" type="flex" justify="center">
                <el-col :span="8">
                  <el-image style="width: 100px; height: 100px" :src="scope.row.imgList[0].url"></el-image>
                </el-col>
                <el-col :span="12">
                  <span>{{ scope.row.product.name }}</span>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column label="数量" prop="num" align="center"></el-table-column>
          <el-table-column label="小计" align="center">
            <template slot-scope="scope">{{(scope.row.product.price*scope.row.num).toFixed(2)}}元</template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-divider></el-divider>
      <el-row class="total_wrap" type="flex" justify="end">
        <el-col :span="10" class="total_text">应付总额：￥{{total}}元</el-col>
      </el-row>
      <el-divider></el-divider>
    </el-form>
    <el-button style="margin-top: 12px;" @click="returnCart()" :disabled="submitLoading">购物车</el-button>
    <el-button
      class="submitBtn"
      style="margin-top: 12px;"
      @click="submit()"
      :disabled="submitLoading"
    >提交订单</el-button>
  </div>
</template>
<script>
export default {
  name: 'createOrder',
  data () {
    return {
      active: 1,
      orderForm: {},
      address: '',
      payWay: 'online',
      addressList: [],
      cartList: [],
      loading: true,
      submitLoading: false
    }
  },
  mounted () {
    // 从localstorage中取出序列化的购物车
    let cartList = JSON.parse(window.localStorage.getItem('cart'))
    for (let i = 0; i < cartList.length; i++) {
      // 从后台获取最新的信息防止本地存储的信息过期
      this.getCartInfo(cartList[i].cartItemId)
    }
    // 渲染地址
    this.getAddress()
    this.loading = false
  },
  computed: {
    lastText: function () {
      return this.active <= 1 ? '购物车' : '上一步'
    },
    nextText: function () {
      return this.active >= 2 ? '提交订单' : '下一步'
    },
    total: function () {
      let total = 0
      for (let i = 0; i < this.cartList.length; i++) {
        total += this.cartList[i].product.price * this.cartList[i].num
      }
      return total.toFixed(2)
    }
  },
  methods: {
    submit () {
      this.active++
      this.submitLoading = true
      let data = this.qs.stringify({
        addressId: this.address.id,
        payWay: this.payWay,
        cartItemId: this.cartList[0].cartItemId
      })
      this.$axios.post("/order", data)
        .then((res) => {
          if (res.data.status === 200) {
            this.$message({
              showClose: true,
              message: res.data.message,
              type: 'success'
            })
          } else {
            this.$message({
              showClose: true,
              message: res.data.message,
              type: 'error'
            })
          }
          this.submitLoading = false
          this.$router.push('/order')
        })
        .catch((err) => {
          console.log(err)
          this.$message({
            showClose: true,
            message: err,
            type: 'error'
          })
          this.submitLoading = false
        })
    },
    returnCart () {
      this.active--
      this.$router.push('/cart')
    },
    getCartInfo (cartItemId) {
      this.$axios.get('/cart/' + cartItemId)
        .then((res) => {
          this.cartList.push(res.data.data)
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: err.data.message,
            type: 'error'
          })
        })
    },
    getAddress () {
      this.$axios.get('/address')
        .then((res) => {
          this.addressList = res.data.data.addressList
          // 设置默认地址
          if (this.addressList.length > 0) {
            this.address = this.addressList[0]
          }
        })
    }
  },
}
</script>
<style scoped>
.el-form {
  margin-top: 20px;
}
.el-select {
  float: left;
  width: 50%;
}
.el-radio {
  float: left;
}
.product {
  align-items: center;
}
.submitBtn {
  background-color: rgba(231, 48, 48);
  color: whitesmoke;
}
</style>