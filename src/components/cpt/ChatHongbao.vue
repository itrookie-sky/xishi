<template>
  <div class="chat-hongbao">
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
        <span class="font-small">红包已经被抢走了</span>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "三个字",
      state: 3,
      money: 9999
    };
  },
  methods: {
    onOpenTap(ev) {},
    onCloseTap(ev) {
      this.$emit("close", "chatHongbao");
    },
    onHongbaoRecord(ev) {}
  }
};
</script>
<style scoped lang="scss">
.chat-hongbao {
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
}
</style>


