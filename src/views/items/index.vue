<template>
  <div class="classification">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li 
          v-for="(item, index) in dataList" 
          :key="index"
          class="menu-item van-ellipsis" 
          :class="{'current':currentIndex == index}"
          @click="selectMenu(index, $event)"
          v-if='item.fruitList&&item.fruitList.length > 0'
        >
          <span class="text"> {{item.name}} </span>
        </li>
      </ul>
    </div>
    <div class="mainConent" ref="foodWrapper">
      <ul>
        <li v-for="(data, i) in dataList" class="food-list-hook" :key="data.name + i">
          <h1 style="margin-left: 20px;height:20px;" v-if="data.fruitList&&data.fruitList.length > 0" :key="data.name ">{{data.name}}</h1>
          <div class="fruitItem"  :key="index"  v-for="(item, index) in data.fruitList">
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
        </li>
      </ul>
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
      listHeight: [],
      scrolly: 0, // 滚动高度
      foodScroll: "",
      menuScroll: '',
      clickFlag: false
    };
  },
  computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrolly >= height && this.scrolly < height2)) {
            return i;
          }
        }
        return 0;
      }
  },
  mounted() {
    this.getFriutList();
  },
  methods: {
    selectMenu(index, event) {
       if (!event._constructed) {
          // 去掉自带click事件的点击
          return;
        }
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodScroll.scrollToElement(el, 300);
        this.$refs.foodWrapper.scrollTop = this.listHeight[index]
      },
    _initScroll() {
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodScroll = new BScroll(this.$refs.foodWrapper, {
          probeType: 3,
          click: true
        });
        this.foodScroll.on('scroll', (pos) => {
          this.scrolly = Math.abs(Math.round(pos.y));
        });
    },
    // 收集每个分类的高度
    _calculateHeight() {
        let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
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
    getFriutList(fruitTypeId) {
      getFriutList({}).then(res => {
        if (res.code == 0) {
          this.dataList = res.data;
          this.dataList = [...this.dataList, ...this.dataList, ...this.dataList]
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
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
  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    background: #f3f5f7;
    .menu-item {
      height:50px;
      line-height: 50px;
      padding-left: 10px;
      &.current {
        position: relative;
        background:#fff;
        &:before {
          content: '';
          position: absolute;
          height: 50px;
          width: 4px;
          top: 0;
          left: 0;
          background:#ee0a24;
        }
      }
    }
  }
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
