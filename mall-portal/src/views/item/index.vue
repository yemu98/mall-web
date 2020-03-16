/**商品详情 */
<template>
  <div class="item-wrap">
    <div class="item-intro-wrap">
      <!-- <img src="../../assets/logo.png"/> -->
      <item-preview class="item-preview" :imgList="item.imgList"></item-preview>
      <item-info class="item-info" :product="item.product"></item-info>
    </div>
    <div class="item-detail-wrap">
      <item-detail :detailImgList="this.item.detailImgList"></item-detail>
    </div>
  </div>
</template>

<script>   
import itemPreview from './itemPreview'
import itemInfo from './itemInfo'
import itemDetail from './itemDetail';
export default {
  name: 'item',
  data () {
    return {
      item: {
        product: {
        },
        imgList: [],
        detailImgList: []
      }
    }
  },
  components: {
    'item-preview': itemPreview,
    'item-info': itemInfo,
    'item-detail': itemDetail

  },
  methods: {
    get () {
      this.$axios.get('/item/' + this.$route.query.id, {
        params: {
          'id': this.$route.query.id
        }
      }).then((res) => {
        this.item = res.data
        document.title = this.item.product.name != null ? this.item.product.name : '错误'
      })
        .catch((err) => {
          console.log(err);
        })
    }
  },
  created () {
    this.get()
  }
}
</script>

<style>
.item-wrap {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  /* border: 1px solid rgb(200, 197, 197); */
  background: white;
}
.item-intro-wrap {
  display: flex;
  /* align-items: ; */
  height: 600px;
  /* border:1px solid black; */
}
.item-preview {
  width: 50%;
  align-self: center;
  /* border:1px solid rgba(129, 127, 127, 0.1); */
}
.item-info {
  width: 60%;
  margin-left: 2%;
  margin-right: 2%;
  align-self: flex-start;
  text-align: start;
  /* border:1px solid rgba(129, 127, 127, 0.1); */
}
.item-deatil-wrap {
  border: 1px solid rgba(129, 127, 127, 0.1);
}
</style>