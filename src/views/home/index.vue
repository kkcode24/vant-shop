<template>
  <div
    class="page"
    v-cloak
  >
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
          v-for="(item, index) in images"
          :key="index"
        >
          <img :src="prefixAttachs+item.image" />
        </van-swipe-item>
      </van-swipe>

      <div class="lazy-component__image">
        <div
          class="cap-image-ad__swipe__background-center"
          v-lazy:background-image="adSrc"
        />
      </div>
    </section>

    <!-- 搜索 -->
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
          <div
            @click="$router.push({ name: 'coupon' })"
            class="router-image"
          >
            <img :src="modulesEntry.coupon">
          </div>
          <div class="nav-title">
            领券中心
          </div>
        </van-col>
        <van-col span="6">
          <div
            @click="$router.push({ name: 'news' })"
            class="router-image"
          >
            <img :src="modulesEntry.news">
          </div>
          <div class="nav-title">
            新品预售
          </div>
        </van-col>
        <van-col span="6">
          <div
            @click="$router.push({ name: 'signin' })"
            class="router-image"
          >
            <img :src="modulesEntry.signin">
          </div>
          <div class="nav-title">
            每日签到
          </div>
        </van-col>
        <van-col span="6">
          <div
            @click="$router.push({ name: 'salesman' })"
            class="router-image"
          >
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
          <div
            @click="$router.push({ name: 'groupDiscount' })"
            class="router-big-image"
          >
            <img :src="modulesEntry.ptzk">
          </div>
        </van-col>
        <van-col span="12">
          <div
            @click="$router.push({ name: 'integralMall' })"
            class="router-big-image"
          >
            <img :src="modulesEntry.jfsc">
          </div>
        </van-col>
      </van-row>
      <van-row
        type="flex"
        justify="space-around"
      >
        <van-col span="24">
          <div class="router-big-image">
            <img :src="modulesEntry.mzsx">
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="goods-swipe-container">
      <van-swipe
        :loop="false"
        :show-indicators="false"
        :width="115"
        :height="200"
      >
        <van-swipe-item
          v-for="(item,index) in newGoods"
          :key="index"
        >
          <li @click="goDetail(item)" class="good-item">
            <a class="cap-goods-layout__item">
              <div class="cap-goods__photo">
                <div
                  class="cap-goods__img--cover"
                  v-lazy:background-image="appleImg"
                />
              </div>
              <div class="cap-goods-layout__info">
                <div class="cap-goods-layout__info-title">
                  <h3 class="title">{{item.fruitDescribe}}</h3>
                </div>
                <div class="cap-goods-layout__info-price">
                  <div class="price-info">
                    <span class="sale-price">
                      <div class="cap-theme-view">
                        <span class="price-tag">¥</span>{{item.price}}
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </li>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 水果list -->
    <div class="goods">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="goods-list-wrapper">
          <ul class="cap-goods-layout-container">
            <li class="good-item">
              <a class="cap-goods-layout__item">
                <div class="cap-goods__photo">
                  <div
                    class="cap-goods__img--cover"
                    v-lazy:background-image="appleImg"
                  />
                </div>
                <div class="cap-goods-layout__info">
                  <div class="cap-goods-layout__info-title">
                    <h3 class="title">泰国进口椰青原箱 2个装 单果重750g以上 （赠送开椰器和吸管） 新鲜水</h3>
                  </div>
                  <div class="cap-goods-layout__info-price">
                    <div class="price-info">
                      <span class="sale-price">
                        <div class="cap-theme-view">
                          <span class="price-tag">¥</span>39
                        </div>
                      </span>
                    </div>
                    <div
                      @click.stop="showShop"
                      class="cap-goods-layout__buy-btn-wrapper"
                    >
                      <van-icon
                        class="cap-goods-layout__buy-btn"
                        name="add-o"
                      />
                    </div>
                  </div>
                </div>
              </a>
            </li>
            <li class="good-item">
              <a class="cap-goods-layout__item">
                <div class="cap-goods__photo">
                  <div
                    class="cap-goods__img--cover"
                    v-lazy:background-image="goodsImg"
                  />
                </div>
                <div class="cap-goods-layout__info">
                  <div class="cap-goods-layout__info-title">
                    <h3 class="title">泰国进口椰青原箱 2个装 单果重750g以上 （赠送开椰器和吸管） 新鲜水</h3>
                  </div>
                  <div class="cap-goods-layout__info-price">
                    <div class="price-info">
                      <span class="sale-price">
                        <div class="cap-theme-view">
                          <span class="price-tag">¥</span>39
                        </div>
                      </span>
                    </div>
                    <div
                      @click.stop="showShop"
                      class="cap-goods-layout__buy-btn-wrapper"
                    >
                      <van-icon
                        class="cap-goods-layout__buy-btn"
                        name="add-o"
                      />
                    </div>
                  </div>
                </div>
              </a>
            </li>
            <li class="good-item">
              <a class="cap-goods-layout__item">
                <div class="cap-goods__photo">
                  <div
                    class="cap-goods__img--cover"
                    v-lazy:background-image="appleImg"
                  />
                </div>
                <div class="cap-goods-layout__info">
                  <div class="cap-goods-layout__info-title">
                    <h3 class="title">泰国进口椰青原箱 2个装 单果重750g以上 （赠送开椰器和吸管） 新鲜水</h3>
                  </div>
                  <div class="cap-goods-layout__info-price">
                    <div class="price-info">
                      <span class="sale-price">
                        <div class="cap-theme-view">
                          <span class="price-tag">¥</span>39
                        </div>
                      </span>
                    </div>
                    <div
                      @click.stop="showShop"
                      class="cap-goods-layout__buy-btn-wrapper"
                    >
                      <van-icon
                        class="cap-goods-layout__buy-btn"
                        name="add-o"
                      />
                    </div>
                  </div>
                </div>
              </a>
            </li>
            <li class="good-item">
              <a class="cap-goods-layout__item">
                <div class="cap-goods__photo">
                  <div
                    class="cap-goods__img--cover"
                    v-lazy:background-image="appleImg"
                  />
                </div>
                <div class="cap-goods-layout__info">
                  <div class="cap-goods-layout__info-title">
                    <h3 class="title">泰国进口椰青原箱 2个装 单果重750g以上 （赠送开椰器和吸管） 新鲜水</h3>
                  </div>
                  <div class="cap-goods-layout__info-price">
                    <div class="price-info">
                      <span class="sale-price">
                        <div class="cap-theme-view">
                          <span class="price-tag">¥</span>39
                        </div>
                      </span>
                    </div>
                    <div
                      @click.stop="showShop"
                      class="cap-goods-layout__buy-btn-wrapper"
                    >
                      <van-icon
                        class="cap-goods-layout__buy-btn"
                        name="add-o"
                      />
                    </div>
                  </div>
                </div>
              </a>
            </li>
            <li class="good-item">
              <a class="cap-goods-layout__item">
                <div class="cap-goods__photo">
                  <div
                    class="cap-goods__img--cover"
                    v-lazy:background-image="goodsImg"
                  />
                </div>
                <div class="cap-goods-layout__info">
                  <div class="cap-goods-layout__info-title">
                    <h3 class="title">泰国进口椰青原箱 2个装 单果重750g以上 （赠送开椰器和吸管） 新鲜水</h3>
                  </div>
                  <div class="cap-goods-layout__info-price">
                    <div class="price-info">
                      <span class="sale-price">
                        <div class="cap-theme-view">
                          <span class="price-tag">¥</span>39
                        </div>
                      </span>
                    </div>
                    <div
                      @click.stop="showShop"
                      class="cap-goods-layout__buy-btn-wrapper"
                    >
                      <van-icon
                        class="cap-goods-layout__buy-btn"
                        name="add-o"
                      />
                    </div>
                  </div>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { getIndexSwipeImages, getNewFruits } from "@/api/app";
