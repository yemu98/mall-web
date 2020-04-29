/**商品详情 */
<template>
  <div class="item-wrap">
    <div class="item-intro-wrap">
      <!-- <img src="../../assets/logo.png"/> -->
      <item-preview class="item-preview" :imgList="item.imgList"></item-preview>
      <item-info class="item-info" :product="item.product"></item-info>
    </div>
    <el-divider></el-divider>
    <el-tabs v-model="activeName" :stretch="true">
      <el-tab-pane label="商品介绍" name="first">
        <div class="item-detail-wrap">
          <item-detail :detailImgList="this.item.detailImgList"></item-detail>
        </div>
      </el-tab-pane>
      <el-tab-pane label="评价" name="second">
        <itemReviews :pid="item.product.id"></itemReviews>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>   
import itemPreview from './components/itemPreview'
import itemInfo from './components/itemInfo'
import itemDetail from './components/itemDetail';
import itemReviews from './components/itemReviews'
export default {
  name: 'item',
  data () {
    return {
      pid: 0,
      activeName: 'first',
      item: {
        product: {},
        imgList: [],
        detailImgList: []
      }
    }
  },
  components: {
    'item-preview': itemPreview,
    'item-info': itemInfo,
    'item-detail': itemDetail,
    'itemReviews': itemReviews
  },
  methods: {
    get (pid) {
      this.$axios.get('/item/' + pid, {
        params: {
          'id': pid
        }
      }).then((res) => {
        this.item = res.data.data
        document.title = this.item.product.name != null ? this.item.product.name : '错误'
      })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: err.response.data.message,
            type: 'error'
          })

        })
    }
  },
  created () {
    this.pid = this.$route.query.id
  },
  watch: {
    $route () {
      this.pid = this.$route.query.id
    },
    pid () {
      this.get(this.pid)
    }
  }
}
</script>

<style>
.el-tabs__item:hover {
  color: rgba(255, 0, 0);
}
.el-tabs__item.is-active {
  color: rgb(195, 4, 4);
}
.el-tabs__active-bar {
  background-color: rgba(170, 2, 2);
}
.item-wrap {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  /* border: 1px solid rgb(200, 197, 197); */
  background: white;
  border-radius: 5px;
}
.item-intro-wrap {
  display: flex;
  /* align-items: ; */
  height: 500px;
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