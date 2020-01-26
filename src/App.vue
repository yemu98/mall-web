<template>
  <div id="app" ref="homePage">
    <el-container>
      <el-header :style="{padding: 0}">
        <topHeader ref="header"/>
      </el-header>
      <el-main v-bind:style="{minHeight: minHeight + 'px'}"><router-view/></el-main>
      <el-footer :style="{padding: 0}">
        <mallFooter />
      </el-footer >
    </el-container>
    <!-- <topHeader></topHeader> -->
    <!-- <mallFooter ref="footer"></mallFooter> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      minHeight: 0
    }
  },
  mounted () {
    this.minHeight = document.documentElement.clientHeight - 120
    window.onresize = () => { this.minHeight = document.documentElement.clientHeight - 120 }
  }
}

</script>

<style>
#app {
  background-color: #f5f5f5;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  /* margin-top: 60px;  */
}
.el-container{
  margin: 0 auto;
  width: 100%;
  height: 100%;
}
</style>
