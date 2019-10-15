<template>
  <div class="auth">
    <van-popup v-model="$store.state.auth.show" position="bottom" :style="{ height: '40%',padding: '10px' }">
      <p class="app">本应用申请</p>
      <h2 class="tip">获取你的昵称、头像、地区及性别</h2>
      <div class="user">
        <van-row class="clearfix"> 
          <div class="user-avatar fl">
            <img :src="user.wxImage" alt="用户头像">
          </div>
          <div class="user-info fl">
            <van-cell :title="user.wxNickname" value="" label="微信个人信息" />
          </div>
        </van-row>
      </div>
      <van-row gutter="20">
        <van-col offset="4" span="8">
          <van-button @click="closePopup" type="default">取 消</van-button>
        </van-col>
        <van-col span="8">
          <van-button @click="auth" type="primary">允 许</van-button>
        </van-col>
      </van-row>
    </van-popup>
  </div>
</template>

<script>
import { Popup, Row, Col } from "vant";
export default {
  name: "authLogin",
  data() {
    return {
      user: {}
    };
  },
  mounted() {
    if (!this.$store.getters.isAuth) {
      this.$store
        .dispatch("getActionWxUserInfo")
        .then(res => {
          this.user = res;
        })
        .catch(res => {
          console.log(res);
        });
    }
  },
  methods: {
    closePopup() {
      this.$store.state.auth.show = false;
    },
    auth() {
      this.$store
        .dispatch("goActionAuth")
        .then(() => {
          this.$toast("授权成功，可以尽情的玩耍了！");
          this.closePopup();
        })
        .catch(() => {
          this.$toast("授权失败！");
        });
    }
  },
  components: {
    [Popup.name]: Popup
  }
};
</script>
<style lang="scss" scoped>
.auth {
  .app {
    font-size: 14px;
  }
  .tip {
    font-size: 16px;
    padding: 10px 0;
  }
  .user {
    padding: 4px 0;
    box-sizing: border-box;
    border-top: 1px solid #ebedf0;
    border-bottom: 1px solid #ebedf0;
    .user-avatar {
      padding-top: 10px;
      img {
        width: 50px;
        height: 50px;
        border: 1px solid #ebedf0;
        border-radius: 5px;
      }
    }
    .user-info {
      width: 200px;
    }
  }
  .van-button {
    width: 100%;
    margin-top: 20px;
  }
}
</style>