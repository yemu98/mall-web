<template>
  <el-form
    label-position="right"
    style="width:400px"
    label-width="80px"
    :model="carousel"
    :rules="rules"
    ref="carousel"
    status-icon
    v-loading="loading"
  >
    <el-form-item label="目标链接" prop="link">
      <el-input v-model="carousel.link"></el-input>
    </el-form-item>
    <el-form-item label="描述" prop="info">
      <el-input v-model="carousel.info"></el-input>
    </el-form-item>
    <el-form-item label="轮播图" prop="imgUrl">
      <el-upload
        action="http://127.0.0.1:8082/uploadImg"
        list-type="picture-card"
        name="img"
        accept="image/png, image/jpeg, image/jpg"
        :show-file-list="false"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        v-if="showUpload"
      >
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1M</div>
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-image v-if="carousel.imgUrl" :src="carousel.imgUrl" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm()" :loading="loading">完成</el-button>
      <el-button @click="resetForm('carousel')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'carouselAdd',
  data () {
    return {
      carousel: {
        link: '',
        imgUrl: '',
        info: ''
      },
      showUpload: true,
      loading: false,
      rules: {}
    }
  },
  created () {

  },
  methods: {
    beforeUpload () {

    },
    handleSuccess (res, file) {
      file.url = res.data.img.url// 修改文件信息
      file.id = res.data.img.id
      this.carousel.imgUrl = res.data.img.url
      this.showUpload = false
    },
    submitForm () {
      this.loading = true
    //   let carousel = this.qs.stringify(this.carousel)
      this.$axios.post('/carousel',this.carousel)
        .then((res) => {
          this.$message({
            showClose: true,
            message: res.data.message,
            type: 'success'
          })
          this.loading = false
          this.resetForm('carousel')
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: err.response.data.message,
            type: 'error'
          })
          this.loading = false
        })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
</style>