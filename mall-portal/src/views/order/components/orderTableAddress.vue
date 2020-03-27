<template>
  <div>{{address.name}}</div>
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