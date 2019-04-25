<template>
  <div class="an7">
    <div class="bg">
      <img class="chuanxin" src="../../assets/img/effect/animations/effect_chuanxin.png">
      <img class="tianshi" src="../../assets/img/effect/animations/effect_tianshi.png">
    </div>
    <div class="move">
      <img class="jian" src="../../assets/img/effect/animations/effect_jian.png">
      <img class="boom" src="../../assets/img/effect/animations/effect_boom.png">
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
    this.$nextTick(function() {
      utils.log("监听动画播放结束", _this.$refs);
      _this.$refs.people.addEventListener("animationend", function() {
        _this.onEnd();
        utils.log("动画播放结束");
      });
    });
  }
};
</script>
<style lang="scss" >
$move-time: 5s;
$move-time-jian: 1s;
$move-time-boom: 1s;
$move-time-boom-jian: 2s;
$show: 0.5s;
.an7 {
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
    .chuanxin {
      position: absolute;
      height: 1.8rem;
      left: 50%;
      top: 30%;
      transform: translate(-50%, -50%);
      opacity: 0;
      animation-name: show_chuanxin;
      animation-duration: $show;
      animation-timing-function: ease;
      animation-iteration-count: 1;
      animation-delay: $move-time-boom-jian;
      animation-fill-mode: forwards;
    }
    .tianshi {
      position: absolute;
      height: 1rem;
      right: 0;
      bottom: 0;
      opacity: 1;
      animation-name: show_tianshi;
      animation-duration: $show;
      animation-timing-function: linear;
      animation-iteration-count: 1;
      animation-delay: $move-time-jian;
      animation-fill-mode: forwards;
    }
  }
  .move {
    z-index: 2;
    img {
      position: absolute;
    }
    .jian {
      width: 0.54rem;
      bottom: 0.6rem;
      right: 0.4rem;
      transform: rotate(45deg);
      animation-name: move_jian;
      animation-duration: $move-time-jian;
      animation-timing-function: linear;
      animation-iteration-count: 1;
      animation-fill-mode: forwards;
    }
    .boom {
      width: 1.2rem;
      top: 0.2rem;
      left: 24%;
      transform: scale(0, 0);
      animation-name: move_boom;
      animation-duration: $move-time-boom;
      animation-timing-function: linear;
      animation-iteration-count: 1;
      animation-delay: $move-time-jian;
      animation-fill-mode: forwards;
    }
  }
  .people {
    z-index: 3;
    .people-container {
      position: absolute;
      display: flex;
      align-items: center;
      bottom: 0.2rem;
      left: 50%;
      transform: translate(-50%);
      z-index: inherit;
      opacity: 0;
      animation-name: show_people;
      animation-duration: 0.5s;
      animation-timing-function: ease;
      animation-iteration-count: 1;
      animation-delay: $move-time-boom-jian;
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
@keyframes show_people {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes move_jian {
  0% {
    opacity: 1;
    transform: rotate(45deg) translateX(0) translateY(0);
  }
  99% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: rotate(45deg) translateX(-1.6rem) translateY(-0.2rem);
  }
}
@keyframes move_boom {
  0% {
    transform: scale(0, 0);
  }
  50% {
    transform: scale(1.6, 1.6);
  }
  99% {
    transform: scale(1, 1);
  }
  100% {
    transform: scale(0, 0);
  }
}
@keyframes show_chuanxin {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes show_tianshi {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>


