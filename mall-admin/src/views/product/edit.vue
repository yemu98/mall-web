<template>
  <el-form
    label-position="right"
    style="width:400px"
    label-width="80px"
    :model="product"
    :rules="rules"
    ref="product"
    status-icon
  >
    <el-form-item label="商品名" prop="name">
      <el-input v-model="product.name"></el-input>
    </el-form-item>
    <el-form-item label="品牌" prop="brand">
      <el-input v-model="product.brand"></el-input>
    </el-form-item>
    <el-form-item label="描述信息" prop="info">
      <el-input type="textarea" maxlength="100" :show-word-limit="true" v-model="product.info"></el-input>
    </el-form-item>
    <el-form-item label="价格" prop="price">
      <el-input v-model="product.price"></el-input>
    </el-form-item>
    <el-form-item label="上架" prop="status">
      <el-switch v-model="product.status" active-value="true" inactive-value="false"></el-switch>
    </el-form-item>
    <el-form-item label="库存" prop="stock">
      <el-input type="number" v-model="product.stock"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="resetForm()">恢复</el-button>
      <el-button type="primary" @click="update(product)" :loading="loading">更新</el-button>
    </el-form-item>
    <el-form-item>
      <el-row type="flex">
        <el-col v-for="(img,id) in imgList" :key="id">
          <el-image :src="img.url" style="width:100px"></el-image>
        </el-col>
      </el-row>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'productEdit',
  data () {
    var checkPrice = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('价格不能为空'))
      }
      if (isNaN(value) || !isFinite(value)) {
        return callback(new Error('请输入合法数字'))
      }
      callback()
    }
    return {
      product: {},
      imgList: [],
      loading: false,
      rules: {
        price: [
          { validator: checkPrice, trigger: 'blur' }
        ]
      }
    }
  },
  components: {
  },
  created () {
  },
  computed: {
    id: function () {
      return this.$route.params.id
    }
  },
  mounted () {
    this.getData(this.id)
    this.getImg(this.id)
  },
  methods: {
    getData (id) {
      this.$axios.get('/product/' + id)
        .then((res) => {
          this.product = res.data.data
        })
    },
    getImg (id) {
      this.$axios.get('/product/' + id + '/img')
        .then((res) => {
          this.imgList = res.data.data
        })
    },
    resetForm () {
      this.getData(this.id)
      this.getImg(this.id)
    },
    update (product) {
      this.$axios.put('/product/' + this.id, product)
        .then((res) => {
          this.$message({
            showClos: true,
            message: res.data.message,
            type: res.data.status == 200 ? 'success' : 'error'
          })
          this.resetForm()
        })
    }
  }
}
</script>

<style scoped>
</style>