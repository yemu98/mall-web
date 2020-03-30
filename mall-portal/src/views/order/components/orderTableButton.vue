<template>
  <div>
    <el-button size="mini" v-if="pay" @click="payBtn">付款</el-button>
    <el-button size="mini" v-if="confirmReceipt">收货</el-button>
    <el-button size="mini" v-if="ToEvaluate">评价</el-button>
    <el-button size="mini" v-if="cancel">取消</el-button>
    <el-button size="mini" v-if="applyRefund">退款</el-button>
    <el-button size="mini" v-if="cancelApplyRefund">取消</el-button>
    <el-button size="mini" v-if="applyExchange">换货</el-button>
    <el-button size="mini" v-if="cancelApplyExchange">取消</el-button>
    <el-button size="mini" v-if="deleteOrder">删除</el-button>
  </div>
</template>

<script>
export default {
  name: 'orderTableButton',
  data () {
    return {
      pay: false,
      confirmReceipt: false,
      ToEvaluate: false,
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
    orderId: {
        default: 0
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
        this.ToEvaluate = true
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
    payBtn () {
        this.$axios.put("/order/"+this.orderId+"/pay")
        .then((res)=>{
            console.log(res)
        })
    }
  }
}
</script>

<style  scoped>
</style>