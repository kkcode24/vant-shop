<template>
    <div class="coupon">
        <van-coupon-list :coupons="coupons" :chosen-coupon="chosenCoupon" :disabled-coupons="disabledCoupons" :show-exchange-bar="false" :show-close-button="false" @change="onChange" />
    </div>
</template>

<script>
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
        let startAt = new Date(item.startTime).getTime();
        let endAt = new Date(item.endTime).getTime();
        let now = Date.now();
        let currObj = {
          id: item.couponId,
          condition: item.couponRule,
          value: item.couponPrice * 100,
          name: item.couponName,
          startAt: startAt / 1000,
          endAt: endAt / 1000,
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
    },
    onChange(index) {
      this.showCoupon = false;
      this.chosenCoupon = index;
      let coupon = this.coupons[index];
      this.order.couponPrice = coupon.value;
      this.order.couponId = coupon.id;
    }
  }
};
</script>
