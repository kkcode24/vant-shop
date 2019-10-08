<template>
  <div class="page">
    <van-tabs
      v-model="currentActive"
      @change='change'
      sticky
    >
      <van-tab
        :title="val"
        v-for="(val,index) in tabs"
        :key="index"
      >
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
        <div class="order-list">
            <div v-for="(item,index) in list" :key="index" class="order-item">
                <van-panel title="店铺：丰登" :desc="'订单编号：'+item.code" :status="getStatusText(item.status)">
                    <van-card
                    :num="item.fruitNum"
                    :price="item.fruitPrice"
                    :desc="item.fruitDescribe"  
                    :title="item.fruitName"
                    thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
                    />
                    <div class="order-footer">
                        合计：<span>{{item.discountTotalPrice}}</span> 元
                    </div>
                </van-panel>
            </div>
        </div>
        </van-list>
      </van-tab>
    </van-tabs>

  </div>
</template>

<script>
import { getMyOrder } from "@/api/order";
export default {
  name: "myOrder",
  data() {
    return {
      loading: false,
      finished: false,
      currentActive: 0,
      list: [],
      page:{
        status: '',
        current:1,
        size: 5
      },
      tabs: ["全部", "待付款", "待发货", "待收货", "已完成"],
      statusText: ['待付款','待发货','已发货','待评价','已取消','已完成']
    };
  },
  created() {
    let status = this.$route.query.status;
    if (status+1) {
      this.currentActive = status+1;
    }
  },
  methods: {
    change(i) {
      this.currentActive = i;
      this.page= {
        status: i===0?'':i-1,
        current:1,
        size: 5
      };
      this.loading = false;
      this.finished = false;
      this.list =[];
    },
    getStatusText(status) {
      return this.statusText[status];
    },
    onLoad() {
      getMyOrder(this.page).then(res => {
        if (res.code == 0) {
          if(res.data.length>0){
            this.list = this.list.concat(res.data);
          }
          this.loading = false;
          if (this.list.length >= res.total) {
            this.finished = true;
          }else{
            this.page.current++
          }
        }else{
          this.page.current=1;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.order-list {
    .order-item {
        margin: 10px 0;
        .order-footer {
            text-align: right;
            padding: 6px 10px;
            span {
                color: #ee0a24;
            }
        }
    }
}
</style>
