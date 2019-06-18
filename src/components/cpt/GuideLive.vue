<template>
  <div class="guide-live-container" @click="onClose">
    <div class="item-base item-1">
      <span>点赞功能</span>
      <span>(可增加当家指数)</span>
    </div>
    <div class="item-base item-2">
      <span>签到界面</span>
    </div>
    <div class="item-base item-3">
      <span>我的余额</span>
    </div>
    <div class="item-base item-4">
      <span>礼物界面</span>
      <span>(可增加当家指数)</span>
    </div>
    <div class="item-base item-5">
      <span>发送红包</span>
    </div>
  </div>
</template>
<script>
import utils from "../../js/utils.js";
import { localKey } from "../../js/const.js";
export default {
  data() {
    return {};
  },
  methods: {
    onClose() {
      utils.storage.setData(localKey.guidelive, 1);
      this.$emit("close", "guidelive");
    }
  },
  computed: {}
};
</script>
<style lang="scss">
.guide-live-container {
  display: block;
  position: fixed;
  z-index: 5;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.55);
  .item-base {
    position: absolute;
    color: #fff;
    font-size: 0.14rem;
    right: 0.55rem;
  }
  .item-1 {
    bottom: 2rem;
  }
  .item-2 {
    bottom: 1.65rem;
  }
  .item-3 {
    bottom: 1.3rem;
  }
  .item-4 {
    bottom: 1rem;
  }
  .item-5 {
    bottom: 0.65rem;
  }
}
</style>

