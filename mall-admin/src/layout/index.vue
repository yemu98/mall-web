<template>
  <el-container class="app_wrap">
    <sidebar></sidebar>
    <el-container class="main_wrap" :class="{isCollapse: this.$store.state.isCollapse}">
      <navbar></navbar>
      <el-main><router-view :key="key"/></el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
import sidebar from './components/sidebar'
import navbar from './components/navbar'
export default {
  name: 'Home',
  components: {
    sidebar,
    navbar
  },
  computed: {
    key() {
      return this.$route.path
    }
  },
  data () {
    return {
    }
  },
  methods: {

  }
}
</script>

<style scoped>
.main_wrap{
  min-height: 100%;
  /**留出siderbar收缩前的宽度 */
  margin-left: 210px;
  transition: margin-left .3s;
  /**  给main设置一个高的z-index可以将sidebar盖住，达到收缩的效果 */
  background-color: white;
  z-index: 1001;
  height: 100vh;
}
.el-main {
  background-color: aliceblue;
}
/**留出sidebar收缩后的宽度 */
.isCollapse{
  margin-left: 60px;
}
.sidebar{
  position: fixed;
}
</style>
