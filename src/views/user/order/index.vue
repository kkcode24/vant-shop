<template>
  <div class="page">
    <van-tabs
      v-model="currentActive"
      @change='change'
      sticky
    >
      <van-tab
        :title="val"
        v-for="(val,index) in tabs"
        :key="index"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
        <div class="order-list">
            <div v-for="(item,index) in list" :key="index" class="order-item">
                <van-panel title="店铺：丰登" :status="getStatusText(item.status)">
                    <div class="order-code">
                      订单编号: {{item.code}}
                    </div>
                    <div v-for="o in item.orderFruitList" :key="o.id" class="orderFruits">
                      <van-card
                      :num="o.fruitNum"
                      :price="o.fruitPrice"
                      :desc="o.fruitDescribe"
                      :title="o.fruitName"
                      :thumb="app.prefixAttachs + o.fruitImage"
                      />
                    </div>
                    
                    <div class="order-footer">
                        合计：<span>{{item.discountTotalPrice}}</span> 元
                    </div>
                    <div v-if="item.status===0" class="order-btn">
                      <van-button @click="payOrder(item)" type="danger" size="small">付款</van-button>
                    </div>
                </van-panel>
            </div>
        </div>
        </van-list>
      </van-tab>
    </van-tabs>

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
import {
  getMyOrder,
  billWXPay,
  queryOrderPayResult,
  modifyOrderStatus
} from "@/api/order";
export default {
  name: "myOrder",
  data() {
    return {
      orderId: '',
      show: false,
      loading: false,
      finished: false,
      currentActive: 0,
      list: [],
      page:{
        status: '',
        current:1,
        size: 5
      },
      actions: [{ name: "微信支付", payType: "wx" }],
      tabs: ["全部", "待付款", "待发货", "待收货", "已完成"],
      statusText: ['待付款','待发货','已发货','待评价','已取消','已完成']
    };
  },
  created() {
    let status = this.$route.query.status;
    if (status+1) {
      this.currentActive = status+1;
    }
  },
  methods: {
    change(i) {
      this.currentActive = i;
      this.page= {
        status: i===0?'':i-1,
        current:1,
        size: 5
      };
      this.loading = false;
      this.finished = false;
      this.list =[];
    },
    getStatusText(status) {
      return this.statusText[status];
    },
    onLoad() {
      getMyOrder(this.page).then(res => {
        if (res.code == 0) {
          if(res.data.length>0){
            this.list = this.list.concat(res.data);
          }
          this.loading = false;
          if (this.list.length >= res.total) {
            this.finished = true;
          }else{
            this.page.current++
          }
        }else{
          this.page.current=1;
        }
      });
    },
    payOrder(item){
      this.orderId = item.id;
      this.show = true;
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
                    queryOrderPayResult(this.orderId).then(response => {
                      if (response.code === 0) {
                        this.$toast("支付成功");
                        // 修改订单状态
                        modifyOrderStatus(this.orderId).then(r => {
                          if (r.code === 0) {
                            this.$router.push({ name: "home" });
                          }
                        });
                      } else {
                        this.$toast("支付失败");
                        this.$router.push({ name: "home" });
                      }
                    });
                  }
                  if (res.err_msg == "get_brand_wcpay_request:cancel") {
                    this.$toast("支付已取消");
                    this.$router.push({ name: "home" });
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
      }
    },
    onCancel() {
      this.$toast("已取消支付");
    }
  }
};
</script>

<style lang="scss" scoped>
.order-list {
    .order-item {
        margin: 10px 0;
        .order-code {
          color: #999;
          font-size: 12px;
          padding: 4px 15px;
        }
        .order-footer {
            text-align: right;
            padding: 6px 10px;
            span {
                color: #ee0a24;
            }
        }
        .order-btn {
          padding: 6px 10px;
          text-align: right;
        }
    }
}
</style>
