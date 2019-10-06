<template>
  <div class="main">
    <h1>支付金额：<span class="money">{{$route.params.Amount || 0}}</span>元</h1>
    <div class="pay-zfb pay-type" @click="choose('ali')">
      <img src="../../assets/zhifubao.png" alt="">
      <p class="cn">支付宝支付</p>
      <p class="en">pay treasure to pay</p>
      <div class="mui-radio mui-right">
        <input type="radio" name="pay-type" v-model="payType" value="ali">
      </div>
    </div>
    <div class="pay-wx pay-type" @click="choose('wx')">
      <!-- <img src="../assets/images/weixin.png" alt=""> -->
      <p class="cn">微信支付</p>
      <p class="en">WaChat pay</p>
      <div class="mui-radio mui-right">
        <input type="radio" name="pay-type" v-model="payType" value="wx">
      </div>
    </div>
    <button type="button" @click="submit">立即支付</button>
  </div>
</template>
<script>
export default {
    name: 'pay',
    data(){
        return {

        }
    },
    methods:{
        choose(){

        },
        submit(){

        }
    }
}
</script>