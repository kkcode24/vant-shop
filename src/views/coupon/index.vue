<template>
  <div
    class="page"
    v-cloak
  >
    <!-- 搜索 -->
    <div class="showcase-search">
      <div class="showcase-search-wap">
        <div class="cap-search-box">
          <div class="cap-search">
            <van-search placeholder="输入产品的关键字，如“苹果”" />
          </div>
          <div
            @click="$router.push({ name: 'search',query: { redirect: $route.fullPath } })"
            class="showcase-search-mask"
          >
          </div>
        </div>
      </div>
    </div>
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
      先领券 再购物
    </van-divider>
    <van-notice-bar left-icon="volume-o">
      1.本优惠券领取后有使用限制，请注意使用时效。2.每张优惠券限领1张，过期作废。3.一个订单仅限使用一张优惠券，多张优惠券请注意分开下单。
    </van-notice-bar>

    <div class="showcase-coupon-container">
      <div class="cap-coupon__container">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="cap-coupon__track">
            <div
              class="cap-coupon"
              v-for="(item,index) in couponList"
              :key="index"
              @click="getCoupon(item,index)"
              :class="{couponDisabled:item.isGet}"
            >
            <div class="cap-coupon-content">
              <span class="cap-coupon__value">
                <span>{{item.price}}</span>
                <span>元</span>
              </span>
              <div class="cap-coupon__desc">
                <span class="cap-coupon__condition">
                  {{item.rule}}
                </span>
              </div>
            </div>
            </div>
          </div>

        </van-list>

      </div>
    </div>

  </div>
</template>

<script>
import { getCouponList,getCoupon } from "@/api/coupon";
export default {
  name: "coupon",
  data() {
    return {
      loading: false,
      finished: false,
      couponList: [],
      page: {
        current: 1,
        size: 3
      }
    };
  },
  methods: {
    onLoad() {
      getCouponList(this.page).then(res => {
        if (res.code == 0) {
          if (res.data.length > 0) {
            this.couponList = this.couponList.concat(res.data);
          }
          this.loading = false;
          if (this.couponList.length >= res.total) {
            this.finished = true;
          } else {
            this.page.current++;
          }
        } else {
          this.page.current = 1;
        }
      });
    },
    getCoupon(item,index){
      getCoupon(item.id).then(res=>{
        if(res.code===0){
          this.$set(this.couponList[index], 'isGet', true);
          this.$toast('领取成功');
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.showcase-coupon-container {
  .cap-coupon__container {
    overflow-x: auto;
    background: #fff;
    padding: 10px 0;
    .van-list {
      .cap-coupon__track {
        padding: 0 15px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        width: 100%;
        box-sizing: border-box;
        .cap-coupon {
          position: relative;
          display: flex;
          width: 28%;
          height: 90px;
          align-items: center;
          box-sizing: border-box;
          padding: 5px;
          margin-bottom: 10px;
          background-color: #e74c2c;
          &::before,
          &::after {
            content: "";
            position: absolute;
            top: 0;
            right: -5px;
            width: 10px;
            height: 100%;
            transform: rotateY(180deg);
            background-size: 100% 100%;
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAC0CAYAAACUlQzjAAAAAXNSR0IArs4c6QAAAdFJREFUaAXtmUFKA0EURH/PiCDEjbjQMyiuXYprXXoCvZW68wZuxUMInkEJ4saFIGTayWAM01N/+L+nN4HKJunf1UXyUkMxTHi7OI5S8FUV9OqsNsCw3tnfDXV1GiTcBpHJPFuP9ev98uRcpHmIUQ7XU9+nnuHyaGcam6f2qw72LNaDP+Xg8eW59bqzHEaagWEnqsM9Eltm0LDa3nu1HEYaaIiE1hk0bH4+j6wGqQ4ayiJep0LrehCNorH5D3ZmBpe/IsyvzmYds+5nxpvcQK+QbC2+P75WixLv+E+Z4EzDCfD+jm4AQ3aKsFPcSYfBZqe4OLJTXLigGOYQKo1DGhpBjcgqdgo7ZSQfyha89NgpCi08ZqdgLp4pzKHHINXSMCXiX7NThJ2SERt0hJ2CqKgzdoqKxrzBCjCjUoXlGfI+hZ2ixk3dgDlkp6i80AY7BVHxzWAOfRZ9NQ37PHJWvE/hfUpGbuClx05xkWSnuHBBMcwhVBqHNDSCGpGxU9gpI/HQtuClx07RcME5OwVicQ1hDl0OiZiGCZCMJTuFnZITG3SGnYKoqDN2iorGvMEKMKNSheUZ8nkKn6eocVM3YA7ZKSovtMFOQVR8M5hDn0Vf/QvYqJ3lQEIVBgAAAABJRU5ErkJggg==);
          }
          &::before {
            left: -5px;
            transform: rotateY(0deg);
          }
          .cap-coupon-content {
            color: #fff;
            flex: 1;
            display: flex;
            align-items: center;
            flex-direction: column;
            .cap-coupon__value {
                font-size: 30px;
                height: 30px;
                line-height: 30px;
                font-weight: 700;
                display: flex;
                align-items: center;
                span:last-child {
                    position: relative;
                    top: 5px;
                    left: 4px;
                    font-size: 12px;
                }
            }
            .cap-coupon__desc {
              margin-left:0;
              .cap-coupon__condition {
                margin-top: 5px;
                opacity: .8;
                font-size: 10px;
                line-height: 12px;
              }
            }
          }
        }
        .couponDisabled {
          background-color: #d3d6d9;
          &::before,&::after {
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAC0CAYAAACUlQzjAAAAAXNSR0IArs4c6QAAAdRJREFUaAXtWMFKAzEUzFv3qFDBi3cPQn/As7+if6Xe/AzxJ2RFwS8oggXP7dN2bd3dTMJ72b0UppduJpMJnU4YNvLy+q5hwk81odZW6gAEq7PTk6qWK5HqTkRG+yldD5u3j2vV1aNqOO/inuee4GZhK7p+UtVoziIc/Snzy4vnEOTeshhxIsENSY70AZEtGBQMs1ljWYw4WBAxjRgWXC7nxvURDQrqSm4iphGIojE2NnV3406wo426vNyzNIvFcfj1rP2Zelsa6N0m9frz67sdjD7GWxn4p+x2K/mmYIlr/TUH4CE7JbBT+qk1jHCw2SkG6/YUdsreiuIHnMNiuRAoOMK8v6UVO4Wd4o8RPnrsFI+T7BSPW5iLc4i5JpSCJpuyJHZKYKdkEwIn8dFjp0CzEiA7JWGMA8Y5dAgMqRQcOuIfs1PYKf7UJK4I2CkeK9kpHrcwlxWAffGg03vIuy++p3gS2HJxDtkpHifZKR63MBfnEHNNKAVNNmVJfE/he0o2IHgSHz12CnYLo+wU7IsHxTn0KAy4FBwYUjBkp7BTSmID17BToC0JkJ2SMMYBswIcZiWo03vIuy/efSXCloFxDtkpGcuiKXZKZIkbwDl0y/wv+AG49D0V8iVliQAAAABJRU5ErkJggg==);
          }
        }
      }
    }
  }
}
</style>
