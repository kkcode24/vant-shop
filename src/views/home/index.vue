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
        <van-swipe-item>1</van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
      </van-swipe>
    </section>

    
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {};
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
  }
}
</style>
