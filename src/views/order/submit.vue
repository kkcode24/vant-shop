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
      ¥{{order.discountTotalPrice}}</span></div>
      </div>
    </div>

    <van-submit-bar :loading="loading" :price="order.totalPrice*100" button-text="提交订单" @submit="onSubmit" />
    <van-action-sheet
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      @select="onSelect"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import { saveOrder,billWXPay } from "@/api/order";
export default {
  name: "submitOrder",
  data() {
    return {
      show: false,
      loading: false,
      currentContact: {},
      addresslist: [],
      orderGoodList: [],
      orderId: 21,
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
      },
      actions: [
        { name: '微信支付',payType: 'wx' },
        { name: '支付宝支付',payType:'ali' }
      ]
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
      this.show = true;
      return false;
      this.loading = true;
      saveOrder({ ...this.order, orderFruit: this.orderGoodList }).then(res => {
        this.loading = false;
        if(res.code === 0){
          this.orderId = res.data;
        }
      });
    },
    onSelect(item) {
      this.show = false;
      if(item.payType==='wx'){ // 微信支付
          billWXPay(this.orderId)
            .then((res) => {
              function onBridgeReady(e, d) {
                WeixinJSBridge.invoke(
                  'getBrandWCPayRequest', {
                    "appId": d.appid, //公众号名称，由商户传入     
                    "timeStamp": d.timestamp + '', //时间戳，自1970年以来的秒数     
                    "nonceStr": d.noncestr, //随机串     
                    "package": d.package,
                    "signType": "MD5", //微信签名方式：     
                    "paySign": d.sign //微信签名 
                  },
                  function(res) {
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                      setTimeout(function() {
                        that.$toast('支付成功')
                        //that.$router.push('/order/pay/success')
                      }, 500);
                    }
                    if (res.err_msg == "get_brand_wcpay_request:cancel") {
                      this.$toast('支付已取消')
                    }
                  });
              }
              if (res.Code === 0) {
                var d = res.data
                if (typeof WeixinJSBridge == "undefined") {
                  if (document.addEventListener) {
                    document.addEventListener('WeixinJSBridgeReady', function(e, d) { onBridgeReady(e, d) }, false);
                  } else if (document.attachEvent) {
                    document.attachEvent('WeixinJSBridgeReady', function(e, d) { onBridgeReady(e, d) });
                    document.attachEvent('onWeixinJSBridgeReady', function(e, d) { onBridgeReady(e, d) });
                  }
                } else {
                  onBridgeReady(undefined, d)
                }
              }
            })
            .catch((error) => {
              console.log(error)
            })
      }else if(item.payType==='ali'){ // 支付宝支付
        this.$toast('开发中')
      }
    },
    onCancel(){
      this.$toast('已取消支付');
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
