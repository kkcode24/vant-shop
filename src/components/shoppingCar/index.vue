<template>
    <div>
        <van-popup 
            v-model="$store.state.shoppingCar.show"
            closeable
            position="bottom"
        >
            <div class="cart_content">

            </div>
        </van-popup>
    </div>
</template>

<script>
export default {
    name: 'shoppingCar',
    data() {
        return {
        }
    },
    methods: {
        
    }
}
</script>

<style rel="stylesheet/scss" scoped lang="scss">
   .cart_content {
       height: 100px;
       background: red;
   }
</style>