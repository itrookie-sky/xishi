<template>
  <div class="demo-outter">
    <div class="demo-inner">
      <!-- <div class="demo-container">
        <ul class="demo-list">
          <li>
            <component :is="curAn"></component>
          </li>
        </ul>
      </div>
      <el-button type="success" @click="onChange($event)">点击切换特效</el-button>
      <el-button type="success" @click="onIMopen($event)">聊天登录</el-button>
      <el-button type="success" @click="onIMmsg($event)">聊天发消息</el-button>
      <el-button type="success" @click="onIMJoin($event)">加入聊天室</el-button>
      <el-button type="success" @click="onIMQuit($event)">退出聊天室</el-button>
      <el-button type="success" @click="onIMrg($event)">聊天注册</el-button>
      <el-button type="success" @click="onAlert($event)">点击弹窗</el-button>
      <el-button type="success" @click="onMsg($event)">点击消息</el-button>
      <el-button type="success" @click="onHappy($event)">请求幸福时刻列表</el-button>
      <el-button type="success" @click="onRank($event)">请求排行榜</el-button>
      <el-button type="success" @click="getWXAcc($event)">请求微信签名</el-button>
      <el-button type="success" @click="onHongbaoSend($event)">发送微信红包</el-button>
      <el-button type="success" @click="onGive($event)">请求礼物列表</el-button>
      <el-button type="success" @click="onBig($event)">大屏请求测试</el-button>-->
      <div class="xin">
        <div class="iconfont icon-like-line"></div>
        <div class="iconfont icon-xinxing"></div>
        <div class="iconfont icon-xin3"></div>
        <div class="iconfont icon-xin21"></div>
        <div class="iconfont icon-xin2"></div>
      </div>
    </div>
  </div>
