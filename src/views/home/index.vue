<template>
  <div>
    <van-notice-bar left-icon="volume-o" mode="closeable">
      受国庆影响。南京快递严查，快递时效不保证请理解，感谢您的惠顾。
    </van-notice-bar>

    <section class="banner-swipe">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img :src="image" />
        </van-swipe-item>
      </van-swipe>
    </section>

  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      images: [
        "../../assets/index/swipe1.png",
        "../../assets/index/swipe2.png",
        "../../assets/index/swipe3.png",
        "../../assets/index/swipe4.png"
      ]
    };
  },
  methods: {}
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
      height: 240px;
      background-color: #fff;
      pointer-events: none;
    }
  }
}
</style>
