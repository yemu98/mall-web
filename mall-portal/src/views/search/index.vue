<template>
  <div>
    <el-row class="goods_wrap">
      <goodsCard
        v-for="(card,index) in cards"
        :key="index"
        @unlike="delete_card(index)"
        :product="card.product"
        :imgUrl="card.imgUrl"
        class="goodsCard"
      ></goodsCard>
    </el-row>
    <el-backtop></el-backtop>
  </div>
</template>

<script>
export default {
  name: 'searchRelut',
  data () {
    return {
      cards: []
    }
  },
  methods: {
    addCard (searchContent) {
      this.cards = []
      this.$axios({
        method: 'get',
        url: '/product/search',
        params: {
          searchContent: searchContent
        }
      }).then((res) => {
        console.log(res)
        var productlist = []
        productlist = res.data.data.productList
        productlist.forEach(element => {
          var product = element.product
          var imgs = element.imgList
          var card = {}
          if (imgs[0] !== undefined) {
            var imgUrl = imgs[0].url
            card.product = product
            card.imgUrl = imgUrl
          }
          else {
            card.product = product
          }
          this.cards.push(card)
        })
      })
    }
  },
  mounted: function () {
    this.addCard(this.$route.query.searchContent)
  },
  watch: {
    '$route' () {
      this.addCard(this.$route.query.searchContent)
    }
  }
}
</script>

<style>
.goods_wrap {
  display: flex;
  flex-flow: wrap;
  justify-content: flex-start;
  
}
.goodsCard {
  margin: 5px;
    flex: 1 0 180px;
}
</style>