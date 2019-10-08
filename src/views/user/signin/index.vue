<template>
  <div class="c-page__container">
    <div class="l-sign__container">
      <header class="l-sign__header">
        <p v-if="user.isRegister" class="c-header__reward">今日已签到</p>
        <p v-else class="c-header__reward">今日未签到</p>
        <p class="c-header__duration">当前周期已连续签到{{user.registerDays}}天</p>
        <p @click="showRule" class="c-header__rule">
          签到规则
        </p>
      </header>
      <calendar></calendar>
      <div class="l-sign__reward">
        <div class="c-reward__time">当月连签有机会领取以下奖励:</div>
        <div class="l-prize__container">
          <div class="l-reward__list">
            <swiper :options="swiperOption">
              <swiper-slide v-for="(item,index) in registerIntegralList" :key="index" class="c-reward__item">
                <div class="c-item__duration">连续{{item.days}}天</div>
                <div class="l-general__desc c-item__desc">
                  <span class="c-item__desc--left">￥</span>
                  <span class="c-item__desc--middle">{{item.couponPrice}}</span>
                  <span class="c-item__desc--right">券</span>
                </div>
                <img src="https://img.yzcdn.cn/wsc/sign/coupon-part.png" class="c-item__icon">
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {signin} from "@/api/app"
import calendar from "@/components/calendar/index";
export default {
  name: "signin",
  components: { calendar },
  data() {
    return {
      user:{},
      registerIntegralList:[],
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 10
      }
    };
  },
  mounted(){
    this.user = this.$store.getters.userInfo;
    this.goSignIn();
  },
  methods: {
    goSignIn(){
      signin().then(res=>{
        if(res.code === 0){
          this.registerIntegralList = res.data.registerIntegralList;
          this.$store.dispatch('getActionWxUserInfo').then(r=>{
            if(r.code===0){
              this.user = r.data;
            }
          })
        }
      })
    },
    showRule(){
      this.$dialog.alert({
        title: '签到规则',
        confirmButtonText: '我知道了',
        messageAlign: 'left',
        message: '1.每日签到可以获得日签奖励，在单个周期内连续签到可以获得连签奖励，同1个周期内最多可领取1次；\n2.每日最多可签到1次，断签则会重新计算连签天数；\n3.活动以及奖励最终解释权归商家所有。'
      })
    },
  }
};
</script>

<style lang="scss" scoped>
.c-page__container {
  min-height: 100vh;
  padding-bottom: 15px;
  background-image: -webkit-radial-gradient(8% 18%, #ffa832 0, #ff9300 93%);
  background-image: -moz- oldradial-gradient(8% 18%, #ffa832 0, #ff9300 93%);
  background-image: radial-gradient(8% 18%, #ffa832 0, #ff9300 93%);
  .l-sign__container {
    .l-sign__header {
      color: #fff;
      background-image: url(https://img.yzcdn.cn/wsc/sign/head-bg-new.png);
      background-size: cover;
      position: relative;
      padding: 25px 0 25px 15px;
      font-family: PingFangSC-Medium;
      .c-header__reward {
        font-family: PingFangSC-Semibold;
        font-size: 20px;
        line-height: 28px;
        text-shadow: 0 0 8px #df8800;
      }
      .c-header__duration {
        font-size: 14px;
        line-height: 16px;
        margin-top: 10px;
      }
      .c-header__rule {
        position: absolute;
        top: 0;
        right: 15px;
        font-size: 12px;
        line-height: 22px;
        padding: 5px;
        text-align: center;
        border-radius: 0 0 5px 5px;
        color: #9b3536;
        background-color: #fff;
        opacity: .5;
        box-shadow: 0 2px 4px 0 rgba(253,238,219,.3);
      }
    }
    .l-sign__reward {
      margin: 15px 15px 0;
      padding: 15px 1px 15px 15px;
      background-color: #fff;
      border-radius: 4px;
      .c-reward__time {
        font-size: 14px;
        line-height: 20px;
        color: #a25700;
        margin-bottom: 11px;
      }
      .l-prize__container {
        .l-reward__list {
          font-size: 12px;
          line-height: 16px;
          color: #a25700;
          .c-reward__item {
            width: 110px;
            padding: 10px 0 8px 10px;
            background: #ffdd9e;
            box-shadow: 0 2px 4px 0 rgba(215,104,0,.2);
            border-radius: 4px;
            margin-right: 10px;
            font-family: PingFangSC-Regular;
            position: relative;
            overflow: hidden;
            .l-general__desc {
              color: #a25700;
              display: -webkit-box;
              display: -moz-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              -moz-box-orient: vertical;
              -moz-line-clamp: 2;
              overflow: hidden;
              margin-top: 10px;
              height: 32px;
              width: 100px;
              .c-item__desc--left {
                font-size: 12px;
                line-height: 16px;
              }
              .c-item__desc--middle {
                font-family: PingFangSC-Medium;
                font-size: 20px;
                height: 32px;
                line-height: 32px;
                margin-right: 5px;
              }
            }
            .c-item__icon {
              width: 34px;
              height: 30px;
              position: absolute;
              bottom: 0;
              right: 0;
            }
          }
        }
      }
    }
  }
}
</style>
