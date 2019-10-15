<template>
  <div class="login">
    <div class="welcome"></div>
    <div class="login-form">
      <div class="login-inp">
        <label>供应商</label>
        <input
          type="text"
          placeholder="请输入账号"
          v-model.trim="account"
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
        <span @click="submit(account,password)">{{btnName}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/login";
export default {
  name: "login",
  data() {
    return {
      account: null,
      password: null,
      btnName: "立即登录"
    };
  },
  methods: {
    submit(account, password) {
      let d = { account, password };
      if (d.account == null || d.password == null) {
        this.$toast("用户名和密码不能为空");
      } else {
        login(d).then(res => {
          if (res.code === 0) {
            this.$toast.success("登录成功");
            this.$router.push("/supplier");
          }
        });
      }
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
  z-index: 1;
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
</style>