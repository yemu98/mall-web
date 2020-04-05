<template>
  <el-header style="padding:0" height="50px">
    <el-row type="flex">
      <div class="flod-btn" @click="flod()">
        <i v-show="!isCollapse" class="el-icon-s-fold"></i>
        <i v-show="isCollapse" class="el-icon-s-unfold"></i>
      </div>
      <div>
        <el-breadcrumb separator="/" class="breadcrumb">
          <el-breadcrumb-item v-for="(item,index) in this.$route.meta" :key="index">
            <router-link v-if="item.url" :to="item.url">{{item.title}}</router-link>
            <a v-else>{{item.title}}</a>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </el-row>
  </el-header>
</template>

<script>
export default {
  name: 'navbar',
  data () {
    return {
    }

  },
  computed: {
    isCollapse: function () {
      return this.$store.state.isCollapse
    }
  },
  methods: {
    flod () {
      this.$store.state.isCollapse = !this.$store.state.isCollapse
    },
    getPath () {
      console.log(this.$route)
    }
  }
}
</script>

<style scoped>
.flod-btn {
  display: inline-block;
  vertical-align: middle;
  width: 16px;
  height: 100%;
  padding: 0 15px;
  line-height: 50px;
}
.flod-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}
.breadcrumb {
  vertical-align: middle;
  display: inline-block;
  line-height: 50px;
}
</style>