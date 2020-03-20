<template>
  <div>
    <el-steps :active="active" finish-status="success">
      <el-step title="购物车"></el-step>
      <el-step title="核对订单信息"></el-step>
      <el-step title="提交订单"></el-step>
    </el-steps>

    <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
  </div>
</template>
<script>
export default {
  name: 'createOrder',
  data () {
    return {
      active: 1
    }
  },
  mounted () {
    // let cart = this.$route.params.cart
    console.log(this.$route.params.cart)
  },
  methods: {
    next () {
      if (this.active++ > 2) this.active = 0;
    }
  },
}
</script>
<style scoped>
</style>