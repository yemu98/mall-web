<template>
  <div>
    <el-image v-for="img in detailImgList" :key="img.id" :src="img.url"></el-image>
  </div>
</template>

<script>
export default {
  name: 'itemDetail',
  data () {
    return {

    }
  },
  props: {
      detailImgList: {}
  }
}
</script>
<style scoped>
</style>