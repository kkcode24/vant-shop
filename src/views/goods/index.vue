<template>
  <div class="goods">
    <van-swipe
      class="goods-swipe"
      :autoplay="3000"
    >
      <div
        v-for="item in goods.fruitImageList"
        :key="item.id"
      >
        <van-swipe-item v-if="item.type===2">
          <img :src="app.prefixAttachs+item.image">
        </van-swipe-item>
      </div>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <div class="goods-title">{{ goods.fruitDescribe }}</div>
        <div class="goods-price">¥ {{ goods.price }}</div>
      </van-cell>
      <van-cell class="goods-express">
        <van-col
          v-if="goodSpecificationsList.length>0"
          span="10"
        >
          运费：
          <span v-if="goodSpecificationsList[0].freightPrice>0">{{ goodSpecificationsList[0].freightPrice }}</span>
          <span v-else>免运费</span>
        </van-col>
        <van-col span="14">剩余：{{ storageNum }}</van-col>
      </van-cell>
    </van-cell-group>

    <div class="goods-detail">
      <h3>商品详情</h3>
      <div
      class="goods-detail-image"
        v-for="item in goods.fruitImageList"
        :key="item.id"
      >
        <van-image
          v-if="item.type===3"
          :src="app.prefixAttachs+item.image"
        />
      </div>
    </div>

    <van-goods-action>
      <van-goods-action-icon
        icon="chat-o"
      >客服</van-goods-action-icon>
      <van-goods-action-icon
        icon="cart-o"
        @click="onClickCart"
      >购物车</van-goods-action-icon>
      <van-goods-action-button
        type="warning"
        @click="onAddCart"
      >加入购物车</van-goods-action-button>
      <van-goods-action-button
        type="danger"
        @click="onBuyClicked"
      >立即购买</van-goods-action-button>
    </van-goods-action>
  </div>
</template>

<script>
import { filterEmpyKey } from "@/utils/index";
import { getGoodDetail } from "@/api/app";
export default {
  data() {
    return {
      show: false,
      fruitId: "",
      storageNum: 0,
      goods: {},
      goodSpecificationsList: []
    };
  },
  mounted() {
    this.fruitId = this.$route.params.id;
    this.initView();
  },
  methods: {
    initView() {
      getGoodDetail(this.fruitId).then(res => {
        if (res.code === 0) {
          this.storageNum = res.data.storageNum;
          this.goodSpecificationsList = res.data.fruitSpecificationsList;
          let thumb = res.data.fruit.fruitImageList.filter(item => {
            return item.type === 1;
          });
          this.goods = Object.assign({}, res.data.fruit, {
            title: res.data.fruit.name,
            picture: this.app.prefixAttachs + thumb[0].image
          });
        }
      });
    },
    onBuyClicked() {
      getGoodDetail(this.fruitId).then(res => {
        if (res.code === 0) {
          this.$store.dispatch('openSku',3).then(()=>{
            this.$store.commit('ADD_GOODS', res.data)
          })
        }
      });
    },
    onClickCart() {
      this.$router.push({ name: "cart" });
    },
    onAddCart() {
      getGoodDetail(this.fruitId).then(res => {
        if (res.code === 0) {
          this.$store.dispatch('openSku',2).then(()=>{
            this.$store.commit('ADD_GOODS', res.data)
          })
        }
      });
    }
  }
};
</script>

<style lang="scss" scope>
.goods {
  padding-bottom: 50px;
  .goods-swipe {
    img {
      width: 100%;
      display: block;
    }
  }
  .goods-title {
    font-size: 16px;
  }
  .goods-price {
    color: #f44;
  }
  .goods-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
  }
  .goods-cell-group {
    margin: 15px 0;
    .van-cell__value {
      color: #999;
    }
  }
  .goods-tag {
    margin-left: 5px;
  }
  .goods-detail {
    margin-top: 20px;
    h3 {
      padding: 10px;
      text-align: center;
      background-color: #fff;
    }
    .goods-detail-image {
      padding: 10px;
    }
  }
}
</style>