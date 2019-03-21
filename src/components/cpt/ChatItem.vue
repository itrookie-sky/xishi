<template>
  <div class="chat-item">
    <div class="head">
      <img class="head-img" src="../../assets/img/effect/effect_05.png">
    </div>
    <div class="ci-outter">
      <div class="ci-triangle"></div>
      <div class="chat-text" v-show="state==1">{{text}}</div>
      <div class="chat-hongbao" v-show="state==2" @click="onHongbaoTap($event)">
        <img class="hb-bg" src="../../assets/img/hongbao/hongbao_11.png">
        <img class="hb-icon" src="../../assets/img/guide/guide_07.png">
        <p class="hb-desc">{{hongbaoDesc}}</p>
      </div>
      <div class="chat-img" v-show="state==3||state==4||state==5">
        <img src="../../assets/img/effect/effect_05.png">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      /**
       * 1.文本 2.红包 3.图片 4.特效 5.gif图
       */
      state: 4,
      headSrc: "../../assets/img/effect_05.png",
      src: "",
      text: "测试文本",
      hongbaoDesc: "新人专属"
    };
  },
  methods: {
    onHongbaoTap(e) {}
  }
};
</script>

<style lang="scss" scoped>
.chat-item {
  width: 100%;
  margin: 0 0 0.2rem;
  padding: 0.1rem 0 0 0.1rem;
  display: flex;
  align-items: flex-start;
  .head {
    flex: 0 0 auto;
    .head-img {
      display: block;
      width: 0.4rem;
      height: 0.4rem;
      border-radius: 50%;
    }
  }
  .ci-outter {
    position: relative;
    padding: 0.08rem 0.08rem;
    margin-left: 0.15rem;
    flex: 0 0 auto;
    background-color: $xs-color-theme;
    border-radius: 0.04rem;
    font-size: 0.14rem;
    min-height: 0.368rem;
    color: #fff;
    .ci-triangle {
      position: absolute;
      width: 0;
      height: 0;
      border-width: 0.1rem 0.1rem 0.1rem 0;
      border-style: solid;
      border-color: transparent $xs-color-theme transparent transparent;
      left: -0.1rem;
      top: 0.08rem;
    }
    .chat-text {
      min-width: 1.88rem;
      text-align: left;
    }
    .chat-img {
      min-width: 1.88rem;
      > img {
        width: 100%;
      }
    }
    .chat-hongbao {
      min-width: 1.8rem;
      .hb-bg {
        width: 100%;
      }
      .hb-icon {
        position: absolute;
        width: 0.25rem;
        top: 0.1rem;
        left: 50%;
        transform: translateX(-50%);
      }
      .hb-desc {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0.2rem;
      }
    }
  }
}
</style>

