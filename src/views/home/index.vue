<template>
  <div>
    <van-notice-bar
      left-icon="volume-o"
      mode="closeable"
    >
      受国庆影响。南京快递严查，快递时效不保证请理解，感谢您的惠顾。
    </van-notice-bar>

    <section class="banner-swipe">
      <van-swipe
        :autoplay="3000"
        indicator-color="white"
      >
        <van-swipe-item
          v-for="(image, index) in images"
          :key="index"
        >
          <img :src="image" />
        </van-swipe-item>
      </van-swipe>

      <div class="lazy-component__image">
        <div
          class="cap-image-ad__swipe__background-center"
          v-lazy:background-image="adSrc"
        />
      </div>
    </section>

    <div class="showcase-search">
      <div class="showcase-search-wap">
        <div class="cap-search-box">
          <div class="cap-search">
            <van-search placeholder="输入产品的关键字，如“苹果”" />
          </div>
          <div
            @click="$router.push({ name: 'search' })"
            class="showcase-search-mask"
          >
          </div>
        </div>
      </div>
    </div>

    <div class="modules-entry">
      <van-row
        type="flex"
        justify="space-around"
      >
        <van-col span="6">
          <div @click="$router.push({ name: 'coupon' })" class="router-image">
            <img :src="modulesEntry.coupon">
          </div>
          <div class="nav-title">
            领券中心
          </div>
        </van-col>
        <van-col span="6">
          <div @click="$router.push({ name: 'news' })" class="router-image">
            <img :src="modulesEntry.news">
          </div>
          <div class="nav-title">
            新品预售
          </div>
        </van-col>
        <van-col span="6">
          <div @click="$router.push({ name: 'signin' })" class="router-image">
            <img :src="modulesEntry.signin">
          </div>
          <div class="nav-title">
            每日签到
          </div>
        </van-col>
        <van-col span="6">
          <div @click="$router.push({ name: 'salesman' })" class="router-image">
            <img :src="modulesEntry.distribution">
          </div>
          <div class="nav-title">
            我要代言
          </div>
        </van-col>
      </van-row>
      <van-row
        type="flex"
        justify="space-around"
      >
        <van-col span="12">
          <div @click="$router.push({ name: 'groupDiscount' })" class="router-big-image">
            <img :src="modulesEntry.ptzk">
          </div>
        </van-col>
        <van-col span="12">
          <div @click="$router.push({ name: 'integralMall' })"  class="router-big-image">
            <img :src="modulesEntry.jfsc">
          </div>
        </van-col>
      </van-row>
      <van-row
        type="flex"
        justify="space-around"
      >
        <van-col span="24">
          <div class="router-big-image" @click="showShop">
            <img :src="modulesEntry.mzsx">
          </div>
        </van-col>
      </van-row>
    </div>

  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      value: "",
      activeSearch: false,
      adSrc: "../../../static/images/index/ad-swipe.jpg",
      images: [
        "../../../static/images/index/swipe1.jpg",
        "../../../static/images/index/swipe2.jpg",
        "../../../static/images/index/swipe3.jpg",
        "../../../static/images/index/swipe4.jpg"
      ],
      modulesEntry: {
        coupon: "../../../static/images/index/coupon.png",
        news: "../../../static/images/index/news.png",
        signin: "../../../static/images/index/signin.png",
        distribution: "../../../static/images/index/distribution.png",
        ptzk: "../../../static/images/index/ptzk.png",
        jfsc: "../../../static/images/index/jfsc.png",
        mzsx: "../../../static/images/index/mzsx.png"
      }
    };
  },
  mounted() {
    this.showAuth();
  },
  methods: {
    showAuth(){
      if(!this.$store.getters.isAuth){
        this.$store.commit('OPEN_AUTH');
      }
    },
    showShop() {
      this.$store.commit('OPEN_SHOPPING');
    }
  }
};
</script>

<style lang="scss" scoped>
.banner-swipe {
  .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #66c6f2;
    img {
      display: block;
      box-sizing: border-box;
      width: 100%;
      height: 175px;
      background-color: #fff;
      pointer-events: none;
    }
  }
  .lazy-component__image {
    height: 34px;
    overflow: hidden;
    .cap-image-ad__swipe__background-center {
      width: 100%;
      height: 34px;
      background-size: cover;
    }
  }
}
.showcase-search {
  .showcase-search-wap {
    .cap-search-box {
      position: relative;
      height: 38px;
      width: 100%;
      .showcase-search-mask {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: transparent;
      }
    }
  }
}
.modules-entry {
  padding: 0 10px;
  .router-image {
    text-align: center;
    img {
      width: 75px;
      height: 75px;
    }
  }
  .nav-title {
    text-align: center;
  }
  .router-big-image {
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
