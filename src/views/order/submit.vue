<template>
  <div class="order">
    <!-- 联系人卡片 -->
    <van-contact-card :type="cardType" :name="currentContact.name" :tel="currentContact.tel" add-text="添加收货地址" @click="choseAddress" />
    <!-- 商品Panel -->
    <van-panel title="商品" class="allGood">
      <div class="allGood-item">
        <div v-for="(item,index) in orderGoodList" :key="index">
          <van-card :title="item.name" :desc="item.fruitDescribe" :num="item.selectedNum" :price="item.price" :thumb="item.picture" />
        </div>
      </div>
    </van-panel>

    <van-panel title="配送方式" :status="order.goodsPrice>0?'快递，运费 ￥'+order.goodsPrice:'快递，免运费'" style="margin-top:15px;">
      <van-cell-group>
        <van-field v-model="order.remark" label="留言" placeholder="点击给卖家留言" />
      </van-cell-group>
    </van-panel>
    <div>
      <div class="price-panel">
        <p>商品金额
          <span>¥ {{order.totalPrice}}</span>
        </p>
        <p>运费
          <span>+ ¥ {{order.goodsPrice}}</span>
        </p>
        <p>优惠
          <span>- ¥ 2.00</span>
        </p>
        <div class="price-panel__total van-hairline--top">
    合计：<span class="price-panel__amount theme-color">
      ¥255.00</span></div>
      </div>
    </div>

    <van-submit-bar :loading="loading" :price="order.totalPrice*100" button-text="提交订单" @submit="onSubmit" />
  </div>
</template>

<script>
import { saveOrder } from "@/api/order";
export default {
  name: "submitOrder",
  data() {
    return {
      loading: false,
      currentContact: {},
      addresslist: [],
      orderGoodList: [],
      order: {
        addressId: null,
        // 给卖家留言
        remark: "",
        // 运费金额
        goodsPrice: 0,
        // 商品总金额
        totalPrice: 0,
        // 收费金额（取折后总金额）
        discountTotalPrice: 0
      }
    };
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === "goods") {
      this.$store.dispatch("clearOrderCache").then(() => {
        next();
      });
    } else {
      next();
    }
  },
  mounted() {
    let storeAddressList = this.$store.getters.addressList;
    if (storeAddressList && storeAddressList.length > 0) {
      let defaultAddress = storeAddressList.filter(item => !item.isDefault);
      this.order.addressId = defaultAddress[0].id;
      this.currentContact = defaultAddress[0];
      this.addressList = storeAddressList;
    }
    let orderList = this.$store.getters.orderList;
    if (orderList && orderList.length > 0) {
      orderList.forEach(item => {
        this.order.goodsPrice += item.freightPrice;
        this.order.totalPrice +=item.price * item.selectedNum;
        this.order.discountTotalPrice += item.price * item.selectedNum;
      });
      this.orderGoodList = orderList;
    }
  },

  methods: {
    choseAddress() {
      let path = "/user/address";
      if (this.addressList.length === 0) {
        path = "/user/address/add";
      }
      this.$router.push({
        path: path,
        query: { redirect: this.$route.fullPath }
      });
    },
    onSubmit() {
      this.loading = true;
      saveOrder({ ...this.order, orderFruit: this.orderGoodList }).then(res => {
        this.loading = false;
        console.log(res);
      });
    }
  },
  computed: {
    cardType() {
      return this.order.addressId !== null ? "edit" : "add";
    }
  }
};
</script>

<style lang="scss" scoped>
.order {
  padding-bottom: 100px;
  .allGood {
    margin-top: 14px;
  }
  .price-panel {
    font-size: 12px;
    margin: 10px 0;
    overflow: hidden;
    background-color: #fff;
    p {
        margin: 10px 0;
        padding: 0 15px;
        line-height: 16px;
        span:last-child {
            color: #111;
            float: right;
            font-family: PingFang SC,Hiragino Sans GB,Microsoft Yahei,SimSun,sans-serif;
        }
    }
    .price-panel__total {
        font-size: 14px;
        text-align: right;
        padding: 13px 15px 13px 0;
        margin-left: 15px;
        .price-panel__amount {
          color: #f44 !important;
        }
    }
  }
}
</style>
