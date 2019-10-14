<template>
  <div class="user">
    <div class="member-center__user-info-wrapper">
      <div class="member-center__user-info avatar-at-top">
        <div class="user-info__avatar">
          <img v-if="user.wxImage" :src="user.wxImage">
          <img v-else src="../../../static/images/user/avatar.png" alt="avatar">
        </div>
        <div class="user-info__info">
          <div v-if="user.phone" class="user-info__username">{{user.phone}}</div>
          <div v-else class="user-info__username">{{user.wxNickname}}</div>
        </div>
        <div @click="$router.push({name:'signin'})" class="user-info__sign">
          <img src="../../../static/images/user/right.png">
          <span v-if="user.isRegister">已签到</span>
          <span v-else>去签到</span>
        </div>
        <div class="user-info__level-wrapper">
          <div class="user-info__level">
            <span class="name">丰登水果</span>
            <div class="level">
              <span v-if="user.isMember">丰登水果会员</span>
              <span v-else>丰登水果普通会员</span>
              <i class="van-icon van-icon-arrow"></i>
            </div>
            <img
              src="../../../static/images/user/member.png"
              alt="member"
              class="level-member"
            >
          </div>
        </div>
      </div>
    </div>
    <div class="member-center__stats">
      <div @click="sorry" class="member-center__stats-item">
        <div>{{user.userBalance}}</div>
        <div>余额</div>
      </div>
      <div @click="sorry" class="member-center__stats-item">
        <div>{{user.integral}}</div>
        <div>积分</div>
      </div>
      <div @click="$router.push({name:'myCoupon'})" class="member-center__stats-item">
        <div>{{user.couponNum}}</div>
        <div>优惠券</div>
      </div>
    </div>
    <div class="user-info">
      <van-cell-group class="user-group">
        <van-cell
          icon="records"
          title="全部订单"
          value="查看全部订单"
          is-link
          to="user/order"
        />
      </van-cell-group>
      <van-row class="user-links">
        <van-col
          @click="goOrder(0)"
          span="6"
        >
          <van-icon name="pending-payment" />
          待付款
        </van-col>
        <van-col
          @click="goOrder(1)"
          span="6"
        >
          <van-icon name="records" />
          待发货
        </van-col>
        <van-col
          @click="goOrder(2)"
          span="6"
        >
          <van-icon name="tosend" />
          待收货
        </van-col>
        <van-col
          @click="goOrder(3)"
          span="6"
        >
          <van-icon name="logistics" />
          已完成
        </van-col>
      </van-row>
      <van-cell-group>
        <van-cell
          icon="points"
          title="个人信息"
          is-link
        />
        <van-cell
          @click="sorry"
          icon="gold-coin-o"
          title="客服聊天"
          is-link
        />
        <van-cell
          icon="location-o"
          title="收货地址"
          is-link
          to="user/address"
        />
        <van-cell
          @click="sorry"
          icon="gift-o"
          title="分销员中心"
          is-link
        />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      user: {},
    };
  },
  mounted(){
    this.$store.dispatch('getActionWxUserInfo').then(res=>{
      this.user = this.$store.getters.userInfo;
    })
  },
  methods: {
    sorry(){
      this.$toast('对不起，该功能正在开发中')
    },
    goOrder(i) {
      this.$router.push({ name: "myOrder", query: { status: i } });
    }
  }
};
</script>

<style rel="stylesheet/scss" scoped lang="scss">
.user {
  padding-bottom: 60px;
  background: #f8f8f8;
  .member-center__user-info-wrapper {
    margin-bottom: 10px;
    background: #fff;
    .member-center__user-info {
      display: flex;
      position: relative;
      background-size: 100% 100% !important;
      background-repeat: no-repeat;
      &.avatar-at-top {
        flex-direction: column;
        align-items: center;
        background-image: linear-gradient(
            rgba(255, 255, 255, 0),
            rgb(255, 255, 255)
          ),
          url(../../../static/images/user/user-bg.png);
        height: 172px;
        margin-bottom: 45px;
        .user-info__avatar {
          width: 60px;
          height: 60px;
          margin-top: 25px;
          background-size: 85px 85px;
          border: 1px solid #fff;
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .user-info__info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-top: 7px;
        .user-info__username {
          font-weight: 700;
          max-width: 200px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: left;
          font-size: 20px;
          line-height: 1;
          color: rgb(51, 51, 51);
        }
      }
      .user-info__sign {
        position: absolute;
        top: 20px;
        right: 15px;
        box-sizing: border-box;
        width: auto;
        height: 22px;
        padding: 0 10px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: 12px;
        border-radius: 11px;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.2);
        img {
          width: 12px;
          height: 12px;
          margin-right: 5px;
        }
      }
      .user-info__level-wrapper {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        width: 100%;
        .user-info__level {
          position: absolute;
          right: 3%;
          bottom: -35px;
          width: 94%;
          height: 70px;
          border-radius: 8px;
          background: url(../../../static/images/user/member-bg.png);
          background-size: 100% 100%;
          color: #886c11;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .name {
            font-size: 14px;
            padding-left: 15px;
            line-height: 40px;
            align-self: flex-start;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            display: block;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            -webkit-box-flex: 1;
            flex: 1;
            &:before {
              content: " ";
              display: inline-block;
              width: 16px;
              height: 12px;
              margin-right: 5px;
              background-image: url(../../../static/images/user/member-logo.png);
              background-size: cover;
              vertical-align: -1px;
            }
          }
          .level {
            color: #fff;
            background: hsla(0, 0%, 100%, 0.2);
            display: flex;
            -webkit-box-align: center;
            align-items: center;
            height: 22px;
            margin-right: 10px;
            padding: 0 4px 0 10px;
            font-size: 12px;
            border-radius: 12px;
            box-shadow: 0 2px 8px 0 rgba(185, 157, 51, 0.2);
          }
          .level-member {
            position: absolute;
            left: 14px;
            bottom: 10px;
            width: 126px;
            height: 19px;
          }
        }
      }
    }
  }
  .member-center__stats {
    display: flex;
    -webkit-box-orient: horizontal;
    flex-direction: row;
    height: 72px;
    -webkit-box-align: center;
    align-items: center;
    border-radius: 8px;
    background: #fff;
    margin: 0 auto 10px;
    width: 94%;
    .member-center__stats-item {
      flex: 1;
      text-align: center;
      line-height: 22px;
    }
  }
  .user-info {
    height: 70%;
    padding: 0 10px 30px 10px;
    .user-group {
      margin-top: 10px;
    }
    .user-links {
      margin-bottom: 10px;
      padding: 5px 0 10px;
      font-size: 12px;
      text-align: center;
      background-color: #fff;
      .van-icon {
        display: block;
        font-size: 24px;
      }
    }
  }
}
</style>