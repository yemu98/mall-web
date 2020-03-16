<template>
    <el-carousel height="height">
      <el-carousel-item v-for="img in imgList" :key="img.id">
        <el-image :src="img.url" class="img" :preview-src-list="imgList" fit="contain"></el-image>
      </el-carousel-item>
    </el-carousel>
    
</template>

<script>
export default {
  name: 'itemPreview',
  data () {
    return {
      height: '400px'
    }
  },
  props :{
    imgList: {}
  }
}
</script>
<style scoped>
.img{
  height:100%;
}
</style>