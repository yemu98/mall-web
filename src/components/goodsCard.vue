<template>
  <el-card shadow="hover" :body-style="{ padding: '20px' }">
    <el-row class="card-header">
      <p style="display:none">{{product.id}}</p>
      <el-button class="unLikeBtn" v-on:click="unLike()" type="text" title="不喜欢">
        <i class="el-icon-close"></i>
      </el-button>
    </el-row>
    <el-row class="card-img">
      <el-image :src="imgUrl" class="image">
        <div slot="placeholder" class="image-slot">
        加载中<span class="dot">...</span>
      </div>
      </el-image>
    </el-row>
    <el-row class="card-name">
      <span class="name">{{product.name}}</span>
    </el-row>
    <el-row class="card-info">
      <span class="info">{{product.title}}</span>
    </el-row>
    <el-row class="card-price">
      <p class="price">￥{{product.price}}</p>
    </el-row>
  </el-card>
</template>

<script>
export default {
  props: {
    product: {
      type: Object
    },
    imgUrl: {
      type: String,
      default () {
        return 'http://img.yemuc.xyz/loading.gif'
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    unLike () {
      this.$emit('func', '')
    }
  }
}
</script>

<style scoped>
.el-card:hover {
  transform: translate(0px, -3px);
  box-shadow: 0px 5px 5px 2px rgba(0, 0, 0, 0.5);
}
.el-card {
  margin: 5px;
  padding: 0;
  height: 300px;
  border-radius: 5px;
}
.card-header {
  width: 100%;
  height: 10%;
  /* border: solid 1px; */
}
.card-img {
  height: 50%;
  overflow: hidden;
}
.card-name {
  margin-top: 5px;
  height: 10%;
  overflow: hidden;
}
.card-info {
  margin-top: 5px;
  height: 20%;
  overflow: hidden;
}
.card-price {
  height: 10%;
  overflow: hidden;
}
.unLikeBtn {
  color: rgba(0, 0, 0, 0.5);
  display: none;
  float: right;
  margin: 0px auto;
  margin-top: -26px;
  margin-right: -16px;
}
.unLikeBtn:hover {
  background-color: rgb(161, 11, 11);
  color: white;
}
.el-card:hover .unLikeBtn {
  display: block;
  width: 16px;
  height: 16px;
}
.image {
  width: 100%;
  height: 100%;
  display: block;
}
.info {
  overflow: hidden;
  font-size: 13px;
  color: #999;
  word-break: break-all;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
}
.name {
  overflow: hidden;
  font-size: 15px;
  word-break: break-all;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
}
.price {
  color: rgb(223, 7, 7);
  font-weight: bold;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}
</style>
