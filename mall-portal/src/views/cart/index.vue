<template>
  <div>
    <el-button @click="get()">get</el-button>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      show-summary
      :summary-method="getSummaries"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="100"></el-table-column>
      <el-table-column label="商品" width="500">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="price" label="单价"></el-table-column>
      <el-table-column prop="number" label="数量" show-overflow-tooltip>
          <template slot-scope="scope">
           <el-input-number size="small" v-model="scope.row.number" :min="1" :max="99"></el-input-number>
        </template>
        
      </el-table-column>
      <el-table-column prop="subTotal" label="小计" show-overflow-tooltip></el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'cart',
  data () {
    return {
      search: '',
      tableData: [
        {
          number: 10,
          price: 2999.00,
          subTotal: 29999.00
        },
        {
          number: 10,
          price: 2999.00,
          subTotal: 29999.00
        },
      ],
      multipleSelection: []
    }
  },
  methods: {
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    getSummaries (param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价';
          return;
        }
        if (index === 4) {
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] += ' 元';
          } else {
            sums[index] = 'N/A';
          }
        }
      })
      return sums;
    },
    get() {
      this.$axios.get('/cart',)
      .then((res) => {
        console.log(res)
      })
    }
  }
}
</script>
<style scoped>
</style>