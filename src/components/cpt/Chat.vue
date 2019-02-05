<template>
  <div class="chat-container">
    <div class="cm-top iconfont icon-htmal5icon35" @click="onTopTap($event)"></div>
    <div class="cm-xin iconfont icon-xin" @click="onXinTap($event)"></div>
    <div class="cm-sign-in iconfont icon-qiandao1" @click="onSignInTap($event)"></div>
    <div class="cm-ren iconfont icon-ren12" @click="onRenTap($event)"></div>
    <div class="cm-liwu iconfont icon-liwu2" @click="onLiwuTap($event)"></div>
    <div class="cm-hongbao iconfont icon-ai-hongbao" @click="onHongBaoTap($event)"></div>
    <section class="chat-outter">
      <div class="chat-inner"></div>
    </section>
    <!-- 聊天输入 -->
    <section class="chat-func">
      <el-input
        class="cf-in"
        maxlength="300"
        placeholder="请输入内容"
        v-model="chatInput"
        clearable
        resize="none"
      ></el-input>
      <div class="cf-sent iconfont icon-icon_sent" @click="onSentTap($event)"></div>
      <div class="cf-exp iconfont icon-biaoqing2" @click="onBiaoqingTap($event)"></div>
      <div class="cf-camera iconfont icon-xiangji" @click="onCameraTap($event)"></div>
      <div class="cf-img iconfont icon-jiahao" @click="onImgTap($event)" @tap="onImgTap($event)"></div>
    </section>
    <rank v-show="showRank" @close="mgrShow" :is-small="true"></rank>
    <sign-in v-show="showSignIn" @close="mgrShow"></sign-in>
  </div>
</template>
<script>
import utils from "../../js/utils";
import { exists } from "fs";
import Rank from "./Rank.vue";
import SignIn from "./SignIn.vue";
export default {
  components: {
    rank: Rank,
    "sign-in": SignIn
  },
  data() {
    return {
      chatInput: "",
      showRank: false,
      showSignIn: false
    };
  },
  methods: {
    /**互动功能 */
    onTopTap(ev) {
      this.showRank = true;
    },
    onXinTap(ev) {},
    onSignInTap(ev) {
      this.showSignIn = true;
    },
    onRenTap(ev) {},
    onLiwuTap(ev) {},
    onHongBaoTap(ev) {},
    /**聊天相关 */
    onSentTap(ev) {
      utils.log("聊天信息");
    },
    onBiaoqingTap(ev) {},
    onCameraTap(ev) {},
    onImgTap(ev) {},
    /**界面管理 */
    mgrShow(params) {
      switch (params) {
        case "rank":
          this.showRank = false;
          break;
        case "signin":
          this.showSignIn = false;
          break;
      }
    }
  }
};
</script>
<style lang="scss">
.chat-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #fff;
  > .iconfont {
    position: absolute;
    color: $xs-color-font;
    z-index: 5;
    font-size: 0.26rem;
    right: 0.08rem;
  }
  .cm-top {
    top: 0;
  }
  .cm-xin {
    bottom: 1.82rem;
  }
  .cm-sign-in {
    bottom: 1.48rem;
  }
  .cm-ren {
    bottom: 1.14rem;
  }
  .cm-liwu {
    bottom: 0.84rem;
  }
  .cm-hongbao {
    bottom: 0.5rem;
  }
  /**聊天内容区*/
  .chat-outter {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0.36rem;
    overflow-y: scroll;
    overflow-x: none;
    .chat-inner {
      width: 100%;
      height: 300%;
    }
  }
  /**聊天输入区*/
  .chat-func {
    position: absolute;
    display: flex;
    align-items: center;
    background-color: #e5e5e5;
    bottom: 0;
    height: 0.36rem;
    width: 100%;
    .cf-in {
      flex: 1 1 70%;
      height: 90%;
      > input {
        display: block;
        height: 100%;
        width: 100%;
      }
    }
    .cf-sent {
      position: absolute;
      top: 50%;
      right: 27%;
      transform: translateY(-38%);
    }
    .cf-exp,
    .cf-camera,
    .cf-img {
      flex: 0 0 0.3rem;
      font-size: 0.26rem;
      height: 0.26rem;
      width: 0.26rem;
    }
  }
}
</style>