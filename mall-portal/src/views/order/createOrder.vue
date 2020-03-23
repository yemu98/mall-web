<template>
  <div>
    <el-steps :active="active" finish-status="success">
      <el-step title="购物车"></el-step>
      <el-step title="填写订单信息"></el-step>
      <el-step title="提交订单"></el-step>
    </el-steps>
 <el-button style="margin-top: 12px;" @click="last">{{ lastText }}</el-button>
    <el-button style="margin-top: 12px;" @click="next">{{ nextText }}</el-button>
  </div>
</template>
<script>
export default {
  name: 'createOrder',
  data () {
    return {
      active: 1,
    }
  },
  mounted () {
    // let cart = this.$route.params.cart
    console.log(this.$route.params.cart)
  },
  computed: {
    lastText: function () {
      return this.active<=1?'购物车':'上一步'
    },
    nextText: function () {
   return this.active>=2?'提交订单':'下一步'
    }
  },
  methods: {
    next () {
      if (this.active++ >= 2) this.active = 0
    },
    last () {
      if (this.active--<=1) {
        this.$router.push('/cart')
      }
     
    }
  },
}
</script>
<style scoped>
</style>