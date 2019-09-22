<template>
  <div id="apps">
    <div class="login">
      <div class="welcome"></div>
      <div class="login-form">
        <div class="login-inp">
          <label>手机号</label>
          <input
            type="text"
            placeholder="请输入用户名"
            v-model.trim="username"
          />
        </div>
        <div class="login-inp">
          <label>密码</label>
          <input
            type="password"
            placeholder="请输入密码"
            v-model.trim="password"
          />
        </div>
        <div class="login-inp">
          <span @click="submit(username,password)">{{btnName}}</span>
        </div>
      </div>
      <div class="login-txt">
        <span @click="redirects('/register')">立即注册</span>|<span @click="tip()">忘记密码？</span></div>
    </div>
  </div>

</template>

<script>
export default {
  name: "login",
  data() {
    return {
      username: null,
      password: null,
      btnName: "立即登录",
      redirect: "/"
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        if (route.name == "login") {
          this.btnName = "立即登录";
        } else if (route.name == "register") {
          this.btnName = "立即注册";
        }
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  mounted() {},
  methods: {
    submit(username, password) {
      let data = {
        username,
        password
      };
      if (data.username == null || data.password == null) {
        this.$toast("用户名和密码不能为空 o(╥﹏╥)o");
      } else {
        this.$store
          .dispatch("LoginByUsername", data)
          .then(() => {
            this.$toast("登录成功");
            this.$router.push({ path: this.redirect || "/" });
          })
          .catch(e => {
            console.log(e);
          });
      }
    },
    redirects(url) {
      this.$router.push(url);
      if (this.$route.name == "login") {
        this.btnName = "立即登录";
      } else if (this.$route.name == "register") {
        this.btnName = "立即注册";
      }
    },
    tip() {
      this.$toast("该功能正在维护 o(╥﹏╥)o");
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url(../../assets/login/login-bg.png) no-repeat;
  background-size: cover;
  position: fixed;
  z-index: -10;
}
.welcome {
  width: 100%;
  height: 60px;
  margin: 20% 0;
  background: url(../../assets/login/welcome.png) no-repeat;
  background-size: contain;
}

.login-inp {
  margin: 0 30px 15px 30px;
  border: 1px solid #fff;
  border-radius: 25px;
}
.login-inp label {
  width: 4em;
  padding-left: 6px;
  text-align: center;
  display: inline-block;
  color: #fff;
}
.login-inp input {
  line-height: 30px;
  color: #fff;
  background-color: transparent;
  border: none;
  outline: none;
}
.login-inp span {
  display: block;
  width: 100%;
  text-align: center;
  line-height: 30px;
  color: #fff;
  font-size: 16px;
  letter-spacing: 5px;
}
.login-txt {
  text-align: center;
  color: #fff;
  font-size: 12px;
}
.login-txt span {
  color: #fff;
  padding: 0 5px;
}
</style>