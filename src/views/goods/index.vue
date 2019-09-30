<template>
  <div class="goods">
    <van-swipe class="goods-swipe" :autoplay="3000">
      <div v-for="item in goods.fruitImageList" :key="item.id">
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
        <van-col v-if="goodSpecificationsList.length>0" span="10">
          运费：
          <span v-if="goodSpecificationsList[0].freightPrice>0">{{ goodSpecificationsList[0].freightPrice }}</span>
          <span v-else>免运费</span>
        </van-col>
        <van-col span="14">剩余：{{ storageNum }}</van-col>
      </van-cell>
    </van-cell-group>

    <van-goods-action>
      <van-goods-action-icon icon="chat-o" @click="sorry">客服</van-goods-action-icon>
      <van-goods-action-icon icon="cart-o" @click="onClickCart">购物车</van-goods-action-icon>
      <van-goods-action-button type="warning" @click="sorry">加入购物车</van-goods-action-button>
      <van-goods-action-button type="danger" @click="show=true">立即购买</van-goods-action-button>
    </van-goods-action>

    <van-sku v-model="show" :sku="sku" :goods="goods" :goods-id="fruitId" :hide-stock="sku.hide_stock" @buy-clicked="onBuyClicked">
      <template slot="sku-actions" slot-scope="props">
        <div class="van-sku-actions">
          <van-button square size="large" type="danger" @click="props.skuEventBus.$emit('sku:buy')">
            下一步
          </van-button>
        </div>
      </template>
    </van-sku>
  </div>
</template>

<script>
import { filterEmpyKey } from "@/utils/index";
import { getGoodDetail } from "@/api/app";
export default {
  data() {
    return {
      sku: {
        tree: [
          {
            k: "规格",
            v: [
              {
                id: "30349", // skuValueId：规格值 id
                name: "3.5-4斤" // skuValueName：规格值名称
              }
            ],
            k_s: "s1"
          }
        ],
        list: [
          {
            id: -1, // skuId，下单时后端需要
            price: 100,
            s1: "1215", // 规格类目 k_s 为 s1 的对应规格值 id
            stock_num: 0 // 当前 sku 组合对应的库存
          }
        ],
        price: 0,
        stock_num: 227, // 商品总库存
        none_sku: false,
        hide_stock: false
      },
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
          this.initSku();
        }
      });
    },
    initSku() {
      this.sku.price = this.goods.price;
      this.sku.tree[0].v = this.goodSpecificationsList.map(item => {
        this.sku.list.push({
          id: item.id,
          s1: item.id,
          price: item.price * 100,
          stock_num: item.fruitNumber,
          advancePrice: item.advancePrice,
          freightPrice: item.freightPrice,
          fruitId: item.fruitId,
          fruitNumber: item.fruitNumber,
          memberPrice: item.memberPrice,
          openingPrice: item.openingPrice,
          specifications: item.specifications
        });
        return {
          id: item.id,
          name: item.specifications
        };
      });
    },
    onBuyClicked(skuData) {
      let cacheData = filterEmpyKey({
        ...skuData.selectedSkuComb,
        fruitSpecificationsId:skuData.selectedSkuComb.id,
        totalPrice: (skuData.selectedSkuComb.price/100)*skuData.selectedNum,
        ...skuData,
        ...this.goods,
        fruitNum: skuData.selectedNum,
        s1: null,
        messages: null,
        cartMessages: null,
        fruitImageList: null,
        selectedSkuComb: null
      });
      this.$store.dispatch("setOrderCache", cacheData).then(() => {
        this.$router.push({ name: "submitOrder" });
      });
    },
    onClickCart() {
      this.$router.push({ name: "cart" });
    },
    sorry() {
      this.$toast("暂无后续逻辑~");
    }
  }
};
</script>

<style lang="scss" scope>
.goods {
  padding-bottom: 50px;
  &-swipe {
    img {
      width: 100%;
      display: block;
    }
  }
  &-title {
    font-size: 16px;
  }
  &-price {
    color: #f44;
  }
  &-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
  }
  &-cell-group {
    margin: 15px 0;
    .van-cell__value {
      color: #999;
    }
  }
  &-tag {
    margin-left: 5px;
  }
}
</style>