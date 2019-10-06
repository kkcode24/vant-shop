<template>
  <div class="order">
    <!-- 联系人卡片 -->
    <van-contact-card
      :type="cardType"
      :name="currentContact.name"
      :tel="currentContact.tel"
      add-text="添加收货地址"
      @click="choseAddress"
    />
    <!-- 商品Panel -->
    <van-panel
      title="商品"
      class="allGood"
    >
      <div class="allGood-item">
        <div
          v-for="(item,index) in orderGoodList"
          :key="index"
        >
          <van-card
            :title="item.name"
            :desc="item.fruitDescribe"
            :num="item.selectedNum"
            :price="item.price"
            :thumb="item.picture"
          />
        </div>
      </div>
    </van-panel>

    <div class="deduction">
      <van-cell-group>
        <van-cell
          title="店铺活动"
          is-link
        />
        <van-coupon-cell
          :coupons="coupons"
          :chosen-coupon="chosenCoupon"
          @click="showCoupon = true"
        />
        <van-cell
          title="积分"
          class="point-deduction"
        >
          使用积分抵现5元<i class="point-deduction__question van-icon van-icon-question-o" style="color: rgb(51, 136, 255); font-size: 14px;"></i>
          <van-switch class="point-deduction__switch" size="20px" v-model="checked" />
        </van-cell>
      </van-cell-group>
    </div>

    <!-- 优惠券列表 -->
    <van-popup v-model="showCoupon" position="bottom">
      <van-coupon-list
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCoupons"
        :show-exchange-bar="false"
        @change="onChange"
      />
    </van-popup>

    <van-panel
      title="配送方式"
      :status="order.goodsPrice>0?'快递，运费 ￥'+order.goodsPrice:'快递，免运费'"
      style="margin-top:15px;"
    >
      <van-cell-group>
        <van-field
          v-model="order.remark"
          label="留言"
          placeholder="点击给卖家留言"
        />
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
          <span>- ¥ {{order.couponPrice}}</span>
        </p>
        <div class="price-panel__total van-hairline--top">
          合计：<span class="price-panel__amount theme-color">
            ¥{{order.discountTotalPrice+order.goodsPrice-order.couponPrice}}</span></div>
      </div>
    </div>

    <van-submit-bar
      :loading="loading"
      :price="(order.discountTotalPrice+order.goodsPrice-order.couponPrice)*100"
      button-text="提交订单"
      @submit="onSubmit"
    />
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
import { saveOrder, billWXPay } from "@/api/order";
import { getUserCoupon } from "@/api/coupon";
export default {
  name: "submitOrder",
  data() {
    return {
      showCoupon: false,
      chosenCoupon: -1,
      coupons: [],
      disabledCoupons: [],
      checked: true,
      show: false,
      loading: false,
      currentContact: {},
      addresslist: [],
      orderGoodList: [],
      orderId: "",
      order: {
        couponPrice: 0,
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
        { name: "微信支付", payType: "wx" },
        { name: "支付宝支付", payType: "ali" }
      ]
    };
  },
  beforeRouteLeave(to, from, next) {
    // 清除订单数据
    this.$store.dispatch("clearOrderCache").then(() => {
      next();
    });
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
        this.order.totalPrice += item.price * item.selectedNum;
        this.order.discountTotalPrice += item.price * item.selectedNum;
      });
      this.orderGoodList = orderList;
    }

    this.getUserCouponList();
  },

  methods: {
    getUserCouponList(){
      getUserCoupon().then(res=>{
        if(res.code===0){
          res.data.forEach(item=>{
            let startAt = new Date(item.startTime).getTime();
            let endAt = new Date(item.endTime).getTime();
            let now = Date.now();
            let currObj = {
              id: item.couponId,
              condition: item.couponRule,
              value: item.couponPrice,
              name: item.couponName,
              startAt: startAt/1000,
              endAt: endAt/1000,
              valueDesc: item.couponPrice,
              unitDesc: '元'
            }
            // 必须保证优惠券在有效期内
            if(now>startAt&&now<endAt){
              if(item.isThreshold){ // 如果不存在使用门槛
                this.coupons.push({...currObj})
              }else{
                // 如果存在使用门槛，则需保证满足门槛金额
                if(this.order.totalPrice<item.thresholdPrice){
                  this.disabledCoupons.push({...currObj,reason:'不满'+item.thresholdPrice+'元'})
                }else{
                  this.coupons.push({...currObj})
                }
              }
            }else{
              this.disabledCoupons.push({...currObj,reason:'已过期'})
            }
          })
        }
      })
    },
    onChange(index) {
      this.showCoupon = false;
      this.chosenCoupon = index;
      let coupon = this.coupons[index];
      this.order.couponPrice = coupon.value;
      this.order.couponId = coupon.id;
    },
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
        if (res.code === 0) {
          this.show = true;
          this.orderId = res.data;
        }
      });
    },
    onSelect(item) {
      this.show = false;
      if (item.payType === "wx") {
        // 微信支付
        billWXPay(this.orderId)
          .then(res => {
            function onBridgeReady(e, d) {
              WeixinJSBridge.invoke(
                "getBrandWCPayRequest",
                {
                  appId: d.appId, //公众号名称，由商户传入
                  timeStamp: d.timestamp + "", //时间戳，自1970年以来的秒数
                  nonceStr: d.nonce_str, //随机串
                  package: d.package,
                  signType: "MD5", //微信签名方式：
                  paySign: d.sign //微信签名
                },
                function(res) {
                  if (res.err_msg == "get_brand_wcpay_request:ok") {
                    setTimeout(function() {
                      that.$toast("支付成功");
                      //that.$router.push('/order/pay/success')
                    }, 500);
                  }
                  if (res.err_msg == "get_brand_wcpay_request:cancel") {
                    this.$toast("支付已取消");
                    that.$router.push({name:'/home'})
                  }
                }
              );
            }
            if (res.code === 0) {
              var d = res.data;
              if (typeof WeixinJSBridge == "undefined") {
                if (document.addEventListener) {
                  document.addEventListener(
                    "WeixinJSBridgeReady",
                    function(e, d) {
                      onBridgeReady(e, d);
                    },
                    false
                  );
                } else if (document.attachEvent) {
                  document.attachEvent("WeixinJSBridgeReady", function(e, d) {
                    onBridgeReady(e, d);
                  });
                  document.attachEvent("onWeixinJSBridgeReady", function(e, d) {
                    onBridgeReady(e, d);
                  });
                }
              } else {
                onBridgeReady(undefined, d);
              }
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else if (item.payType === "ali") {
        // 支付宝支付
        this.$toast("开发中");
      }
    },
    onCancel() {
      this.$toast("已取消支付");
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
  .deduction{
    margin-top: 10px;
    .point-deduction {
      .van-cell__title {
        -webkit-box-flex: 0;
        -webkit-flex: none;
        flex: none;
        margin-right: 15px;
      }
      .van-cell__value {
        text-align: left;
        color: #323233;
      }
      .point-deduction__question {
        margin-left: 4px;
        vertical-align: -1px;
      }
      .point-deduction__switch {
        float: right;
      }
    }
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
        font-family: PingFang SC, Hiragino Sans GB, Microsoft Yahei, SimSun,
          sans-serif;
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
