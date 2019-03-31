<template>
  <div class="login">
    <img class="logo" src="../assets/img/guide/guide_03.png">
    <div class="login-content" v-show="!logined">
      <div class="login-form">
        <span class="iconfont icon-lock login-icon"></span>
        <input
          class="login-input"
          type="password"
          name="password"
          maxlength="20"
          v-model="password"
          placeholder="请输入密码"
        >
      </div>
      <div class="line"></div>
      <div class="login-btn" v-on:click="onLogin">
        <span class="iconfont icon-bofang pos-center"></span>
        <span class="pos-center">登录</span>
      </div>
    </div>
    <div class="lab-container" v-show="logined">
      <guide-lab-list
        class="guide-container"
        v-for="guide in guideList"
        v-bind:key="guide.id"
        v-bind:guide-data="guide"
      ></guide-lab-list>
    </div>
  </div>
</template>
<script>
import utils from "../js/utils.js";
import guide from "@/components/GuideSelect";
import g from "../js/global.js";
import conf from "../js/config.js";
export default {
  components: {
    "guide-lab-list": guide
  },
  data: function() {
    return {
      password: "",
      logined: false,
      guideList: g.testGuideList
    };
  },
  methods: {
    onLogin: function(ev) {
      utils.log(this.password);
      if (this.password == "") return;
      this.$post(conf.getUrl(conf.login), {
        openId: g.openId,
        liveId: g.liveId,
        password: this.password
      })
        .then(function(resp) {
          if (resp.status == 200) {
            this.logined = true;
          } else {
            utils.log("请求失败", resp.status);
          }
        })
        .catch(function(err) {
          utils.log(err);
        });
    }
  }
};
</script>

<style  scoped>
.login {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /*e60119 e5086c*/
  background: -webkit-radial-gradient(50% 30%, circle cover, #e5086c, #e60119);
}
.logo {
  display: block;
  width: 36%;
  margin: 20% auto 0;
}
.login-content {
  position: absolute;
  height: 0.36rem;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.3rem;
}
.login-content .login-form {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  font-weight: 300;
}
.login-content .login-form:nth-child(1) {
  flex: 2 1 20%;
}
.login-content .login-form:nth-child(2) {
  flex: 4 1 20%;
}
.login-content .login-icon {
  font-size: 0.28rem;
  width: 20%;
  display: inline-block;
  color: #fff;
}
.login-content .login-input {
  -web-kit-appearance: none;
  -moz-appearance: none;
  outline: 0;
  padding: 0 0 0 0.2rem;
  font-size: 0.2rem;
  font-weight: 200;
  width: 2.45rem;
  height: 100%;
  border: none;
  text-align: left;
  background-color: rgba(0, 0, 0, 0);
}
.line {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 0.01rem;
  background-color: #fff;
}
.login-btn {
  position: absolute;
  left: 50%;
  bottom: -0.84rem;
  transform: translateX(-50%);
  width: 0.6rem;
  height: 0.6rem;
  z-index: 20;
}
.login-btn :nth-child(1) {
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.4);
  left: 57%;
}
.login-btn :nth-child(2) {
  width: 100%;
  font-size: 0.16rem;
  color: #fff;
}
.icon-bofang {
  height: 0.6rem;
}
.lab-container {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 30%;
  display: flex;
}
.guide-container {
}
</style>

