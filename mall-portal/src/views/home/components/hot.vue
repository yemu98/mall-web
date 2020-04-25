<template>
  <div>
    <el-row class="goods_wrap" type="flex" ref="goods">
      <goodsCard
        v-for="(data,index) in hot"
        :key="index"
        :product="data.product"
        :imgUrl="data.imgList[0].url"
        class="goodsCard"
        :unLike_disable=false
      ></goodsCard>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'hotProducts',
  data () {
    return {
      hot: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get('/product/hot/' + this.$store.state.pageSize)
        .then((res) => {
          this.hot = res.data.data
          console.log(this.hot)
        })
    }
  }
}
</script>

<style scope>
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