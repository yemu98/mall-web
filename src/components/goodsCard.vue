<template>
  <el-card shadow="hover" :body-style="{ padding: '20px' }">
    <img
      src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
      class="image"
    />
    <div style="padding: 10px;">
      <span>{{ name }}</span>
      <div class="bottom clearfix">
        <span class="info">{{ info }}</span>
        <p>{{ price }}</p>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default () {
        return [
          'name'
        ]
      }
    },
    info: {
      type: String,
      default () {
        return [
          'info'
        ]
      }
    },
    price: {
      type: String,
      default () {
        return [
          'price'
        ]
      }
    }
  },
  data () {
    return {
      currentDate: new Date()
    }
  }
}
</script>

<style scoped>
.el-card:hover {
  transform: translate(0px, -3px);
  box-shadow: 0px 5px 5px 2px rgba(0, 0, 0, 0.5);
}
.el-card {
  margin: 5px;
  min-height: 300px;
  /* height: 300px; */
  border-radius: 5px;
}
.info {
  font-size: 13px;
  color: #999;
}
span {
  display: inline-block;
  line-height: 24px;
  padding: 5px 0;
  margin-right: 10px;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
