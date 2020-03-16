/**商品详情 */
<template>
    <div class="item-wrap">
        <div class="item-intro-wrap">
            <!-- <img src="../../assets/logo.png"/> -->
                <item-preview class="item-preview" ></item-preview>
                <item-info class="item-info"></item-info>
        </div>
        <div class="item-detail-wrap">
            <item-deatil></item-deatil>
        </div>
    </div>
</template>

<script>   
import itemPreview from './itemPreview'
import itemInfo from './itemInfo'
import itemDeatil from './itemDeatil';
export default {
    name: 'item',
    data () {
        return {
            
        }
    },
    components:{
        'item-preview': itemPreview,
        'item-info': itemInfo,
        'item-deatil': itemDeatil

    }
}
</script>

<style>
.item-wrap{
   box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    /* border: 1px solid rgb(200, 197, 197); */
    background: white;
}
.item-intro-wrap{
    display: flex;
    /* align-items: ; */
    height:600px;
    /* border:1px solid black; */
}
.item-preview{
    width: 50%;
    align-self: center;
    /* border:1px solid rgba(129, 127, 127, 0.1); */
}
.item-info{
    width: 60%;
    margin-left: 2%;
    margin-right: 2%;
    align-self: flex-start;
    text-align: start;
       /* border:1px solid rgba(129, 127, 127, 0.1); */
}
.item-deatil-wrap{
       border:1px solid rgba(129, 127, 127, 0.1);
}
</style>