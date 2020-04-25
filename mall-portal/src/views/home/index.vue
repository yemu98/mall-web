<template>
  <div>
    <homeCarousel></homeCarousel>
    <!-- <el-row> -->
    <el-divider content-position="left"><span>热销</span></el-divider>
    <hot></hot>
    <el-divider content-position="left"><span>猜你喜欢</span></el-divider>
    <el-row class="goods_wrap" ref="goods">
      <goodsCard
        v-for="(card,index) in cards"
        :key="index"
        @unlike="delete_card(index)"
        :product="card.product"
        :imgUrl="card.imgUrl"
        class="goodsCard"
      ></goodsCard>
    </el-row>

    <loading
      :loading="this.$store.state.goodCardLoading"
      :text="loadingText"
      @click.native="addCard()"
    ></loading>
    <!-- </el-row> -->
    <el-backtop></el-backtop>
  </div>
</template>

<script>
import homeCarousel from './components/carousel'
import loading from '../../components/loading'
import hot from './components/hot'
export default {
  data () {
    return {
      cards: [],
      loadingText: '加载中'
    }
  },
  components: {
    loading: loading,
    hot: hot,
    homeCarousel: homeCarousel
  },
  methods: {
    addCard () {
      this.$axios({
        method: 'get',
        url: '/product/getByUser',
        params: {
          'pageNo': this.$store.state.pageNo,
          'pageSize': this.$store.state.pageSize
        }
      }).then((res) => {
        var productlist = []
        productlist = res.data.data.productList
        if (productlist.length < 1) {
          this.$store.state.goodCardLoading = false
          this.loadingText = '到底啦~~'
          return
        }
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
        this.$store.state.pageNo++
        this.$store.state.goodCardLoading = false
      }).catch((err) => {
        this.$message({
          showClose: true,
          message: err,
          type: 'error'
        })
        this.$store.state.goodCardLoading = false
        this.loadingText = '加载失败~~'
      })
    },
    delete_card (index) {
      this.cards.splice(index, 1)
    },
    handleScroll () {
      // 距离200px时加载一次
      let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight <= 200
      if (bottomOfWindow && !this.$store.state.goodCardLoading) {
        this.$store.state.goodCardLoading = true
        this.addCard()
      }
    }
  },
  mounted: function () {
    // 初始化页码
    this.$store.state.pageNo = 1
    // 页面加载后让feed流显示加载中动画
    this.$store.state.goodCardLoading = true
    this.addCard()
    // 添加滚动事件
    // this.scrollLoad()

    window.addEventListener('scroll', this.handleScroll, true)
  },
  created () {
    this.uid = this.$store.state.uid
  },
  beforeDestroy () {
    // 在切换页面时取消滚动事件的监听
    window.removeEventListener('scroll', this.handleScroll, true)
  }
}
</script>

<style scoped>
.goods_wrap {
  display: flex;
  flex-flow: wrap;
  justify-content: flex-start;
}
.goodsCard {
  margin: 5px;
  flex: 1 0 180px;
}

@media screen and (max-width: 768px) {
  .goodsCard {
    margin: 5px;
    flex: 1 0 150px;
  }
}
</style>