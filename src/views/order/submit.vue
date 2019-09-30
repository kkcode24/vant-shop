<template>
  <div>
    <!-- 联系人卡片 -->
    <van-contact-card
      :type="cardType"
      :name="currentContact.name"
      :tel="currentContact.tel"
      add-text="添加收货地址"
      @click="choseAddress"
    />
    <!-- 商品Panel -->
    <van-panel title="商品"
        v-for="item in orderGoodList"
        :key="item.goodsId"
        class="allGood">
        <div class="allGood-item">
          <van-card 
            :title="item.name"
            :desc="item.fruitDescribe"
            :num="item.selectedNum"
            :price="item.price"
            :thumb="item.picture" />
          <van-cell-group>
            <van-cell title="配送方式"
              :value="item.freightPrice>0?'运费 ￥'+item.freightPrice:'免运费'" />
            <van-field v-model="item.remark"
              label="留言"
              placeholder="点击给卖家留言" />
            <van-cell title="合计"
              style="color:#f44"
              :value="'￥'+item.price*item.selectedNum" />
          </van-cell-group>
        </div>
    </van-panel>

    <van-submit-bar
      :loading="loading"
      :price="3050"
      button-text="提交订单"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import {saveOrder} from '@/api/order'
export default {
  name: "submitOrder",
  data() {
    return {
      loading: false,
      currentContact: {},
      chosenContactId: null,
      addresslist: [],
      orderGoodList: []
    };
  },
  mounted() {
    let storeAddressList = this.$store.getters.addressList;
    if (storeAddressList && storeAddressList.length > 0) {
      let defaultAddress = storeAddressList.filter(item => !item.isDefault);
      this.chosenContactId = defaultAddress[0].id;
      this.currentContact = defaultAddress[0];
      this.addressList = storeAddressList;
    }
    let orderList = this.$store.getters.orderList;
    console.log(orderList);
    if (orderList && orderList.length > 0) {
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
    onSubmit(){
      this.loading = true;
      console.log('提交');
      saveOrder(this.orderGoodList).then(res=>{
        console.log(res);
      })
    }
  },
  computed: {
    cardType() {
      return this.chosenContactId !== null ? "edit" : "add";
    }
  }
};
</script>

<style scoped>
.allGood{
  margin-top:14px;
}
</style>
