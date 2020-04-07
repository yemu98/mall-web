<template>
  <div>
    <div v-for="review in reviews" :key="review.id" class="review_wrap" v-loading="loading">
      <el-row type="flex">
        <el-col class="name" :span="6">{{review.name}}</el-col>
        <el-col :span="6">
          <el-rate class="grade" v-model="review.grade" show-score disabled></el-rate>
        </el-col>
        <el-col :span="6" class="content">{{review.content}}</el-col>
        <el-col :span="6" class="createTime">{{review.createTime}}</el-col>
      </el-row>
      <el-divider></el-divider>
    </div>
  </div>
</template>

<script>
export default {
  name: 'itemReviews',
  data () {
    return {
      reviews: [],
      loading: true
    }
  },
  props: {
    pid: {
      default: 0
    }
  },
  watch: {
    // 监听商品id改变
    pid: {
      // 深度监听
      deep: true,
      handler (newval) {
        this.getReviews(newval)
      }
    }
  },
  methods: {
    getReviews (pid) {
      this.$axios.get('/product/' + pid + '/review')
        .then((res) => {
          this.reviews = res.data.data
          this.loading = false
        })
    }
  }
}
</script>

<style scope>
.name {
  justify-self: flex-start;
}

.content {
  font-size: 14px;
}
.createTime {
  font-size: 13px;
}
</style>