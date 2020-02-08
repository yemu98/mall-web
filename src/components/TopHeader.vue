<template>
  <el-menu :default-active="activedMenu($route.path)" mode="horizontal" @select="handleSelect" menu-trigger="click">
    <el-menu-item index="index">
      <span slot="title">
        <a href="/">
          <img src="../assets/logo.png" style="width: 50px;padding-left: 10rem;" />
        </a>
      </span>
    </el-menu-item>
    <el-menu-item index="login" v-show="!isLogin">登录</el-menu-item>
    <el-menu-item index="register" v-show="!isLogin">注册</el-menu-item>
    <el-submenu index="profile" v-if="isLogin" >
      <template slot="title">
        <i class="el-icon-user-solid"></i>个人中心
      </template>
      <el-menu-item index="myOrder">
        <i class="el-icon-s-order"></i>我的订单
      </el-menu-item>
      <el-menu-item index="cart">
        <i class="el-icon-shopping-cart-full"></i>购物车
      </el-menu-item>
      <el-menu-item v-if="isLogin" v-on:click="logout">
        <i class="el-icon-circle-close" />退出
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<style scoped>
.el-row {
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
      logourl: require('../assets/logo.png'),
      isLogin: false
    }
  },
  methods: {
    handleSelect (key) {
      this.$router.push({ path: key })
    },
    logout () {
      window.localStorage.removeItem('token')
      this.$router.push("/")
      this.$router.go(0)
    },
    activedMenu (val) {
      if (val.indexOf('/register') == 0) {
        return 'register'
      }
      if (val.indexOf('/login') == 0) {
        return 'login'
      }
    }
  },
  mounted: function () {
    this.$axios({
      methods: 'get',
      url: '/isLogin',
      headers: {
        'token': window.localStorage.getItem('token')
      }
    })
      .then((res) => {
        if (res.data.status === 0) {
          this.isLogin = true
        } else {
          this.isLogin = false
        }
      })
    if (window.localStorage.getItem('token') != null) {
      this.isLogin = true
    }
  }
}
</script>
