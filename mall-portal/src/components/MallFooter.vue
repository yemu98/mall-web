<template>
  <el-col ref="footer" class="footer">
    <el-row align="middle">Design by yemu</el-row>
  </el-col>
</template>

<style scoped>
.footer {
  color: black;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 0 6px rgba(0, 0, 0, 0.04);
  background-color: #727171;
  min-height: 60px;
}
</style>

<script>
export default {
  name: 'mallFooter',
  data () {
    return {
      msg: 'hello'
    }
  }
}
</script>
