<template>
  <div>
    <el-rate v-model="grade" show-text></el-rate>
    <el-input v-model="content" placeholder="写下您的感受吧~~"></el-input>
    <el-button @click="submit()">提交</el-button>
  </div>
</template>

<script>
export default {
  name: 'createReview',
  data () {
    return {
      content: '',
      grade: 5,
      orderNumber: ''
    }
  },
  created () {
      this.orderNumber = this.$route.query.orderNumber
  },
  methods: {
      submit () {
          let review = this.qs.stringify({
              orderNumber: this.orderNumber,
              content: this.content,
              grade: this.grade
          })
          this.$axios.post('/review',review)
          .then((res) =>{
              this.$message({
                  showClosr: true,
                  message: res.data.message,
                  type: 'success'
              })
          })
      }
  }
}
</script>

<style scope>
</style>