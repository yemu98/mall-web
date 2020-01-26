<template>
  <div class="login">
    <el-row type="flex" justify="center">
      <el-col :span="22" :gutter="6">
        <el-input placeholder="请输入账号" v-model="account" clearable></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="22">
        <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
      </el-col>
    </el-row>
    <el-row>
       <el-col :span="22">
         <router-link to="register"><el-link>立即注册</el-link></router-link>|
         <router-link to="forgetPwd"> <el-link>忘记密码？</el-link></router-link>
       </el-col>
    </el-row>
    <el-row>
       <el-col :span="22">
      <el-button type="primary" v-on:click="check" :loading="loading">登录</el-button>
       </el-col>
    </el-row>
  </div>
</template>

<style>
.login {
  width: 25rem;
  height: 20rem;
  margin: auto auto;
  margin-top: 5%;
  padding-top: 50px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 0 6px rgba(0, 0, 0, 0.04);
}
.el-row {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 20px;
}
.el-button {
  /* margin-top: 20px; */
  width: 100%;
}
a {
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}
</style>

<script>
export default {
  name: 'login',
  data () {
    return {
      msg: 'hello',
      account: '',
      password: '',
      logourl: require('../assets/logo.png'),
      loading: false
    }
  },
  methods: {
    check: function () {
      this.loading = true
    }
  }
}
</script>