</template>
<script>
import an1 from "./animations/animations1.vue";
import an2 from "./animations/animations2.vue";
import an6 from "./animations/animations6.vue";
import an7 from "./animations/animations7.vue";
import IM from "../js/chat/chat.js";
import g from "../js/global.js";
import WebIM from "easemob-websdk";
import utils from "../js/utils";
import { post } from "../js/http/http.js";
import config from "../js/chat/webim.config";
import conf from "../js/config.js";
import weixin from "../js/weixin.js";
export default {
  components: {
    an1: an1,
    an2: an2,
    an6: an6,
    an7: an7
  },
  data() {
    return {
      radio: "1",
      curAn: an1,
      anState: 1,
      first: false
    };
  },

  methods: {
    onIMrg() {
      var self = this;
      var options = {
        username: g.openId,
        password: g.IMpassword,
        nickname: "测试名字",
        appKey: IM.conn.config.appkey,
        success: function() {
          // self.onIMopen();
          self.$message({
            message: "注册成功",
            type: "success"
          });
        },
        error: function() {
          self.$message({
            message: "注册失败",
            type: "error"
          });
        },
        apiUrl: IM.conn.config.apiURL
      };
      IM.conn.registerUser(options);
    },
    onIMopen() {
      var self = this;
      console.log("监听IM事件", IM.conn);

      IM.conn.listen({
        onOpened: function(msg) {
          console.log("%c [opened] 连接已成功建立", "color: green");
        },
        onClosed: function(msg) {
          console.log("%c [closed] 连接已关闭", "color: red");
        },
        onTextMessage: function(msg) {
          console.log("收到文本消息:", msg);
        },
        onOnline: function(msg) {
          console.log("%c [online] 用户已经上线", "color: green");
        },
        onOffline: function(msg) {
          console.log("%c [offline] user offline", "color:red");
        },
        onError: function(msg) {
          console.warn("错误处理: ", msg);
        },
        onPresence: function(msg) {
          console.log("%c [chatroom] state type", "color:red", msg);
        }
      });

      var option = {
        apiUrl: IM.conn.config.apiURL,
        // user: g.openId,
        user: "big_1000",
        pwd: g.IMpassword,
        appKey: IM.conn.config.appkey
      };
      console.log("发送IM登录信息:", option);
      IM.conn.open(option);
    },
    onIMJoin(e) {
      // 加入聊天室
      IM.conn.joinChatRoom({
        roomId: "78895638446081"
      });
    },
    onIMQuit(e) {
      IM.conn.quitChatRoom({
        roomId: "78895638446081"
      });
    },
    onIMmsg(e) {
      var self = this;
      var id = IM.conn.getUniqueId();
      var msg = new WebIM.message("txt", id);
      var option = {
        msg: "测试文本", // 消息内容
        to: "78895638446081", // 接收消息对象(群组id)
        roomType: true, // 群聊类型，true时为聊天室，false时为群组
        success: function(msg) {
          console.log("消息发送成功:", msg);
        }, // 对成功的相关定义，sdk会将消息id登记到日志进行备份处理
        fail: function(msg) {
          console.log(msg);
        } // 对失败的相关定义，sdk会将消息id登记到日志进行备份处理
      };
      msg.set(option);
      msg.setGroup("groupchat"); // 群聊类型
      IM.conn.send(msg.body);
      console.log("发送消息:", msg.body);
    },
    onChange() {
      let cur;
      this.anState++;
      if (this.anState > 4) {
        this.anState = 1;
      }
      switch (this.anState) {
        default:
        case 1:
          cur = an1;
          break;
        case 2:
          cur = an2;
          break;
        case 3:
          cur = an7;
          break;
        case 4:
          cur = an6;
          break;
      }
      this.curAn = cur;
    },
    onAlert() {
      this.$confirm("此操作永久生效,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    onMsg() {
      this.$message({
        message:
          "警告,这是一条警告!警告,这是一条警告!警告,这是一条警告!警告,这是一条警告!警告,这是一条警告!警告,这是一条警告!警告,这是一条警告!警告,这是一条警告!警告,这是一条警告!",
        type: "warning",
        showClose: true,
        duration: 0
      });
    },
    onChatCreate() {},
    onHappy() {
      post(conf.getUrl(conf.happy), {
        openId: g.openId,
        liveId: g.liveId,
        page_size: 6
      });
    },
    onRank() {
      post(conf.getUrl(conf.exponent), {
        openId: g.openId,
        liveId: g.liveId,
        page_size: 6
      });
    },
    getWXAcc() {
      post(conf.getUrl(conf.wxSign), {
        openId: g.openId,
        liveId: g.liveId
      });
    },
    onHongbaoSend(ev) {
      var self = this;
      post(conf.getUrl(conf.sendHongbao), {
        liveId: g.liveId,
        openId: g.openId,
        receiver: 0,
        money: 0.01,
        num: 1,
        blessing: "发送红包"
      }).then(function(resp) {
        if (resp.data.success) {
          var payData = resp.data.data;
          g.hongbaoId = payData.order_no;
          utils.log("%c[wx pay] 调用支付", "color:blue");
          //微信支付
          weixin
            .pay(
              payData.timeStamp,
              payData.nonceStr,
              payData.prepay_id,
              payData.paySign
            )
            .then(function(pay) {
              utils.log("%c[wx pay] 支付成功", "color:green", pay);
              if (pay.err_msg == "get_brand_wcpay_request:ok") {
                this.sendHongbao();
              }
            });
        }
      });
    },
    onGive(ev) {
      post(conf.getUrl(conf.giftList), {
        openId: g.openId,
        liveId: g.liveId,
        page: 1,
        page_size: 20
      });
    },
    onBig(ev) {
      /* post(conf.getUrl(conf.prizeReady), { liveId: g.liveId });
      post(conf.getUrl(conf.luckDraw), { liveId: g.liveId });
      post(conf.getUrl(conf.allPrizePeople), { liveId: g.liveId }); */
      post(conf.getUrl(conf.bigLogin), {
        liveId: g.liveId,
        password: "123456"
      });
    }
  }
};
</script>
<style  lang="scss">
.demo-outter {
  overflow-x: hidden;
  overflow-y: scroll;
  .demo-inner {
    .demo-container {
      position: relative;
      /* border: 1px solid #000; */
      margin: 0 auto;
      .demo-list {
        width: 100%;
        li {
          width: 3.5rem;
          height: 3rem;
          margin: 0 auto 0.2rem;
          border: $xs-border-1;
        }
      }
    }
  }
  .xin {
  }
}
</style>