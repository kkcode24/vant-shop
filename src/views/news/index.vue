<template>
  <div class="page" v-cloak>
    <van-nav-bar
      title="新品预售"
      :z-index="10"
    />
    <!-- 水果list -->
    <div class="goods">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了..."
        @load="onLoad"
      >
        <div class="goods-list-wrapper">
          <ul class="cap-goods-layout-container">
            <li @click="goDetail(item)" v-for="(item,index) in list" class="good-item" :key="index">
              <a class="cap-goods-layout__item">
                <div class="cap-goods__photo">
                  <van-image
                    class="cap-goods__img--cover"
                    lazy-load 
                    :src="prefixAttachs+item.thumbnailImage"
                  >
                  <template v-slot:error>加载失败</template>
                  </van-image>
                </div>
                <div class="cap-goods-layout__info">
                  <div class="cap-goods-layout__info-title">
                    <h3 class="title">{{item.fruitDescribe}}</h3>
                  </div>
                  <div class="cap-goods-layout__info-price">
                    <div class="price-info">
                      <span class="sale-price">
                        <div class="cap-theme-view">
                          <span class="price-tag">¥{{item.price}}</span>
                        </div>
                      </span>
                    </div>
                    <div
                      @click.stop="showShopping(item.id)"
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
import { getAdvanceFruit } from "@/api/class";
import { getGoodDetail } from "@/api/app";
export default {
  name: "new",
  data() {
    return {
      prefixAttachs: this.app.prefixAttachs,
      // 当前选中分类
      active: 0,
      list: [],
      loading: false,
      finished: false,
    };
  },
  mounted() {
    this.initView().then(process => {
      if (process === "done") {
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
        // 收货地址
        this.$store.dispatch("getWxUserAddress");
      } catch (error) {
        process = "error";
        return process;
      }
      return process;
    },
    goDetail(fruit){
      fruit.id = 1
      this.$router.push({
        params: {id:fruit.id},
        name: 'goods'
      })
    },
    showShopping(fruitId) {
      fruitId = 1
      getGoodDetail(fruitId).then(res => {
        if (res.code === 0) {
          this.$store.dispatch('openSku', fruitId).then(()=>{
            this.$store.commit('ADD_GOODS', res.data)
          })
        }
      });
    },
    onLoad() {
      getAdvanceFruit({}).then(res => {
        this.loading = false
        if (res.code == 0) {
          this.list = [...res.data]
          if (this.list.length == 0) {
            this.finished = false;
          } else {
            this.finished = true
          }
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.goods {
  padding-bottom: 80px;
  flex: 1;
  height: 0;
  overflow-y: scroll;
  overflow-x: hidden;
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
