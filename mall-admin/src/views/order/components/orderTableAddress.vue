<template>
  <div>
    <el-popover
      placement="top-start"
      :title="address.name"
      width="200"
      trigger="hover"
      :content="addressText"
    >
      <div slot="reference">{{address.name}}</div>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: 'orderTableAddress',
  data () {
    return {
      address: {}
    }
  },
  props: {
    addressId: {
      default: 0
    }
  },
  computed: {
    addressText () {
      return this.address.phone+' '+this.address.address
    }
  },
  created () {
    this.getAddress(this.addressId)
  },
  methods: {
    getAddress (addressId) {
      this.$axios.get('/address/' + addressId)
        .then((res) => {
          this.address = res.data.data.address
        })
    }
  }
}
</script>

<style scoped>
</style>