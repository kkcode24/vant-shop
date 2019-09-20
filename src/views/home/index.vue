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
      ]
    };
  },
  methods: {
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
</style>
