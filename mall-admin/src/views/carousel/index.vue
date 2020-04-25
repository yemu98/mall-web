<template>
  <div>
      <carouselTable :tableData="tableData" @reload="getData()"></carouselTable>
  </div>
</template>

<script>
import carouselTable from './components/table'
export default {
  name: 'carousel',
  data () {
    return {
      tableData: []
    }
  },
  components:{
      carouselTable: carouselTable
  },
  created () {
      this.getData()
     
  },
  methods: {
    getData () {
      this.$axios.get('/carousel')
        .then((res) => {
          this.tableData = res.data.data
        })
    }
  }
}
</script>

<style scoped>
</style>