<template>
  <div class="chat-container">
    <div class="cm-top iconfont icon-htmal5icon35" @click="onTopTap($event)"></div>
    <!-- <div class="cm-xin iconfont icon-xin" @click="onXinTap($event)"></div> -->
    <zan></zan>
    <div class="cm-sign-in iconfont icon-qiandao1" @click="onSignInTap($event)"></div>
    <div class="cm-ren iconfont icon-ren12" @click="onRenTap($event)"></div>
    <div class="cm-liwu iconfont icon-liwu2" @click="onLiwuTap($event)"></div>
    <div class="cm-hongbao iconfont icon-ai-hongbao" @click="onHongBaoTap($event)"></div>
    <section class="chat-outter" ref="chatOutter">
      <div class="chat-inner" ref="chatInner">
        <chat-item
          v-for="(item,index) in chatList"
          :key="index"
          :msg="item"
          @chat-item-msg="onChatItemMsg"
          @chat-img="chatBigImgShow"
        ></chat-item>
      </div>
    </section>
    <div class="chat-an" v-show="anShow">
      <component :is="anCom" @an-complete="anShowHandler"></component>
    </div>
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
      <div class="cf-img iconfont icon-saoyisao3" @click="onSaoTap($event)"></div>
    </section>
    <rank v-show="showRank" @close="mgrShow" :is-small="true" :people="rankList"></rank>
    <sign-in v-show="showSignIn" @close="mgrShow" :signNumData="signNumData"></sign-in>
    <hongbao v-show="showHongBao" @close="mgrShow" @send-msg="onPanelMsg"></hongbao>
    <chat-hongbao v-show="showChatHongbao" @close="mgrShow" :hongbaoMsg="chatHongbaoData"></chat-hongbao>
    <give v-show="showGive" @close="mgrShow" :list="giftList" @send-msg="onPanelMsg"></give>
    <exp v-show="showExp" @close="mgrShow" @send-msg="onPanelMsg"></exp>
    <bigimg :url="bigImgUrl" @close="mgrShow" v-show="showBigImg"></bigimg>
  </div>
