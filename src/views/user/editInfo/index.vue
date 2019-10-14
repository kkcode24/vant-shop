<template>
  <div class="selfInfo">
    <h2 class="block-header">基本信息</h2>
    <van-cell is-link style="display: flex; justify-content: center; align-items: center;">
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
            <span class="custom-title">头像</span>
        </template>
        <template slot="default">
            <van-image
                round
                width="30px"
                height='30px'
                fit='cover'
                src="https://b.yzcdn.cn/showcase/membercenter/2018/08/06/default_avatar@2x.png"
            />
        </template>
    </van-cell>
    <van-cell is-link>
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
            <span class="custom-title">姓名</span>
        </template>
        <template slot="default">
            <span class="custom-title">请填写</span>
        </template>
    </van-cell>
    <van-cell  is-link>
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
            <span class="custom-title">手机号</span>
        </template>
        <template slot="default">
            <span class="custom-title">17625763879</span>
        </template>
    </van-cell>
    <van-cell is-link>
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
            <span class="custom-title">性别</span>
        </template>
        <template slot="default">
            <span class="custom-title">保密</span>
        </template>
    </van-cell>
    <van-cell value="内容" is-link>
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
            <span class="custom-title">生日</span>
        </template>
        <template slot="default">
            <span class="custom-title">请填写</span>
        </template>
    </van-cell>
    <van-cell value="内容" is-link  @click="show = true">
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
            <span class="custom-title">地区</span>
        </template>
        <template slot="default">
            <span class="custom-title" v-if="address.length == 0">请填写</span>
            <span class="custom-title" v-else v-for="(item, index) in address" :key="item.code">{{item.name}}<span v-if="index != address.length - 1">-</span></span>
            
        </template>
    </van-cell>
    <van-popup
        v-model="show"
        position="bottom"   
    >
      <van-area :value='address.length > 0 ? address[0].code : ""' :area-list="areaList" @confirm='confirmAddress' @cancel='cancelChoose'/>
    </van-popup>
  </div>
</template>

<script>
import areaList from "@/views/user/address/area";
export default {
  name: "coupon",
  data() {
    return {
        areaList,
        show: false,
        address: [],

    };
  },
  methods: {
    confirmAddress(data) {
        this.address = data
        this.show = false
    },
    cancelChoose() {
        this.show = false
    }
  }
};
</script>

<style scoped lang='scss'>
  .selfInfo {
    .block-header {
        padding: 15px 15px 10px;
        font-size: 14px;
        line-height: 15px;
        color: #999;
    }
  }
  .van-cell__value {
      height: 30px;
  }
</style>
