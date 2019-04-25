<template>
  <div class="happy-container">
    <div class="happy-inner">
      <div class="happy-item" @click="onClick">
        <img src="../../assets/img/effect/animations/effect_xingqiu.png">
        <h4>仪式全程</h4>
      </div>
      <div class="happy-item">
        <img src="../../assets/img/effect/animations/effect_xingqiu.png">
        <h4>仪式全程</h4>
      </div>
      <div class="happy-item">
        <img src="../../assets/img/effect/animations/effect_xingqiu.png">
        <h4>仪式全程</h4>
      </div>
      <div class="happy-item">
        <img src="../../assets/img/effect/animations/effect_xingqiu.png">
        <h4>仪式全程</h4>
      </div>
      <div class="happy-item">
        <img src="../../assets/img/effect/animations/effect_xingqiu.png">
        <h4>仪式全程</h4>
      </div>
      <div class="happy-item">
        <img src="../../assets/img/effect/animations/effect_xingqiu.png">
        <h4>仪式全程</h4>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      testRes:
        "http://video.changlive.com/d1/584720825510/vod_video/1540370426307/A9TUQS.m3u8"
    };
  },
  methods: {
    onClick() {
      this.$emit("video-src", this.testRes);
    }
  }
};
</script>
<style lang="scss" >
.happy-container {
  width: 100%;
  height: 100%;
  background-color: $xs-color-theme;
  border-radius: $border-radius-bottom;
  overflow-x: hidden;
  overflow-y: scroll;
  .happy-inner {
    width: 100%;
    min-height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    .happy-item {
      height: 1.45rem;
      flex: 0 0 50%;
      border: $xs-border-1;
      > img {
        border: $xs-border-1;
        width: 95%;
        height: 1.1rem;
        margin: 0 auto;
        background-color: #fff;
      }
      > h4 {
        font-size: 0.14rem;
        color: #fff;
      }
    }
  }
}
</style>