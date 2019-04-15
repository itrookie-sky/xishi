<template>
  <div class="chat-item">
    <div class="head">
      <img class="head-img" src="../../assets/img/effect/effect_05.png">
      <p class="nick">{{nick}}</p>
    </div>
    <div class="ci-outter">
      <div class="ci-triangle"></div>
      <div class="chat-text" v-show="state=='text'">{{text}}</div>
      <div class="chat-hongbao" v-show="state=='money'" @click="onHongbaoTap($event)">
        <img class="hb-bg" src="../../assets/img/hongbao/hongbao_11.png">
        <img class="hb-icon" src="../../assets/img/guide/guide_07.png">
        <p class="hb-desc">{{hongbaoDesc}}</p>
      </div>
      <div class="chat-img" v-show="state=='img'||state=='emoji'||state=='gift'">
        <img :src="imgSrc">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    msg: Object
  },
  data() {
    return {
      /**
       * 1.文本 2.红包 3.图片 4.特效 5.gif图
       */
      state: this.msg.type,
      headSrc: this.msg.from_headimg || "",
      text: "测试文本",
      testSrc: require("../../assets/img/effect/effect_05.png"),
      nick: "名字最多哈哈哈",
      /**红包 */
      hongbaoId: this.msg.id,
      num: this.msg.num,
      amount: this.msg.amount
    };
  },
  computed: {
    imgSrc() {
      let src = "";
      switch (this.state) {
        case "img":
        case "emoji":
          src = this.msg.content;
          break;
        case "gift":
          src = this.msg.img;
          break;
        default:
          src = "";
          break;
      }
      return this.src;
    },
    hongbaoDesc() {
      let desc = "";
      if (this.msg.type == "money") {
        switch (this.msg.to_type) {
          case 0:
            desc = "新人专属";
            break;
          case 1:
            desc = "新郎团";
            break;
          case 2:
            desc = "新娘团";
            break;
          case 3:
            desc = "全部";
            break;
        }
      }
      return desc;
    },
    hongbaoContent() {
      let desc = "";
      if (this.msg.type == "money") {
        desc = this.msg.content;
      }
      return desc;
    }
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
  padding: 0.05rem 0 0 0.02rem;
  display: flex;
  align-items: flex-start;
  .head {
    flex: 0 0 auto;
    .head-img {
      display: block;
      width: 0.4rem;
      height: 0.4rem;
      border-radius: 50%;
      margin: 0 auto;
    }
    .nick {
      font-size: 0.1rem;
      width: 0.8rem;
      overflow: hidden;
    }
  }
  .ci-outter {
    position: relative;
    padding: 0.05rem;
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

