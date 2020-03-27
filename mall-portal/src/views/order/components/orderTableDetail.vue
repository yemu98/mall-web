<template>
  <div>{{order.orderNumber}}</div>
</template>

<script>
export default {
  name: 'orderTableDetail',
  data () {
    return {
        order: {}
    }
  },
  props: {
    orderId: {
      default: 0
    }
  },
  created (){
      this.getDetail()
  },
  methods: {
    getDetail () {
        this.$axios.get('/order/'+this.orderId)
        .then((res) => {
            // console.log(res)
            this.order = res.data.data
        })
    }
  }
}
</script>

<style scoped>
</style>