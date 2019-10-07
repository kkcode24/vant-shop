<template>
  <div id="shoppingCar">
    <div class="card_item" v-if="list.length > 0">
       <div class="shopping_item" v-for="item in list" :key="item.fruitPrice">
          <van-checkbox v-model="item.checked" @change="selectedChange(item)"></van-checkbox>
          <div class="card_content">
            <img class="card_img" v-lazy="app.prefixAttachs + item.fruitImage" >
            <div class="card_main">
                <h3 class="fruitTitle">
                  {{item.fruitDescribe}}
                </h3>
                <div class="addShop">
                    <div class="sale-price" style="color: rgb(255, 68, 68);">
                      <span class="price-tag">¥</span>{{item.fruitPrice | amount}}
                    </div>
                    <span @click.stop="addShopCart(1)">
                      <van-stepper v-model="item.fruitNumber"  />
                    </span>
                </div>
            </div>
          </div>
       </div>
        <!-- 结算 -->
        <van-submit-bar
          :price="totalPrice"
          button-text="结算"
          @submit="onSubmit"
          style="padding: 0 10px;bottom: 50px;"
        >
          <van-checkbox v-model="allChecked" @change="allselectChange">全选</van-checkbox>
        </van-submit-bar>
    </div>
  </div>
</template>

<script>
import { Checkbox, CheckboxGroup, Card, SubmitBar, Toast } from 'vant';
import { getCartList } from '@/api/shopingCart'
import { filterEmpyKey } from "@/utils/index";
export default {
  components: {
    [Card.name]: Card,
    [Checkbox.name]: Checkbox,
    [SubmitBar.name]: SubmitBar,
    [CheckboxGroup.name]: CheckboxGroup
  },
  data() {
    return {
      allChecked: false, // 全选
      checkedGoods: [],
      list: [],
      totalPrice: 0
    };
  },
  mounted() {
    this.getCartList()
  },
  methods: {
    allselectChange() {
        this.list.forEach(item => {
          item.checked = this.allChecked
        });
    },
    // 判断是不是全选 计算总价
    isAllChecked() {
      let selectedNum = 0
      this.totalPrice = 0
      this.list.forEach(item => {
        if(item.checked) {
          selectedNum++
          this.totalPrice += item.fruitPrice
        }
      });
      this.totalPrice = this.totalPrice * 100
      if(selectedNum == this.list.length) {
        this.allChecked = true
      } else {
        this.allChecked = false
      }
    },
    // 单选改变
    selectedChange(data) {
       this.checkedGoods.forEach((item) => {
          if(data.checked) {
            this.checkedGoods.push(item)
          } else {
            let findIndex = this.checkedGoods((currentValue, index, arr) => {
              return currentValue.id == data.id
            })
            if(findIndex >= 0 ) {
              this.checkedGoods.splice(findIndex, 1)
            }
          }
        });
        this.isAllChecked()
    },
    onSubmit() {
      let data = [] 
      this.list.forEach(item => {
        if(item.checked) {
          let fruit = filterEmpyKey({
            fruitSpecificationsId: item.fruitSpecificationsId,
            totalPrice: (item.fruitPrice) * item.fruitNumber,
            fruitNum: item.fruitNumber,
            price: item.fruitPrice,
            s1: null,
            messages: null,
            cartMessages: null,
            fruitImageList: null,
            selectedSkuComb: null
          });
          data.push(fruit)
        }
      })
      if(data.length == 0) {
        Toast('请选择需要结算的商品');
        return false;
      }
      console.log(data)
      this.$store.dispatch("setOrderCache", data).then(() => {
        this.$router.push({ name: "submitOrder" });
      });
    },
    // 添加购物车
    addShopCart(id) {
      console.log(id)
    },
    // 获取购物车列表
    getCartList() {
      getCartList({}).then(res => {
        if(res.code == 0) {
          res.data.forEach(item => {
            item.checked = false
          });
          this.list = res.data
        }
      })
    }
  }
};
</script>

<style rel="stylesheet/scss" scoped lang="scss">
#shoppingCar {
  width: 100%;
  height: calc(100% - 55px);
  background: #fafafa;
  position: relative;
  .card_item {
    background: #fff;
    margin: 10px;
    padding: 10px;
    border-radius: 4px;
    .allSelected {
      margin: 10px 0;
    }
    .shopping_item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .card_content {
        flex: 1;
        margin-left: 10px;
        display: flex;
        justify-content: space-between;
        .card_img {
          width: 96px;
          height: 96px;
          border-radius: 4px;
          margin-right: 10px;
        }
        .card_main {
            flex: 1;
            background: #fff;
            font-size: 14px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .fruitTitle {
              max-height: 40px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .addShop {
              display: flex;
              justify-content: space-between;
              align-items: center;
              .sale-price {
                  color: #f44;
                  margin-right: 4px;
                  .price-tag{
                    font-size: 12px;
                    margin-right: 2px;
                  }
              }
              .shoppingCart {
                font-size: 24px;
                color: #f44;
              }
            }
        }
      }
    }
  }
}
.card-goods {
  width: 100%;
  height: 100%;
  background: #fafafa;
  background-color: #fff;
  &__item {
    margin: 0 12px 12px;
    border-radius: 4px;
    background: #fff;
    position: relative;
    background-color: #fafafa;
    .van-checkbox__label {
      width: 100%;
      height: auto; // temp
      padding: 0 10px 0 15px;
      box-sizing: border-box;
    }
    .van-checkbox__icon {
      top: 50%;
      left: 10px;
      z-index: 1;
      position: absolute;
      margin-top: -10px;
    }
    .van-card__price {
      color: #f44;
    }
  }
}
</style>