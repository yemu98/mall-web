<template>
  <div>
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <el-row>
      <el-col :span="4"><goodsCard :name="name" :info="info" :price="price"></goodsCard></el-col>
      <el-col :span="4"><goodsCard></goodsCard></el-col>
    </el-row>
  </div>
</template>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>

<script>
export default {
  data () {
    return {
      name: '汉堡',
      info: '美味汉堡',
      price: '9.9'

    }
  }
}
</script>