</template>
<script>
import utils from "../../js/utils";
import { exists, utimes } from "fs";
import Rank from "./Rank.vue";
import SignIn from "./SignIn.vue";
import Hongbao from "./Hongbao.vue";
import ChatHongbao from "./ChatHongbao.vue";
import Give from "./Give.vue";
import Expression from "./Expression.vue";
import ChatItem from "./ChatItem.vue";
import Zan from "./Zan.vue";
import BigImg from "./BigImg.vue";
import IM from "../../js/chat/chat.js";
import g from "../../js/global.js";
import { msgType, giftTitle } from "../../js/const.js";
import config from "../../js/config.js";
import anConf from "../../js/animation/animation.js";
import weixin from "../../js/weixin.js";
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
    "chat-item": ChatItem,
    exp: Expression,
    zan: Zan,
    bigimg: BigImg
  },
  data() {
    return {
      chatInput: "",
      showRank: false,
      showSignIn: false,
      showHongBao: false,
      showChatHongbao: false,
      showGive: false,
      showExp: false,
      showBigImg: false,
      bigImgUrl: "",
      chatList: [
        /*  {
          from_type: "man",
          from_name: "冷暖她知",
          from_headimg:
            "http://thirdwx.qlogo.cn/mmopen/PiajxSqBRaEJIpicKqxwBVVJgm8m5VP5yJNPLBdSDbz8WFSCtiakRH2kzeeqRThsrg1h5ttfWIFcRQj1pwIKQn4EQ/132",
          from_label: "1",
          type: "emoji",
          content: "http://demo.csjlive.com/res/emoji/ttmm.gif"
        },

        {
          from_type: "woman",
          from_name: "冷暖她知",
          from_headimg:
            "http://thirdwx.qlogo.cn/mmopen/PiajxSqBRaEJIpicKqxwBVVJgm8m5VP5yJNPLBdSDbz8WFSCtiakRH2kzeeqRThsrg1h5ttfWIFcRQj1pwIKQn4EQ/132",
          from_label: "1",
          type: "emoji",
          content: "http://demo.csjlive.com/res/emoji/ttmm.gif"
        } */
      ],
      giftList: [],
      anShow: false,
      anCom: null,
      rankList: [],
      chatHongbaoData: {
        lsit: [],
        receive: {}
      },
      signNumData: {},
      scrollTimerId: 0
    };
  },
  computed: {
    chatInner: function() {
      return this.$refs.chatInner;
    },
    chatOutter: function() {
      return this.$refs.chatOutter;
    }
  },
  methods: {
    /**互动功能 */
    onTopTap(ev) {
      var _this = this;
      _this
        .$post(config.getUrl(config.exponent), {
          openId: g.openId,
          liveId: g.liveId,
          page_size: 50
        })
        .then(function(resp) {
          if (resp.data.success) {
            _this.showRank = true;
            _this.rankList =
              resp.data.data; /* .map(function(val) {
              val.nickname = decodeURI(val.nickname);
              return val;
            }); */
            utils.log("%[rank]排行榜数据处理", "color:green", _this.rankList);
          }
        });
    },
    onXinTap(ev) {
      var _this = this;
      this.$post(config.getUrl(config.liked), {
        liveId: g.liveId,
        openId: g.openId
      }).then(function(resp) {
        if (resp.data.success) {
          _this.$message({
            message: "点赞成功",
            type: "success"
          });
        }
      });
    },
    /**打开签到界面 */
    onSignInTap(ev) {
      var _this = this;
      this.$post(config.getUrl(config.signInData), {
        liveId: g.liveId
      }).then(function(resp) {
        if (resp.data.success) {
          _this.signNumData = resp.data.data;
          _this.showSignIn = true;
        }
      });
    },
    onRenTap(ev) {
      this.$router.replace("/money");
    },
    onLiwuTap(ev) {
      var _this = this;
      this.showGive = true;
      _this
        .$post(config.getUrl(config.giftList), {
          openId: g.openId,
          liveId: g.liveId,
          page: 0, //页码0 请求最后n条记录
          page_size: 50
        })
        .then(function(resp) {
          if (resp.data.success) {
            _this.giftList = resp.data.data.list;
          }
        });
    },
    onHongBaoTap(ev) {
      this.showHongBao = true;
    },
    /**================聊天相关================= */
    onSentTap(ev) {
      if (this.chatInput == "") return;
      let _this = this;
      let msg = IM.getBaseMsg(msgType.text, this.chatInput);
      IM.sendMsg(msg).then(function(data) {
        _this.chatInput = "";
        // _this.chatList.push(data);
      });
    },
    onBiaoqingTap(ev) {
      this.showExp = true;
    },
    onCameraTap(ev) {
      let _this = this;
      weixin.uploadImg().then(function(imgs) {
        for (let url of imgs) {
          _this.sendImg(url);
        }
      });
    },
    /**上传图片 */
    onImgTap(ev) {
      let _this = this;
      weixin.uploadImg().then(function(imgs) {
        for (let url of imgs) {
          _this.sendImg(url);
        }
      });
    },
    onSaoTap(ev) {
      var _this = this;
      weixin.scanQRCode().then(function(resultStr) {
        let liveId = utils.getStrParams("liveId", resultStr);
        if (liveId == g.liveId) {
          _this
            .$post(config.getUrl(config.bigSigin), {
              liveId: g.liveId,
              openId: g.openId
            })
            .then(function(resp) {
              if (resp.data.success) {
                utils.log("%c[big sigin]大屏签到成功", "color:green");
                _this.$message({
                  type: "success",
                  message: "现场签到成功"
                });
              }
            });
        }
      });
    },
    sendImg(url) {
      let _this = this;
      let msg = IM.getBaseMsg(msgType.img, url);
      IM.sendMsg(msg).then(function(data) {
        _this.chatList.push(data);
      });
    },
    onMessage(msg) {
      let data = JSON.parse(msg.data);
      this.chatList.push(data);
      this.parseMsg(data);
    },
    onPanelMsg(data) {
      utils.log("接收页面消息", data);
      // this.chatList.push(data);
      // this.parseMsg(data);
    },
    parseMsg(data) {
      var _this = this;
      switch (data.type) {
        case msgType.gift:
          this.anShow = true;
          this.anCom = anConf.config[data.animation];
          break;
      }
      setTimeout(() => {
        _this.changeScroll();
      }, 60);
    },
    anShowHandler(data) {
      utils.log("%c[animation compelet]", "color:green");
      this.anShow = false;
      this.anCom = null;
    },
    onChatItemMsg(data) {
      utils.log("%c[chat item msg]", "color:green", data);
      this.chatHongbaoData = data;
      this.showChatHongbao = true;
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
        case "exp":
          this.showExp = false;
          break;
        case "bigimg":
          this.showBigImg = false;
          break;
      }
    },
    /**显示大图 */
    chatBigImgShow(url) {
      this.showBigImg = true;
      this.bigImgUrl = url;
    },
    changeScroll() {
      var _this = this;
      var innerH = window
        .getComputedStyle(this.chatInner, null)
        .height.replace("px", "");
      var outterH = window
        .getComputedStyle(this.chatOutter, null)
        .height.replace("px", "");

      var diffH = innerH - outterH;
      console.log("[测试滚动用]", diffH);
      this.chatOutter.scrollTop = diffH * g.getScale();
    }
  },
  mounted: function() {
    var _this = this;
    console.log(IM.conn);
    this.$nextTick(function() {
      IM.conn.listen({
        onOpened: function(msg) {
          utils.log("%c[opened] 连接已成功建立", "color: green");
          IM.join();
        },
        onClosed: function(msg) {
          utils.log("%c[closed] 连接已关闭", "color: red");
        },
        onTextMessage: function(msg) {
          utils.log("%c[msg] 收到文本消息 ", "color:blue", msg);
          _this.onMessage(msg);
        },
        onOnline: function(msg) {
          utils.log("%c[online] 用户已经成功连接", "color: green");
        },
        onOffline: function(msg) {
          utils.log("%c[offline] 用户已经离线", "color:red");
        },
        onError: function(msg) {
          utils.warn("%c[error] 错误处理: ", "color: red", msg);
        },
        onPresence: function(msg) {
          console.log("%c[chatroom] 加入房间状态", "color:red", msg);
        }
      });

      _this
        .$post(config.getUrl(config.getChatList), {
          openId: g.openId,
          liveId: g.liveId,
          page: 0,
          page_size: 50
        })
        .then(function(resp) {
          if (resp.data.success) {
            var data = resp.data.data;
            if (data.list.length) {
              _this.chatList = [];
              for (let i = data.list.length - 1; i >= 0; i--) {
                let chat = data.list[i];
                _this.chatList.push(JSON.parse(chat.content));
              }
              utils.time.rgTimeout(_this.changeScroll, _this, 500);
            }
          }
        });
      console.log(this.$refs);
    });
  },
  beforeDestroy() {
    var _this = this;
    utils.time.rmTimeout(this.changeScroll, this);
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
  .chat-an {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 8;
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