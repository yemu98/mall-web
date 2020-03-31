<template>
  <div>
    <el-button size="mini" v-if="pay" @click="updateOrder('pay')">付款</el-button>
    <el-popover placement="top" width="160" v-model="confirmReceiptPopover">
      <p>确定收货吗？</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="confirmReceiptPopover = false">取消</el-button>
        <el-button
          type="danger"
          size="mini"
          @click="confirmReceiptPopover = false,confirmReceiptBtn()"
        >确定</el-button>
      </div>
      <el-button
        slot="reference"
        size="mini"
        v-if="confirmReceipt"
        @click="updateOrder('confirmReceipt')"
      >收货</el-button>
    </el-popover>
    <el-button size="mini" v-if="ToReview" @click="toReview()">评价</el-button>
    <el-button size="mini" v-if="cancel" @click="updateOrder('cancel')">取消</el-button>
    <el-button size="mini" v-if="applyRefund">退款</el-button>
    <el-button size="mini" v-if="cancelApplyRefund" @click="updateOrder('cancelApplyRefund')">取消</el-button>
    <el-button size="mini" v-if="applyExchange">换货</el-button>
    <el-button size="mini" v-if="cancelApplyExchange" @click="updateOrder('cancelApplyExchange')">取消</el-button>
    <el-button size="mini" v-if="deleteOrder" @click="deleteOrderBtn()">删除</el-button>
  </div>
</template>

<script>
export default {
  name: 'orderTableButton',
  data () {
    return {
      pay: false,
      confirmReceipt: false,
      confirmReceiptPopover: false,
      ToReview: false,
      ToReviewPopover: false,
      cancel: false,
      applyRefund: false,
      cancelApplyRefund: false,
      applyExchange: false,
      deleteOrder: false,
      cancelApplyExchange: false
    }
  },
  props: {
    statusCode: {
      default: 0
    },
    orderNumber: {
      default: ''
    }
  },
  created () {
    switch (this.statusCode) {
      case 0:
        // 当前状态已创建订单 可进行操作 支付 取消订单
        this.pay = true
        this.cancel = true
        break;
      case 1:
        // 待收货 可进行操作 取消订单
        this.cancel = true
        break;
      case 2:
        // 待收货 可进行操作 确认收货 申请退款 申请换货
        this.applyRefund = true
        this.confirmReceipt = true
        this.applyExchange = true
        break;
      case 3:
        // 待评价 可进行操作 去评价
        this.ToReview = true
        break;
      case 4:
        // 交易完成 可删除
        this.deleteOrder = true
        break;
      case 5:
        // 已取消订单 可删除
        this.deleteOrder = true
        break;
      case 6:
        // 退款中 可取消退款
        this.cancelApplyRefund = true
        break;
      case 7:
        // 换货中 可取消
        this.cancelApplyExchange = true
        break;
      case 8:
        // 已退款 交易关闭 可删除订单
        this.deleteOrder = true
        break;
      default:
        break;
    }
  },
  methods: {
    updateOrder (status) {
      this.$axios.put("/order/" + this.orderNumber + "/" + status)
        .then((res) => {
          this.$message({
            showClose: true,
            message: res.data.message,
            type: 'success'
          })
          // 重载数据
          this.$emit("reload")
        })
    },
    deleteOrderBtn () {
      this.$axios.delete('/order/' + this.orderNumber)
        .then((res) => {
          this.$message({
            showClose: true,
            message: res.data.message,
            type: 'success'
          })
          // 重载数据
          this.$emit("reload")
        })
    },
    toReview () {
      this.$router.push({ path: '/order/createReview', query: { orderNumber: this.orderNumber } })
    },
    confirmReceiptBtn () {
      this.$axios.put('/order/' + this.orderNumber + '/confirmReceipt')
        .then((res) => {
          this.$message({
            showClose: true,
            message: res.data.message,
            type: 'success'
          })
          // 重载数据
          this.$emit("reload")
        })
    }
  }
}
</script>

<style  scoped>
</style>