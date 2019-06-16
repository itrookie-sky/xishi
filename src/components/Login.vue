<template>
  <div class="login">
    <img class="logo" src="../assets/img/guide/guide_03.png">
    <div class="login-content" v-show="!logined">
      <div class="login-form" v-show="hasPassword">
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
      <div class="login-btn" v-on:click="onLogin($event)">
        <span class="iconfont icon-bofang pos-center"></span>
        <span class="pos-center">{{countDown}}</span>
      </div>
    </div>
    <div class="lab-container" v-show="logined">
      <guide-lab-list
        class="guide-container"
        v-for="guide in guideParsed"
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
import { localKey, router } from "../js/const.js";
import config from "../js/chat/webim.config";
export default {
  components: {
    "guide-lab-list": guide
  },
  data: function() {
    return {
      password: "123456",
      logined: false,
      guideList: g.testGuideList,
      countDown: "登录"
    };
  },
  computed: {
    guideParsed: {
      get: function() {
        return this.guideList;
      },
      set: function(va) {
        let data = [
          {
            id: "1",
            type: "man",
            desc: g.live.man,
            title: require("../assets/img/guide/guide_07.png"),
            labList: []
          },
          {
            id: "2",
            type: "woman",
            desc: g.live.woman,
            title: require("../assets/img/guide/guide_09.png"),
            labList: []
          }
        ];

        for (let i = 0; i < va.length; i++) {
          var label = va[i];
          switch (label.type) {
            case "man":
              data[0].labList.push(label);
              break;
            case "woman":
              data[1].labList.push(label);
              break;
          }
        }

        this.guideList = data;
      }
    },
    hasPassword() {
      return +g.userInfo.password == 1;
    }
  },
  methods: {
    onLogin: function(ev) {
      utils.log(this.password);
      var _this = this;

      this.$post(conf.getUrl(conf.login), {
        openId: g.openId,
        liveId: g.liveId,
        passWord: this.hasPassword ? this.password : ""
      })
        .then(function(resp) {
          if (resp.status == 200) {
            _this.$message({
              message: resp.data.message,
              type: resp.data.success ? "success" : "warning"
            });
            _this.logined = resp.data.success;
            if (resp.data.success) {
              //登录成功
              var data = resp.data.data;
              _this.global.live = resp.data.data.live;
              _this.global.chatRoomId = resp.data.data.live.chat;
              _this.guideParsed = resp.data.data.labels;
              utils.storage.setData(localKey.pw, _this.password);
              if (data.curLabel && data.curLabel.length > 0) {
                g.curLabel = data.curLabel;
                g.userLabel = data.curLabel[0].id;
                _this.onHadCurLab();
              }
            } else {
              //登录失败
              _this.$message({
                message: resp.data.message,
                type: "warning"
              });
              _this.countDown = resp.data.data.countDownTime;
            }
          }
        })
        .catch(function(err) {
          utils.log(err);
        });
    },
    onHadCurLab: function(ev) {
      let self = this;
      this.$post(conf.getUrl(conf.setLabel), {
        openId: this.global.openId,
        liveId: this.global.liveId,
        labelId: g.curLabel[0].id
      })
        .then(function(resp) {
          if (resp.status == 200) {
            self.loginedHandler();
          } else {
            utils.log("请求失败", resp.status);
          }
        })
        .catch(function(err) {
          self.global.utils.log(err);
        });
    },
    loginedHandler() {
      let g = this.global;
      this.$router.push(router.live);
    },
    updateTimer() {
      var count = +this.countDown;
      if (count > 0) {
        count--;
        this.countDown = count;
      } else {
        this.countDown = "登录";
      }
    }
  },
  beforeDestroy() {
    var _this = this;
    utils.time.rmTimer(_this.updateTimer, _this);
  },
  mounted() {
    var _this = this;

    this.logined = false;
    utils.time.rgTimer(this.updateTimer, this);

    this.$nextTick(function() {
      _this.password = utils.storage.getData(localKey.pw) || "";
    });
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

