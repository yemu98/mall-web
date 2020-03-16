<template>
    <el-carousel height="height">
      <el-carousel-item v-for="img in imgList" :key="img.id">
        <el-image :src="img" class="img" :preview-src-list="imgList" fit="contain"></el-image>
      </el-carousel-item>
    </el-carousel>
</template>

<script>
export default {
  name: 'itemPreview',
  data () {
    return {
      height: '400px',
      imgList: [
          'http://img.yemuc.xyz/9x.jpg',
          'http://img.yemuc.xyz/d2af7f4f447843b19d84f613116aaf09.jpg',
          'http://img.yemuc.xyz/xiaomi8.jpg'
      ]
    }
  }
}
</script>
<style scoped>
.img{
  height:100%;
}
</style>