<template>
  <div>{{status}}</div>
</template>

<script>
export default {
  name: 'orderTableStatus',
  data () {
    return {
      status: ''
    }
  },
  props: {
    statusCode: {
      default: 0
    }
  },
  created () {
    this.status = this.getStatus(this.statusCode)
  },
  watch: {
  },
  methods: {
    getStatus (statusCode) {
      let status = ''
      switch (statusCode) {
        case 0:
          status = '待支付'
          break;
        case 1:
          status = '待发货'
          break;
        case 2:
          status = '待收货'
          break;
        case 3:
          status = '待评价'
          break;
        case 4:
          status = '交易完成'
          break;
        case 5:
          status = '订单已取消'
          break;
        case 6:
          status = '退款中'
          break;
        case 7:
          status = '换货中'
          break;
        case 8:
          status = '交易关闭'
          break;
        case 9:
          status = '已删除'
          break;
        default:
          break;
      }
      return status
    }
  }
}
</script>

<style scoped>
</style>
