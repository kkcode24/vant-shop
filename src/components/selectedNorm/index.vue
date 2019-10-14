<template>
  <div>
    <div class="van-sku-container" >
      <van-sku
        v-model="$store.state.shoppingCar.show"
        :sku="sku"
        :goods="goods"
        :goods-id="$store.state.shoppingCar.fruit.id"
        :hide-stock="sku.hide_stock"
        @buy-clicked="onBuyClicked"
        @add-cart="onAddCartClicked"
        
      >
        <template
          slot="sku-actions"
          slot-scope="props"
        >
          <div class="van-sku-actions" v-if="$store.state.shoppingCar.show" >
            <van-button
              v-if="$store.state.shoppingCar.type===1||$store.state.shoppingCar.type===2"
              square
              size="large"
              type="danger"
              @click="props.skuEventBus.$emit('sku:addCart')"
            >
              加入购物车
            </van-button>
            <van-button
              v-if="$store.state.shoppingCar.type===1"
              square
              size="large"
              type="danger"
              @click="props.skuEventBus.$emit('sku:buy')"
            >
              立即购买
            </van-button>
            <van-button
              v-if="$store.state.shoppingCar.type===3"
              square
              size="large"
              type="danger"
              @click="props.skuEventBus.$emit('sku:buy')"
            >
              下一步
            </van-button>
          </div>
        </template>
      </van-sku>
    </div>
  </div>
</template>

<script>
import { addFriutToCart } from "@/api/shopingCart";
import { filterEmpyKey } from "@/utils/index";
export default {
  name: "shoppingCar",
  data() {
    return {};
  },
  methods: {
    onAddCartClicked(skuData){
      let postData = this.dealSkuData(skuData);
      addFriutToCart(postData).then(res=>{
        if(res.code===0){
          this.$store.state.shoppingCar.show = false;
          this.$toast("添加成功")
        }
      })
    },
    onBuyClicked(skuData) {
      let cacheData = this.dealSkuData(skuData);
      this.$store.dispatch("setOrderCache", cacheData).then(() => {
        this.$store.state.shoppingCar.show = false;
        this.$router.push({ name: "submitOrder" });
      });
    },
    dealSkuData(skuData){
      return filterEmpyKey({
        ...skuData.selectedSkuComb,
        fruitSpecificationsId: skuData.selectedSkuComb.id,
        totalPrice: (skuData.selectedSkuComb.price / 100) * skuData.selectedNum,
        ...skuData,
        ...this.goods,
        fruitNum: skuData.selectedNum,
        price: skuData.selectedSkuComb.price / 100,
        s1: null,
        messages: null,
        cartMessages: null,
        fruitImageList: null,
        selectedSkuComb: null
      });
    }
  },
  computed: {
    storageNum() {
      return this.$store.state.shoppingCar.fruit.storageNum || 0;
    },
    goodSpecificationsList() {
      return this.$store.state.shoppingCar.fruit.fruitSpecificationsList;
    },
    goods() {
      let thumb = this.$store.state.shoppingCar.fruit.fruit.fruitImageList.filter(
        item => {
          return item.type === 1;
        }
      );
      return Object.assign({}, this.$store.state.shoppingCar.fruit.fruit, {
        title: this.$store.state.shoppingCar.fruit.fruit.name,
        picture: this.app.prefixAttachs + thumb[0].image
      });
    },
    sku() {
      let skuMap = {
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
      };
      let goodsData = this.$store.state.shoppingCar.fruit;
      skuMap.price = goodsData.fruit.price;
      skuMap.stock_num = goodsData.storageNum;
      skuMap.tree[0].v = this.goodSpecificationsList.map(item => {
        skuMap.list.push({
          id: item.id,
          s1: item.id,
          price: item.price * 100,
          stock_num: goodsData.storageNum,
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
      return skuMap;
    }
  }
};
</script>