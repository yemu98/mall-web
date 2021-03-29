// 秒杀页
<template>
<div class="seckill_wrap">
    <el-button @click="test()">抢购</el-button>
</div>
</template>
<script>
export default {
    methods: {
    test(){
        this.$axios.get("http://localhost:8081/seckill/get",{key :'test' })
            .then((res) => {
                console.log(res)
            })
    }
    }
}

</script>