export default {
  name: "home",
  data() {
    return {
      prefixAttachs: this.app.prefixAttachs,
      value: "",
      activeSearch: false,
      adSrc: "../../../static/images/index/ad-swipe.jpg",
      images: [], // 轮播图
      newGoods: [], // 时令上新
      modulesEntry: {
        coupon: "../../../static/images/index/coupon.png",
        news: "../../../static/images/index/news.png",
        signin: "../../../static/images/index/signin.png",
        distribution: "../../../static/images/index/distribution.png",
        ptzk: "../../../static/images/index/ptzk.png",
        jfsc: "../../../static/images/index/jfsc.png",
        mzsx: "../../../static/images/index/mzsx.png"
      },
      // 当前选中分类
      active: 0,
      list: [],
      loading: false,
      finished: false,
      goodsImg: "../../../static/images/index/goods.webp",
      appleImg: "../../../static/images/index/apple.webp"
    };
  },
  mounted() {
    this.initView().then(process => {
      if (process === "done") {
        this.showAuth();
      } else {
        this.$notify({
          type: "warning",
          message: "页面初始化失败，请重试！",
          duration: 3 * 1000
        });
      }
    });
  },
  methods: {
    async initView() {
      let process = "done";
      try {
        await this.getNewFruits();
        await this.getSwipeImages();
      } catch (error) {
        process = "error";
        return process;
      }
      return process;
    },
    getNewFruits() {
      getNewFruits().then(res => {
        if (res.code === 0) {
          this.newGoods = res.data;
        }
      });
    },
    getSwipeImages() {
      getIndexSwipeImages().then(res => {
        if (res.code === 0) {
          this.images = res.data;
        }
      });
    },
    goDetail(fruit){
      this.$router.push({
        params: {id:fruit.id},
        name: 'goods'
      })
    },
    showAuth() {
      if (!this.$store.getters.isAuth) {
        this.$store.commit("OPEN_AUTH");
      }
    },
    showShop() {
      this.$store.commit("OPEN_SHOPPING");
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 20; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
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

.modules-entry {
  padding: 0 10px;
  background: #fff;
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
.goods-swipe-container {
  padding: 0 10px;
  background-color: #f8f8f8;
  .good-item {
    list-style: none;
    a.cap-goods-layout__item {
      display: block;
      margin: 5px;
      position: relative;
      min-height: 50px;
      color: #333;
      background: transparent;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      overflow: hidden;
      .cap-goods__photo {
        padding-top: 100%;
        position: relative;
        .cap-goods__img--cover {
          width: 100%;
          background-position: 50%;
          background-repeat: no-repeat;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          background-size: cover;
        }
      }
      .cap-goods-layout__info {
        padding: 0 10px;
        position: relative;
        .cap-goods-layout__info-title {
          margin: 10px 0 0;
          text-align: left;
          h3.title {
            font-weight: normal;
            font-size: 12px;
            height: 30px;
            max-height: 30px;
            overflow: hidden;
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
        .cap-goods-layout__info-price {
          position: relative;
          width: 100%;
          .price-info {
            font-weight: normal;
            padding-right: 25px;
            height: 30px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            align-content: center;
            .sale-price {
              color: #f44;
              height: 14px;
              line-height: 14px;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
.goods {
  padding-bottom: 100px;
  .goods-list-wrapper {
    overflow: hidden;
    ul.cap-goods-layout-container {
      overflow: hidden;
      padding-left: 15px;
      padding-right: 15px;
      margin-left: -5px;
      margin-right: -5px;
      .good-item {
        float: left;
        width: 33.33%;
        a.cap-goods-layout__item {
          display: block;
          margin: 5px;
          position: relative;
          min-height: 50px;
          color: #333;
          background: transparent;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          overflow: hidden;
          .cap-goods__photo {
            padding-top: 100%;
            position: relative;
            .cap-goods__img--cover {
              width: 100%;
              background-position: 50%;
              background-repeat: no-repeat;
              position: absolute;
              top: 0;
              left: 0;
              bottom: 0;
              right: 0;
              background-size: cover;
            }
          }
          .cap-goods-layout__info {
            padding: 0 10px;
            position: relative;
            .cap-goods-layout__info-title {
              margin: 10px 0 0;
              text-align: left;
              h3.title {
                font-weight: normal;
                font-size: 12px;
                height: 30px;
                max-height: 30px;
                overflow: hidden;
                word-break: break-all;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
              }
            }
            .cap-goods-layout__info-price {
              position: relative;
              width: 100%;
              .price-info {
                font-weight: normal;
                padding-right: 25px;
                height: 30px;
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                align-content: center;
                .sale-price {
                  color: #f44;
                  height: 14px;
                  line-height: 14px;
                  font-size: 14px;
                }
              }
              .cap-goods-layout__buy-btn-wrapper {
                position: absolute;
                top: 5px;
                right: 0;
                height: 20px;
                .cap-goods-layout__buy-btn {
                  color: #f44;
                  font-size: 20px;
                  height: 20px;
                  line-height: 20px;
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
