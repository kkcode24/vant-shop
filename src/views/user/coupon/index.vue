<template>
    <div class="coupon">
        <van-coupon-list :coupons="coupons" :chosen-coupon="chosenCoupon" :disabled-coupons="disabledCoupons" :show-exchange-bar="false" :show-close-button="false" />
    </div>
</template>

<script>
import moment from 'moment';
import { getUserCoupon } from "@/api/coupon";
export default {
  name: "myCoupon",
  data() {
    return {
      coupons: [],
      chosenCoupon: -1,
      disabledCoupons: []
    };
  },
  mounted() {
    this.getMyCoupon();
  },

  methods: {
    getMyCoupon() {
      getUserCoupon().then(res => {
        if (res.code === 0) {
          this.dealCouponData(res.data);
        }
      });
    },
    dealCouponData(couponList) {
      couponList.forEach(item => {
        let startAt = moment(item.startTime).valueOf();
        let endAt = moment(item.endTime).valueOf();
        let now = Date.now();
        let currObj = {
          id: item.couponId,
          condition: item.couponRule,
          value: item.couponPrice * 100,
          name: item.couponName,
          startAt: Math.floor(startAt / 1000),
          endAt: Math.floor(endAt / 1000),
          valueDesc: item.couponPrice,
          unitDesc: "元"
        };
        // 必须保证优惠券在有效期内
        if (now > startAt && now < endAt) {
          this.coupons.push({ ...currObj });
        } else {
          this.disabledCoupons.push({ ...currObj, reason: "已过期" });
        }
      });
    }
  }
};
</script>
