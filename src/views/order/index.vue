<template>
  <div id="shoppingCar">
    <van-nav-bar
      title="购物车"
      :z-index="10"
      fixed
      right-text="清空购物车"
      @click-right="emtyShoppCart"
    />
    <div
      class="nogood"
      v-if="!this.list.length"
    >
      <div>购物车空空的，快去购物吧~</div>
      <van-button
        type="primary"
        class="btn"
        @click="goHome"
      >去首页</van-button>
    </div>
    <div style="margin-top: 55px;">
       <van-swipe-cell :on-close="deleteGoods" :name='item.id'  v-for="(item,index) in list" :key="index" >
          <template slot="default">
            <div class="card_item"  v-if="list.length > 0" >
              <div class="shopping_item" >
                <van-checkbox
                  v-model="item.checked"
                  @change="itemChange(item)"
                ></van-checkbox>
                <div class="card_content">
                  <img
                    class="card_img"
                    v-lazy="app.prefixAttachs + item.fruitImage"
                  >
                  <div class="card_main">
                    <h3 class="fruitTitle">
                      {{item.fruitDescribe}}
                    </h3>
                    <div class="addShop">
                      <div
                        class="sale-price"
                        style="color: rgb(255, 68, 68);"
                      >
                        <span class="price-tag">¥</span>{{item.fruitPrice | amount}}
                      </div>
                      <span>
                        <van-stepper v-model="item.fruitNum" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </template>
          <template slot="right">
            <van-button style="height: 100%;font-size: 18px;" square type="danger" text="删除" />
          </template>
      </van-swipe-cell>
    </div>
    
    <van-submit-bar
      :price="totalPrice"
      v-if="this.list.length > 0"
      button-text="结算"
      @submit="onSubmit"
      style="padding-left:10px;bottom: 50px;"
    >
      <van-checkbox v-model="allCheck" @click="allCheckChange" style="margin-left: 10px;" >全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import { getCartList, delFromCartByIds } from "@/api/shopingCart";
import { filterEmpyKey } from "@/utils/index";
export default {
  data() {
    return {
      allCheck: false,
      list: []
    };
  },
  mounted() {
    this.getCartList();
  },
  methods: {
    deleteGoods(clickPosition, instance, detail) {
        this.$dialog
          .confirm({
            title: "提示",
            message: "确定删除该商品吗?"
          }).then(() => {
            let ids = [detail.name]
            delFromCartByIds(ids.join(",")).then(result => {
              if(result.code == 0) {
                this.$toast.success("删除成功");
                this.getCartList();
              }
            });
        }).catch(() => {});
        instance.close()
    },
    // 清空购物车
    emtyShoppCart() {
      this.$dialog.confirm({
          title: "提示",
          message: "确定要清空购物车吗?"
        }).then(() => {
          let ids = this.list.map((v) => {
            return v.id
          })
          delFromCartByIds(ids.join(",")).then(result => {
              if(result.code == 0) {
                this.$toast.success("删除成功");
                this.getCartList();
              }
          });
      }).catch(() => {});
    },
    // 回到首页
    goHome() {
      this.$router.push({ name: "home" });
    },
    // 全选
    allCheckChange() {
      this.list.forEach((v, o) => {
        v.checked = !this.allCheck;
      });
    },

    //单选勾住后全选
    itemChange(item) {
      let select = this.list.filter(v => {
        return v.checked;
      });
      this.allCheck = (select.length == this.list.length&&this.list.length != 0)
    },
    // 结算
    onSubmit() {
      let postData = [];
      this.list.forEach(item => {
        if (item.checked) {
          postData.push(item);
        }
      });
      if (postData.length === 0) {
        this.$toast({
          message: "请选择要结算的商品~"
        });
        return;
      }
      this.$store.dispatch("setOrderCache", postData).then(() => {
        this.$router.push({ name: "submitOrder" });
      });
    },
    // 获取购物车列表
    getCartList() {
      getCartList().then(res => {
        if (res.code == 0) {
          this.list = res.data;
          this.itemChange();
        }
      });
    }
  },
  computed: {
    totalPrice() {
      let all = 0;
      this.list.forEach(item => {
        if(item.checked){
          all += item.fruitNum * item.fruitPrice;
        }
      });
      return all * 100;
    },
    rightText() {
      if (this.list.length) {
        return this.isEdit ? "完成" : "编辑";
      } else {
        return "";
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" scoped lang="scss">
#shoppingCar {
  width: 100%;
  height: calc(100% - 110px);
  background: #fafafa;
  position: relative;
  overflow-y: scroll;
  .nogood {
    position: absolute;
    width: 220px;
    text-align: center;
    color: #666;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .btn {
      margin-top: 15px;
    }
  }
  .card_item {
    border-radius: 4px;
    .allSelected {
      margin: 10px 0;
    }
    .shopping_item {
      background: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 10px;
      padding: 10px;
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
              .price-tag {
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