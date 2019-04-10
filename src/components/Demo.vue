<template>
  <div>
    <div class="demo-container">
      <ul class="demo-list">
        <li>
          <component :is="curAn"></component>
        </li>
        <!-- <li>
          <an6></an6>
        </li>
        <li>
          <an7></an7>
        </li>
        <li>
          <an1></an1>
        </li>
        <li>
          <an2></an2>
        </li>-->
      </ul>
    </div>
    <el-button type="success" @click="onChange($event)">点击切换特效</el-button>
    <el-button type="success" @click="onIMopen($event)">聊天登录</el-button>
    <el-button type="success" @click="onIMmsg($event)">聊天发消息</el-button>
    <el-button type="success" @click="onIMJoin($event)">加入聊天室</el-button>
    <el-button type="success" @click="onIMrg($event)">聊天注册</el-button>
    <el-button type="success" @click="onAlert($event)">点击弹窗</el-button>
    <el-button type="success" @click="onMsg($event)">点击消息</el-button>
  </div>
</template>
<script>
import an1 from "./animations/animations1.vue";
import an2 from "./animations/animations2.vue";
import an6 from "./animations/animations6.vue";
import an7 from "./animations/animations7.vue";
import { conn } from "../js/chat/chat.js";
import g from "../js/global.js";
import WebIM from "easemob-websdk";
import Utils from "../js/utils";
import { constants } from "fs";
import { error } from "util";
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
        appKey: conn.config.appkey,
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
        apiUrl: conn.config.apiURL
      };
      conn.registerUser(options);
    },
    onIMopen() {
      var self = this;
      console.log("监听IM事件", conn);

      conn.listen({
        onOpened: function(msg) {
          console.log("%c [opened] 连接已成功建立", "color: green");
        },
        onClosed: function(msg) {
          self.$message({
            message: msg,
            type: "warning"
          });
        },
        onTextMessage: function(msg) {
          console.log("收到文本消息:", msg);
        },
        onOnline: function(msg) {
          self.$message({
            message: msg,
            type: "success"
          });
        },
        onOffline: function(msg) {
          console.log("%c [offline] user offline", "color:red");
        },
        onError: function(msg) {
          console.warn("错误处理: ", msg);
        }
      });

      var option = {
        apiUrl: conn.config.apiURL,
        user: g.openId,
        pwd: g.IMpassword,
        appKey: conn.config.appkey
      };
      console.log("发送IM登录信息:", option);
      conn.open(option);
    },
    onIMJoin(e) {
      // 加入聊天室
      conn.joinChatRoom({
        roomId: "78895638446081"
      });
    },
    onIMmsg(e) {
      var self = this;
      var id = conn.getUniqueId();
      var msg = new WebIM.message("txt", id);
      var option = {
        msg: "测试文本", // 消息内容
        to: "78895638446081", // 接收消息对象(群组id)
        roomType: true, // 群聊类型，true时为聊天室，false时为群组
        success: function(msg) {
          console.log("消息发送成功:", msg);
          self.$message({
            message: "消息发送成功:" + msg,
            type: "success"
          });
        }, // 对成功的相关定义，sdk会将消息id登记到日志进行备份处理
        fail: function(msg) {
          console.error(msg);
        } // 对失败的相关定义，sdk会将消息id登记到日志进行备份处理
      };
      msg.set(option);
      msg.setGroup("groupchat"); // 群聊类型
      conn.send(msg.body);
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
    onChatCreate() {}
  }
};
</script>
<style  lang="scss">
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
</style>