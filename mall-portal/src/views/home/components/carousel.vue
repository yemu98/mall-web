<template>
  <el-carousel indicator-position="outside">
    <el-carousel-item v-for="(item,id) in carouselData" :key="id">
      <el-link :href="item.link">
        <el-image :src="item.imgUrl" :title="item.info" fit="cover"></el-image>
      </el-link>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: 'homeCarousel',
  data () {
    return {
      carouselData: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get('/carousel')
        .then((res) => {
          this.carouselData = res.data.data
        })

    }
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  /* color: #475669; */
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.el-image{
  width: 100%;
}
</style>