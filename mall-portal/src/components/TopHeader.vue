<template>
  <div>
    <i class="el-icon-s-unfold verticalMenu" @click="drawer = true" style="line-height:60px"></i>
    <el-drawer :visible.sync="drawer" direction="ltr">
      <headerMenu></headerMenu>
    </el-drawer>
    <headerMenu mode="horizontal" class="horizontalMenu"></headerMenu>
  </div>
</template>

<script>
import HeaderMenu from './headerMenu'
export default {
  name: 'TopHeader',
  components: {
    HeaderMenu: HeaderMenu
  },
  data: function () {
    return {
      drawer: false,
      activeName: '1',
    }
  },
  methods: {
  },
  mounted: function () {
  },
  watch: {
    // 监听路由变化 当路由变化时关闭抽屉
    $route: {
      handler: function () {
        this.drawer = false
      },
      // 深度观察监听
      deep: true
    }
  }
}
</script>
<style>
.el-drawer {
  width: 100% !important;
}
</style>
<style scoped>
.verticalMenu {
  display: none;
  margin-left: 20px;
  font-size: 200%;
}
.horizontalMenu {
  /* display: none; */
  z-index: 1000;
}

@media screen and (max-width: 768px) {
  .verticalMenu {
    display: flex;
  }
  .horizontalMenu {
    display: none;
    z-index: 1000;
  }
}
</style>