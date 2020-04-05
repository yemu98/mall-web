<template>
  <el-aside width="auto" class="sidebar">
    <el-scrollbar style="height:100%">
      <el-menu
        :default-active="active"
        class="el-menu-vertical"
        :collapse="isCollapse"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">导航一</span>
          </template>
          <el-menu-item-group>
            <span slot="title">分组一</span>
            <el-menu-item index="1-1">选项1</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <span slot="title">选项4</span>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="product">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">商品管理</span>
          </template>
          <el-menu-item index="/product/index">商品列表</el-menu-item>
          <el-menu-item index="/product/add">添加商品</el-menu-item>
        </el-submenu>
        <el-submenu index="order">
          <template slot="title">
            <i class="el-icon-s-order"></i>
            <span slot="title">订单管理</span>
          </template>
          <el-menu-item index="/order/index">订单列表</el-menu-item>
        </el-submenu>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script>
export default {
  name: 'sidebar',
  components: {
  },
  data () {
    return {
    };
  },
  computed: {
    isCollapse: function () {
      return this.$store.state.isCollapse
    },
    active: function () {
      return this.$route.path
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scope>
.el-menu-vertical {
  width: 210px;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 210px;
}
.sidebar {
  background-color: #304156;
  height: 100%;
  font-size: 0;
  top: 0;
  bottom: 0;
  left: 0;
  /**设置较小的z-index，让main能覆盖sidebar */
  z-index: 1;
  scrollbar-width: none;
  overflow: hidden;
}
.sidebar:not(.el-menu--collapse) {
  width: 210px;
}
</style>