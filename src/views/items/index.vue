<template>
  <div class="classification">
    <van-sidebar v-model="activeIndex" @change='changeClass'  style="height:100%;">
      <van-sidebar-item 
        v-for="(data, index) in dataList" 
        :key="index" 
        :title="data.name"
        v-if="data.fruitList&&data.fruitList.length > 0"
      />
    </van-sidebar>
    <div class="mainConent" ref="mainConent">
      <template  v-for="data in dataList">
        <h1 style="margin-left: 20px;height:20px;" v-if="data.fruitList&&data.fruitList.length > 0" :key="data.name ">{{data.name}}</h1>
        <div class="fruitItem" ref="fruitItem" :key="index"  v-for="(item, index) in data.fruitList">
           <div class="fruitImg">
             <img  v-lazy="app.prefixAttachs + item.thumbnailImage" >
           </div>
           <div class="fruitDetail">
              <h3 class="fruitTitle">
                {{item.fruitDescribe}}
              </h3>
              <div class="addShop">
                  <div class="sale-price" style="color: rgb(255, 68, 68);">
                    <span class="price-tag">¥</span>{{item.price | amount}}
                  </div>
                  <span @click.stop="addShopCart(1)">
                    <van-icon name="cart-circle-o" class="shoppingCart" />
                  </span>
              </div>
           </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { getFriutList, getFriutListById, getNromById } from "@/api/class";
import BScroll from 'better-scroll'
export default {
  name: "items",
  data() {
    return {
      dataList: [],
      activeIndex: 0
    };
  },
  mounted() {
    this.getFriutList();
    this.$refs.mainConent.addEventListener('scroll', this.scrollFn)
  },
  methods: {
    scrollFn() {
      this.$nextTick(()=> {
        let itemHeight = this.$refs.fruitItem[0].offsetHeight
          this.activeIndex =  Math.floor(this.$refs.mainConent.scrollTop / itemHeight)
      })
    },
    // 添加购物车
    addShopCart(id) {
      console.log(id)
      getNromById({id}).then(res => {
        if(res.code == 0) {
          this.$store.commit('ADD_GOODS', res.data)
        }
      })
    },
    // 选择分类
    changeClass() {
      console.log(this.activeIndex);
      this.$refs.mainConent.scrollTop  = this.activeIndex * 100
    },
    getFriutList(fruitTypeId) {
      getFriutList({}).then(res => {
        if (res.code == 0) {
          this.dataList = res.data;
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.classification {
  width: 100%;
  height: 100%;
  background: #eee;
  display: flex;
  justify-content: flex-start;
  .mainConent {
    background: #fff;
    flex: 1;
    overflow-x: hidden;
    overflow-y: scroll;
    transition: .5 all; 
    .fruitItem {
      padding: 6px;
      display: flex;
      height: 100px;
      box-sizing: border-box;
      justify-content: flex-start;
      .fruitImg {
        width: 88px;
        height: 88px;
        margin-right: 8px;
        overflow: hidden;
        border-radius: 5px;
        img {
          width: 88px;
          height: 88px;
        }
      }
      .fruitDetail {
        flex: 1;
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
</style>
