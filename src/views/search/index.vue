<template>
  <div class="search-components">
    <div class="showcase-search">
      <section class="shop-search">
        <div class="cap-search-box__view">
          <form class="shop-search__form">
            <van-search
              id="pickoversearch"
              ref="searchInp"
              v-model="value"
              show-action
              placeholder="输入产品的关键字，如“苹果”"
              @search="onSearch"
              @cancel="onCancel"
            >
            </van-search>
          </form>
        </div>
        <section class="shop-search__list-wrap"></section>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      value: ""
    };
  },
  mounted(){
    document.getElementById('pickoversearch').focus();
  },
  methods: {
    onSearch() {
      console.log(this.value);
    },
    onCancel() {
      this.$router.push("/home");
    }
  }
};
</script>

<style lang="scss" scoped>
.search-components {
  .shop-search {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: #fff;
    overflow: hidden;
    z-index: 99999;
    .cap-search-box__view {
      .van-search--show-action {
        background: rgb(242, 242, 242) !important;
        .van-search__content--square {
          background: white;
        }
      }
      .van-search__action div {
        color: #06bf04;
      }
    }
  }
}
</style>
