<template>
  <div class="exp-container">
    <div class="exp-close-btn iconfont icon-cha" @click="onClose($event)"></div>
    <div class="exp-outter">
      <div class="exp-inner">
        <div class="exp-item" v-for="(url,index) in expList" :key="index" :data-idx="index">
          <img :src="url" @click="onSelect($event)">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import config from "../../js/config.js";
import IM from "../../js/chat/chat.js";
import { msgType } from "../../js/const.js";
export default {
  data() {
    return {
      expList: config.expression
    };
  },
  methods: {
    onClose() {
      this.$emit("close", "exp");
    },
    onSelect(ev) {
      if (ev.target instanceof Image) {
        let src = ev.target.getAttribute("src");
        let _this = this;
        let msg = IM.getBaseMsg(msgType.emoji, src);
        IM.sendMsg(msg).then(function(data) {
          _this.$emit("send-msg", data);
          _this.$emit("close", "exp");
        });
      }
    }
  }
};
</script>
<style lang="scss">
.exp-container {
  position: fixed;
  z-index: 6;
  height: 3.4rem;
  bottom: 6%;
  left: 2%;
  right: 2%;

  border: 0.015rem solid $xs-color-theme1;
  border-radius: 0.05rem;
  background-color: $xs-color-theme1;
  padding: 0.12rem 0 0 0;
  .exp-close-btn {
    position: absolute;
    top: 0.04rem;
    right: 0.06rem;
    color: #fff;
    z-index: 6;
  }
  .exp-outter {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    .exp-inner {
      width: 100%;
      width: 100%;
      min-height: 100%;
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
      .exp-item {
        height: 1.45rem;
        flex: 0 0 50%;
        > img {
          width: 95%;
          height: 1.1rem;
          margin: 0 auto;
        }
      }
    }
  }
}
</style>


