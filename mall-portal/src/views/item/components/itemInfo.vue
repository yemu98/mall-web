<template>
  <div class="item-info-wrap">
    <el-row>
      <el-col :span="24" class="item-info-text-wrap">
        <p class="item-info-name">{{ product.name }}</p>
        <p class="item-info-text">{{ product.info }}</p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="item-info-price-wrap">
        <span class="text">售 价:</span>
        <p class="item-info-price">￥{{ product.price }}</p>
        <br />
        <p class="text">库 存:</p>
        <p class="item-info-status">{{ product.stock>0?'有货':'缺货' }}</p>
      </el-col>
    </el-row>
    <el-row class="buy-wrap">
      <el-col :span="3">
        <el-input-number v-model="number" :min="1" :max="product.stock"></el-input-number>
      </el-col>
      <el-col :span="5" :offset="12">
        <el-button
          @click="addToCart(product.id,number)"
          type="danger"
          :disabled="!product.stock>0"
        >加入购物车</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'itemInfo',
  data () {
    return {
      number: 1
    }
  },
  props: {
    product: {
      id: '',
      info: '',
      name: '',
      brand: '',
      price: '',
      category: '',
      status: false,
      stock: 0,
      createTime: '',
      updateTime: ''
    }
  },
  methods: {
    addToCart (pid, num) {
      if (!this.$store.state.isLogin){
         this.$message({
            showClose: true,
            message: '请先登录',
            type: 'error'
          })
          this.$router.push('/login')
          return
      }
      let cart = this.qs.stringify({
        pid: pid,
        num: num
      })
      this.$axios.post('/cart', cart
      )
        .then((res) => {
          this.$message({
            showClose: true,
            message: res.data.message,
            type: 'success'
          })
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: err,
            type: 'error'
          })
        })
    }
  }
}
</script>
<style scoped>
.text {
  font-weight: 100;
  color: #666;
  display: inline;
  line-height: 100%;
  font-size: 14px;
}
.item-info-wrap {
  display: flex;
  flex-direction: column;
}
.item-info-text-wrap {
  word-break: break-all;
  word-wrap: break-word;
  height: 50%;
}
.item-info-name {
  font-weight: 400;
  font-size: 24px;
  line-height: 1;
  color: #212121;
  padding-top: 10px;
  margin-bottom: 5px;
  overflow: hidden;
  word-break: break-all;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
}
.item-info-text {
  font-weight: 400;
  font-size: 14px;
  overflow: hidden;
  color: red;
  word-break: break-all;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
}
.item-info-price-wrap {
  background-color: rgba(0, 0, 0, 0.02);
}
.item-info-price {
  display: inline-flex;
  font-size: 150%;
  color: red;
}
.item-info-status {
  display: inline-flex;
}
.buy-wrap {
  /* align-items: flex-end; */
  margin-top: 10px;
}
.item-version-wrap {
  flex-wrap: wrap;
}
.item-version {
  flex-grow: 1;
}
</style>