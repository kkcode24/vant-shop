<template>
  <div class="classification">
    <van-tree-select
      v-if="dataList.length > 0"
      :items="dataList"
      :main-active-index.sync="activeIndex"
      height="100%"
      @click-nav='changeClass'
    >
      <template slot="content">
        <div class="classContainer" ref="classContainer">
          <div class="friutItem"  v-for="data in dataList" :key="data.text">
            <van-sticky v-if="dataList[activeIndex].fruitList">
              <div style="text-align: center;">{{data.text}}</div>
            </van-sticky>
            <ul 
               v-if="dataList[activeIndex].fruitList"
               v-for="item in dataList[activeIndex].fruitList"
              :key="item.name"
              class="fruitList"
            >
              <li>
                <img  v-lazy="'https://img.yzcdn.cn/vant/apple-1.jpg'" >
              </li>
            </ul>
          </div>
        </div>
      </template>
    </van-tree-select>
  </div>
</template>

<script>
import { getFriutList, getFriutListById } from "@/api/class";
export default {
  name: "items",
  data() {
    return {
      dataList: [],
      activeIndex: 0
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    // 初始化数据
    initData() {
      this.changeClass()
    },
    // 获取所有的分类
    getAllClass() {

    },
    // 选择分类
    changeClass() {
      console.log(this.activeIndex)
      this.getFruitListById()
    },  
    getFruitListById(fruitTypeId) {
      getFriutListById({fruitTypeId}).then(res => {
        if (res.code == 0) {
          res.data.forEach(item => {
            item.text = item.name
          });
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
}
.classContainer {
  height: 100%;
  background: red;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 15px;
  .friutItem {
    .fruitList {
    }
  }
}
</style>
