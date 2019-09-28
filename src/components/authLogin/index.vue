<template>
  <div>
    <van-popup
      v-model="$store.state.auth.show"
      position="bottom"
      :style="{ height: '40%',padding: '10px' }"
    >
      <p>本应用申请</p>
      <h2>获取你的昵称、头像、地区及性别</h2>
      <div class="user">
        <van-row>
          <van-col span="4">
            <div class="user-avatar">
              <img
                :src="user.avatar"
                alt="用户头像"
              >
            </div>
          </van-col>
          <van-col span="20">
            <div class="user-info">
              <van-cell
                :title="user.nickname"
                value=""
                label="微信个人信息"
              />
            </div>
          </van-col>
        </van-row>

      </div>
      <van-row>
        <van-col span="12">
          <van-button
            @click="closePopup"
            type="default"
          >取 消</van-button>
        </van-col>
        <van-col span="12">
          <van-button
            @click="auth"
            type="primary"
          >允 许</van-button>
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
.user {
  box-sizing: border-box;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  .user-avatar {
    padding-top: 10px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 5px;
    }
  }
}
.van-button {
  width: 80%;
  margin-top: 20px;
}
</style>