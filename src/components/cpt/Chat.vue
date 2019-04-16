<template>
  <div class="chat-container">
    <div class="cm-top iconfont icon-htmal5icon35" @click="onTopTap($event)"></div>
    <div class="cm-xin iconfont icon-xin" @click="onXinTap($event)"></div>
    <div class="cm-sign-in iconfont icon-qiandao1" @click="onSignInTap($event)"></div>
    <div class="cm-ren iconfont icon-ren12" @click="onRenTap($event)"></div>
    <div class="cm-liwu iconfont icon-liwu2" @click="onLiwuTap($event)"></div>
    <div class="cm-hongbao iconfont icon-ai-hongbao" @click="onHongBaoTap($event)"></div>
    <section class="chat-outter">
      <div class="chat-inner">
        <chat-item v-for="(item,index) in chatList" :key="index" :msg="item"></chat-item>
      </div>
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
    <hongbao v-show="showHongBao" @close="mgrShow"></hongbao>
    <chat-hongbao v-show="showChatHongbao" @close="mgrShow"></chat-hongbao>
    <give v-show="showGive" @close="mgrShow"></give>
  </div>
</template>
<script>
import utils from "../../js/utils";
import { exists } from "fs";
import Rank from "./Rank.vue";
import SignIn from "./SignIn.vue";
import Hongbao from "./Hongbao.vue";
import ChatHongbao from "./ChatHongbao.vue";
import Give from "./Give.vue";
import ChatItem from "./ChatItem.vue";
import IM from "../../js/chat/chat.js";
import g from "../../js/global.js";
import { msgType } from "../../js/const.js";
export default {
  props: {
    chatLink: String
  },
  components: {
    rank: Rank,
    "sign-in": SignIn,
    hongbao: Hongbao,
    "chat-hongbao": ChatHongbao,
    give: Give,
    "chat-item": ChatItem
  },
  data() {
    return {
      chatInput: "",
      showRank: false,
      showSignIn: false,
      showHongBao: false,
      showChatHongbao: false,
      showGive: false,
      chatList: []
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
    onRenTap(ev) {
      this.$router.replace("/money");
    },
    onLiwuTap(ev) {
      this.showGive = true;
    },
    onHongBaoTap(ev) {
      this.showHongBao = true;
    },
    /**================聊天相关================= */
    onSentTap(ev) {
      let _this = this;
      let msg = IM.getBaseMsg(msgType.text, this.chatInput);
      IM.sendMsg(msg).then(function(data) {
        _this.chatInput = "";
        _this.chatList.push(data);
      });
    },
    onBiaoqingTap(ev) {},
    onCameraTap(ev) {},
    onImgTap(ev) {},
    onMessage(msg) {
      let data = JSON.parse(msg.data);
      this.chatList.push(data);
    },
    /**界面管理 */
    mgrShow(params) {
      switch (params) {
        case "rank":
          this.showRank = false;
          break;
        case "signin":
          this.showSignIn = false;
          break;
        case "hongbao":
          this.showHongBao = false;
          break;
        case "chatHongbao":
          this.showChatHongbao = false;
          break;
        case "give":
          this.showGive = false;
          break;
      }
    }
  },
  mounted: function() {
    var _this = this;
    console.log(IM.conn);
    this.$nextTick(function() {
      IM.conn.listen({
        onOpened: function(msg) {
          utils.log("%c [opened] 连接已成功建立", "color: green");
          IM.join();
        },
        onClosed: function(msg) {
          utils.log("%c [closed] 连接已关闭", "color: red");
        },
        onTextMessage: function(msg) {
          utils.log("%c [msg] 收到文本消息 ", "color:blue", msg);
          _this.onMessage(msg);
        },
        onOnline: function(msg) {
          utils.log("%c [online] 用户已经成功连接", "color: green");
        },
        onOffline: function(msg) {
          utils.log("%c [offline] 用户已经离线", "color:red");
        },
        onError: function(msg) {
          utils.warn("%c [error] 错误处理: ", "color: red", msg);
        },
        onPresence: function(msg) {
          console.log("%c [chatroom] state type", "color:red", msg);
        }
      });
    });
  }
};
</script>
<style lang="scss">
.chat-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: $border-radius-bottom;
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
    background-color: $xs-color-gray3;
    .chat-inner {
      width: 100%;
      min-height: 120%;
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
    border-radius: $border-radius-bottom;
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
      width: 0.213rem;
      height: 0.213rem;
      top: 50%;
      right: 27%;
      transform: translateY(-40%);
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