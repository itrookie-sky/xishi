<template>
  <div class="chat-open-hongbao">
    <div class="ch-new" v-show="state==1">
      <div class="iconfont icon-iconclose" @click="onCloseTap($event)"></div>
      <img src="../../assets/img/hongbao/hongbao_03.png">
      <p>
        <span class="text-bg-yellow">{{name}}</span>
        <span>给你发了个红包</span>
      </p>
      <div class="cn-btn" @click="onOpenTap($event)"></div>
    </div>
    <div class="ch-open-none" v-show="state==2">
      <div class="iconfont icon-iconclose" @click="onCloseTap($event)"></div>
      <img src="../../assets/img/hongbao/hongbao_02.png">
      <p class="con-hongbao">
        <span class="text-bg-yellow">{{name}}</span>
        <span>的红包</span>
        <br>
        <span class="font-small">红包已经被抢光了</span>
      </p>

      <p class="con-btn" @click="onHongbaoRecord($event)">红包详情</p>
    </div>
    <div class="ch-open-success" v-show="state==3">
      <div class="iconfont icon-chahao" @click="onCloseTap($event)"></div>
      <p class="cos-hongbao">
        <span class="text-bg-yellow">{{name}}</span>
        <span>的红包</span>
        <br>
      </p>
      <div class="cos-money">
        <p>恭喜您!</p>
        <p>
          <span>抢到了</span>
          <span class="text-bg-theme">{{money+"元"}}</span>
          <span>红包</span>
        </p>
      </div>
      <div class="cos-record">
        <p class="cos-record-btn" @click="onHongbaoRecord($event)">红包详情</p>
        <p>请到我的余额进行提现</p>
      </div>
    </div>
    <div class="money-record" v-show="showRecord" @click.capture.stop="onRecordClose($event)">
      <div class="mr-outter">
        <ul class="mr-list">
          <li v-for="(item,idx) in parsedRecord" :key="idx" class="color-red">
            <p>{{item.createtime}}</p>
            <p>
              <span>{{item.nickname}}</span>
              <span>抢到了</span>
              <span>{{item.price}}</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import utils from "../../js/utils.js";
export default {
  props: {
    hongbaoMsg: Object
  },
  data() {
    return {
      id: "",
      name: "",
      state: 2,
      money: 0,
      record: [],
      num: 0,
      blessing: "",
      /**红包 1中奖 0每中*/
      status: 0,
      receiveNum: 0,
      showRecord: false
    };
  },
  watch: {
    hongbaoMsg: function(v) {
      this.state = 1;
      this.record = this.hongbaoMsg.list;
      this.num = this.hongbaoMsg.info.num;
      this.status = this.hongbaoMsg.receive.status;
      this.receiveNum = this.hongbaoMsg.info.receiveNum;
      if (this.hongbaoMsg.receive.status == 1) {
        this.id = this.hongbaoMsg.receive.bag_id;
        this.name = this.hongbaoMsg.receive.sendName;
        this.money = this.hongbaoMsg.receive.price;
      } else {
        this.money = this.hongbaoMsg.info.price;
        this.blessing = this.hongbaoMsg.info.blessing;
        this.name = this.hongbaoMsg.info.sendName;
      }
    }
  },
  computed: {
    parsedRecord() {
      return this.record.map(function(value) {
        value.createtime = utils.time.getYMDHMSByTimestamp(value.createtime);
        return value;
      });
    }
  },
  methods: {
    onOpenTap(ev) {
      this.state = this.status == 1 ? 3 : 2;
    },
    onCloseTap(ev) {
      this.showRecord = false;
      this.$emit("close", "chatHongbao");
    },
    onHongbaoRecord(ev) {
      if (!this.record || !this.record.length) {
        this.$message({
          message: "暂无记录",
          type: "warning"
        });
        return;
      }
      this.showRecord = true;
    },
    onRecordClose(ev) {
      this.showRecord = false;
    }
  }
};
</script>
<style  lang="scss">
.chat-open-hongbao {
  position: fixed;
  z-index: 6;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  font-size: 0.14rem;
  color: #fff;
  .icon-iconclose {
    position: absolute;
    font-size: 0.18rem;
  }
  .text-bg-yellow {
    z-index: 6;
    background-color: #dd9b2b;
    font-size: 0.12rem;
    padding: 0.026rem 0.1rem;
    border-radius: 0.02rem;
    line-height: 0.14rem;
    color: #fff;
  }
  .text-bg-theme {
    background-color: $xs-color-theme1;
    font-size: 0.22rem;
    color: #fff;
    padding: 0.08rem 0.16rem;
    border-radius: 0.06rem;
  }
  .ch-new {
    position: absolute;
    left: 15%;
    right: 15%;
    bottom: 5%;
    .icon-iconclose {
      right: 0.1rem;
      top: 0.1rem;
    }
    p,
    .cn-btn {
      position: absolute;
      z-index: 7;
      text-align: center;
      left: 50%;
      transform: translateX(-50%);
    }
    img {
      width: 100%;
    }
    > p {
      top: 35%;
      white-space: nowrap;
    }
    .cn-btn {
      top: 50%;
      width: 0.84rem;
      height: 0.84rem;
      border-radius: 50%;
    }
  }
  .ch-open-success {
  }
  .ch-open-none {
    position: absolute;
    left: 15%;
    right: 15%;
    bottom: 5%;
    .icon-iconclose {
      right: 0.1rem;
      top: 0.36rem;
    }
    p {
      position: absolute;
      z-index: 7;
      text-align: center;
      left: 50%;
      transform: translateX(-50%);
    }
    img {
      width: 100%;
    }
    .con-hongbao {
      top: 50%;
      line-height: 0.2rem;
      letter-spacing: 0.02rem;
      :last-child {
        font-size: 0.12rem;
      }
    }
    .con-btn {
      bottom: 10%;
      font-size: 0.14rem;
    }
  }
  .ch-open-success {
    position: absolute;
    left: 10%;
    right: 10%;
    bottom: 6%;
    height: 3.6rem;
    background-color: #fff;
    color: $xs-color-font;
    font-weight: 500;
    font-size: 0.16rem;
    .cos-hongbao {
      margin-top: 0.1rem;
      margin-bottom: 0.35rem;
    }
    .cos-money {
      line-height: 0.35rem;
      :nth-child(1) {
      }
      :nth-child(2) {
      }
    }
    .icon-chahao {
      position: absolute;
      right: 0.05rem;
      top: 0.05rem;
      font-size: 0.14rem;
    }
    .cos-record {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 0.12rem;
      font-size: 0.14rem;
      .cos-record-btn {
        margin: 0 auto 0.08rem;
        padding: 0.02rem 0.08rem;
        width: 0.8rem;
        color: #fff;
        background-color: $xs-color-theme1;
        border-radius: 0.03rem;
      }
    }
  }
  .money-record {
    position: fixed;
    left: 10%;
    right: 10%;
    bottom: 10%;
    height: 3rem;
    background-color: #fff;
    border: 0.015rem solid $xs-color-theme1;
    border-radius: 0.05rem;
    padding: 0.2rem 0 0.24rem 0.24rem;
    z-index: 7;
    text-align: left;
    font-size: 0.14rem;

    .mr-outter {
      width: 100%;
      height: 100%;
      overflow-x: hidden;
      overflow-y: scroll;
      .mr-list {
        li {
          margin-top: 0.1rem;
          :nth-child(2) {
            font-size: 0.13rem;
          }
        }
      }
    }

    .color-gray {
      color: $xs-color-gray2;
    }
    .color-red {
      color: $xs-color-font;
    }
  }
}
</style>


