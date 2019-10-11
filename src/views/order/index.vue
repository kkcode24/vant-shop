<template>
  <div id="shoppingCar">
    <van-nav-bar
      title="购物车"
      :right-text="rightText"
      @click-right="editCart"
      :z-index="10"
      fixed
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

    <div
      class="card_item"
      v-if="list.length > 0"
    >
      <div
        class="shopping_item"
        v-for="(item,index) in list"
        :key="index"
      >
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
                <span class="price-tag">¥</span>{{item.price | amount}}
              </div>
              <span>
                <van-stepper v-model="item.fruitNum" />
              </span>
            </div>
          </div>
        </div>
      </div>
      <van-submit-bar
        :price="totalPrice"
        :button-text="isEdit?'删除':'结算'"
        @submit="onSubmit"
        style="padding-left:10px;bottom: 50px;"
      >
        <van-checkbox
          v-model="allCheck"
          @change="change"
        >{{allCheck?'取消全选':'全选'}}</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import { getCartList, delFromCartByIds } from "@/api/shopingCart";
import { filterEmpyKey } from "@/utils/index";
export default {
  data() {
    return {
      isEdit: false,
      allCheck: false,
      list: []
    };
  },
  mounted() {
    this.getCartList();
  },
  methods: {
    goHome() {
      this.$router.push({ name: "home" });
    },
    editCart() {
      this.isEdit = !this.isEdit;
    },
    change() {
      this.list.forEach((v, o) => {
        v.checked = this.allCheck;
      });
    },

    //单选勾住后全选
    itemChange(item) {
      let select = this.list.filter(v => {
        return v.checked;
      });
      if (select.length === 0) {
        this.allCheck = false;
      }
      select.length == this.list.length ? (this.allCheck = true) : "";
    },
    onSubmit() {
      let select = this.list.filter(v => {
        return v.checked;
      });
      if (select.length === 0) {
        this.$toast({
          position: "bottom",
          message: "没有选择物品~"
        });
        return;
      }
      if (this.isEdit) {
        this.$dialog
          .confirm({
            title: "警告",
            message: "确实要删除吗?"
          })
          .then(() => {
            let ids = select.map(v => {
              return v.id;
            });
            delFromCartByIds(ids.join(",")).then(result => {
              this.$toast.success("删除成功");
              this.getCartList();
            });
          });
      } else {
        let postData = [];
        this.list.forEach(item => {
          if (item.checked) {
            postData.push(item);
          }
        });
        this.$store.dispatch("setOrderCache", postData).then(() => {
          this.$router.push({ name: "submitOrder" });
        });
      }
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
          all += item.price * item.fruitNum;
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
  height: calc(100% - 55px);
  background: #fafafa;
  position: relative;
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
    margin-top: 55px;
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