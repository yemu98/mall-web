<template>
  <div>
    <el-form :label-position="label_position" label-width="80px" :model="address">
      <el-form-item label="收件人">
        <el-input v-model="address.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="address.phone"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="address.address"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="reset">重置</el-button>
    <el-button @click="submit">提交</el-button>
  </div>
</template>

<script>
export default {
  name: 'addAddress',
  data () {
    return {
      label_position: 'right',
      address: {
        name: '',
        phone: '',
        address: ''
      }
    }
  },
  methods: {
    reset () {
      this.address = {}
    },
    submit () {
      console.log(this.address)
      let address = this.qs.stringify(this.address)
      this.$axios.post('/address', address)
        .then((res) => {
          this.$message({
            showClose: true,
            message: res.data.message,
            type: 'success'
          })
          // 返回之前的页面
          this.$router.go(-1)
        })
        .catch((err) => {
          this.$message({
            showClose: true,
            message: err.data.message,
            type: 'error'
          })
        })
    }
  }

}
</script>

<style scoped>
</style>