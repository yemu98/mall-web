
<template>
  <div>
    <el-popover placement="top" width="160" v-model="deliverPopover">
      <p>确定发货吗？</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="deliverPopover = false">取消</el-button>
        <el-button
          type="danger"
          size="mini"
          @click="deliverPopover = false,updateOrder('deliver')"
        >确定</el-button>
      </div>
      <el-button
        slot="reference"
        size="mini"
        v-if="deliver"
      >发货</el-button>
    </el-popover>
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
      deliver: false,
      deliverPopover: false,
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
        // 当前状态已创建订单
        break;
      case 1:
        // 待发货 可进行操作 发货
        this.deliver = true
        break;
      case 6:
        // 退款中 可同意退款
        this.cancelApplyRefund = true
        break;
      case 7:
        // 换货中 可同意换货
        this.cancelApplyExchange = true
        break;
      default:
        break;
    }
  },
  methods: {
    updateOrder (status) {
      this.$axios.patch("/order/" + this.orderNumber + "/" + status)
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