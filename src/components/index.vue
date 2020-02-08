<template>
  <div>
    <el-carousel indicator-position="outside">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <el-button v-on:click="addCard()">添加</el-button>
    <el-row v-if="cards && cards.length > 0">
      <el-col :span="4" v-for="(card,index) in cards" :key="index" >
        <goodsCard @func="getContent(index)" :product="card.product" :imgUrl="card.imgUrl"></goodsCard>
      </el-col>
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
      cards: []
    }
  },
  methods: {
    addCard () {
      this.$axios({
        method: 'get',
        url: '/product/get'
      }).then((res) => {
        var products = []
        products = res.data.data.products
        products.forEach(element => {
          var product = element.product
          var imgs = element.imgs
          var imgUrl = imgs[0].path
          var card = { product: product, imgUrl: imgUrl }
          this.cards.push(card)
        })
      })
    },
    getContent (index) {
      this.cards.splice(index, 1)
    }
  },
  mounted: function () {
    this.addCard()
  }
}
</script>
