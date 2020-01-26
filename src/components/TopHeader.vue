<template>
  <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
    <el-menu-item index="index">
      <span slot="title"><a href="/"><img src="../assets/logo.png" style="width: 50px;padding-left: 10rem;"></a></span>
    </el-menu-item>
    <el-menu-item index="login">登录</el-menu-item>
    <el-menu-item index="register">注册</el-menu-item>
    <el-menu-item index="myOrder">我的订单</el-menu-item>
    <el-menu-item index="cart">购物车</el-menu-item>
  </el-menu>
</template>

<style scoped>
.el-row{
    width: 100%;
}
.el-menu-item {
  border-block: 1px;
  border-block-color: black;
  margin-left: 0;
}
</style>

<script>
export default {
  data: function () {
    return {
      activeIndex: '1',
      logourl: require('../assets/logo.png')
    }
  },
  methods: {
    handleSelect (key, keypath) {
      // console.log(key, keypath)
      this.$router.push({path: key})
    }
  }
}
</script>
