<template>
  <div class="an3">
    <div class="bg">
      <img src="../../assets/img/effect/animations/effect_lu.png">
    </div>
    <div class="move">
      <div class="huaban-outter">
        <!-- <img src="../../assets/img/effect/animations/effect_huaban1.png">
        <img src="../../assets/img/effect/animations/effect_huaban2.png">
        <img src="../../assets/img/effect/animations/effect_huaban3.png">
        <img src="../../assets/img/effect/animations/effect_huaban1.png">
        <img src="../../assets/img/effect/animations/effect_huaban2.png">
        <img src="../../assets/img/effect/animations/effect_huaban3.png">-->
      </div>
      <img class="cao" src="../../assets/img/effect/animations/effect_cao.png">
    </div>
    <div class="people">
      <div class="people-container" ref="people">
        <img class="men" src="../../assets/img/effect/animations/effect_men.png">
        <img class="women" src="../../assets/img/effect/animations/effect_women.png">
      </div>
    </div>
  </div>
</template>
<script>
import utils from "../../js/utils.js";
export default {
  methods: {
    onEnd() {
      this.$emit("an-complete");
    }
  },
  mounted() {
    var _this = this;
    // this.$nextTick(function() {
    //   utils.log("监听动画播放结束", _this.$refs);
    //   _this.$refs.people.addEventListener("animationend", function() {
    //     _this.onEnd();
    //     utils.log("动画播放结束");
    //   });
    // });
  }
};
</script>
<style lang="scss">
$time-end: 8s;
$move-time: 5s;
$all-count: 1;
.an3 {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .bg,
  .people,
  .move {
    position: absolute;
    width: inherit;
    height: inherit;
  }
  .bg {
    z-index: 1;
    :first-child {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 3rem;
    }
  }
  .move {
    z-index: 2;
    .huaban-outter {
      img {
        position: absolute;
      }
    }
    .cao {
      width: 100%;
      position: absolute;
      bottom: 0.6rem;
      left: 50%;
      transform: translate(-50%);
      animation-name: show_cao;
      animation-duration: 0.5s;
      animation-timing-function: ease;
      animation-iteration-count: $all-count;
      animation-delay: $move-time;
      animation-fill-mode: forwards;
    }
  }
  .people {
    z-index: 3;
    .people-container {
      position: absolute;
      display: flex;
      align-items: center;
      bottom: 0.6rem;
      left: 50%;
      transform: translate(-50%);
      z-index: inherit;
      opacity: 0;
      animation-name: show_people;
      animation-duration: 0.5s;
      animation-timing-function: ease;
      animation-iteration-count: $all-count;
      animation-delay: $move-time;
      animation-fill-mode: forwards;
      .men,
      .women {
        width: 1.2rem;
        bottom: 0rem;
      }
      .men {
        left: 0;
      }
      .women {
        left: 0.8rem;
      }
    }
  }
}
@keyframes show_cao {
  0% {
    bottom: -1rem;
  }
  100% {
    bottom: 0.6rem;
  }
}
@keyframes show_people {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>


