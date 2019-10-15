<template>
  <div class="selfInfo">
    <h2 class="block-header">基本信息</h2>
    <van-cell style="display: flex; justify-content: center; align-items: center;">
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
            <span class="custom-title">头像</span>
        </template>
        <template slot="default">
            <van-image
                round
                width="34px"
                height='34px'
                fit='cover'
                :src="userInfo.wxImage"
            />
        </template>
    </van-cell>
    <van-cell is-link @click="showName = true">
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
            <span class="custom-title">姓名</span>
        </template>
        <template slot="default">
            <span class="custom-title" v-if="userInfo.name">{{userInfo.name}}</span>
            <span class="custom-title" v-else>请填写</span>
        </template>
    </van-cell>
    <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
            <span class="custom-title">手机号</span>
        </template>
        <template slot="default">
            <span class="custom-title" v-if="userInfo.phone">{{userInfo.phone}}</span>
            <span v-else>未关联手机号</span>
        </template>
    </van-cell>
    <van-cell is-link @click="showSex = true">
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
            <span class="custom-title">性别</span>
        </template>
        <template slot="default">
            <span class="custom-title" v-if="userInfo.sex">{{userInfo.sex}}</span>
            <span v-else>请填写</span>
        </template>
    </van-cell>
    <van-cell value="内容" is-link @click="showTime = true">
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
            <span class="custom-title">生日</span>
        </template>
        <template slot="default">
            <span class="custom-title" v-if="userInfo.birthDay">{{userInfo.birthDay}}</span>
            <span v-else>请填写</span>
        </template>
    </van-cell>
    <van-cell value="内容" is-link  @click="showAddress = true">
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
            <span class="custom-title">地区</span>
        </template>
        <template slot="default">
            <span class="custom-title" v-if="userInfo.areaStr">{{userInfo.areaStr}}</span>
            <span class="custom-title" v-else >请填写</span>
        </template>
    </van-cell>
    <!-- 城市选择 -->
    <van-popup
        v-model="showAddress"
        position="bottom"   
    >
      <van-area :value='userInfo.areaCode' :area-list="areaList" @confirm='confirmAddress' @cancel='showAddress = false'/>
    </van-popup>
    <!-- 性别选择 -->
    <van-popup v-model="showSex" position="bottom">
        <van-picker
            show-toolbar
            :columns="sexList"
            :default-index='sexList.findIndex((item) => { return item == userInfo.sex})'
            @cancel="showSex = false"
            @confirm="confirmSex"
        />
    </van-popup>
    <!-- 选择生日 -->
    
    <van-popup
        v-model="showTime"
        position="bottom"   
    >
        <van-datetime-picker
            v-model="currentDate"
            type="date"
            @cancel='showTime = false'
            @confirm='getBirthday'
            :min-date="new Date('1900-01-01')"
            :max-date='new Date()'
        />
    </van-popup>
    <!-- 姓名 -->
    <van-dialog
        v-model="showName"
        title="修改姓名"
        show-cancel-button
        @cancel='showName = false'
        @confirm='getName'
    >
        <van-cell-group style="margin: 10px">
            <van-field  v-model="userInfo.name" placeholder="请输入用户名" />
        </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
import areaList from "@/views/user/address/area";
import { updateUserInfo } from '@/api/user';
import moment from 'moment'
export default {
  name: "coupon",
  data() {
    return {
        areaList,
        showAddress: false,
        showSex: false,
        showTime: false,
        showName: false,
        sexList: ['保密', '男', '女'],
        currentDate: moment(this.$store.getters.userInfo.birthDay)
    };
  },
  mounted() {
    console.log(moment(this.$store.getters.userInfo.birthDay))
  },
  computed:{
    userInfo() {
        return this.$store.getters.userInfo
    }
  },
  methods: {
    //   获取姓名
    getName() {
        this.updateUserInfo({
          name: this.$store.getters.userInfo.name
        })
    },
    //   获取日期
    getBirthday(value) {
        console.log(moment(value).format('YYYY-MM-DD'))
        this.updateUserInfo({
          birthDay: moment(value).format('YYYY-MM-DD')
        })
    },
    //   选地址
    confirmAddress(data) {
        let areaCode = data[data.length - 1].code
        let areaStr = data.map(item => {
            return item.name
        })
        areaStr = areaStr.join('-')
        this.updateUserInfo({areaCode, areaStr})
    },
    confirmSex(sex) {
        this.updateUserInfo({sex})
    },
    // 更新用户信息
    updateUserInfo(data) {
        return new Promise((resolve, reject) => {
            updateUserInfo(data).then(res => {
                if(res.code == 0) {
                    this.showAddress = false
                    this.showSex = false
                    this.showTime = false
                    this.$toast('更新成功!')
                    this.$store.commit('SET_USERINfO', res.data)
                }
            })
        })
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
