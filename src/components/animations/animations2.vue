<template>
  <div class="an2">
    <div class="bg">
      <div class="xin-outter">
        <img class="xin" src="../../assets/img/effect/animations/effect_xin.png">
      </div>
    </div>
    <div class="move">
      <div class="fly-left">
        <img class="person" src="../../assets/img/effect/animations/effect_men.png">
        <img class="bird" src="../../assets/img/effect/animations/effect_fly1.png">
      </div>
      <div class="fly-right">
        <img class="person" src="../../assets/img/effect/animations/effect_women.png">
        <img class="bird" src="../../assets/img/effect/animations/effect_fly2.png">
      </div>
    </div>
    <div class="people">
      <div class="people-container">
        <img class="men" src="../../assets/img/effect/animations/effect_men.png">
        <img class="women" src="../../assets/img/effect/animations/effect_women.png">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {}
};
</script>
<style lang="scss" scoped>
$time-end: 8s;
$move-time: 3s;
$all-count: 1;
.an2 {
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
    .xin-outter {
      position: absolute;
      overflow: hidden;
      left: 50%;
      bottom: 0.2rem;
      transform: translate(-50%);
      width: 100%;
      animation-name: showxin;
      animation-duration: $move-time;
      animation-timing-function: ease;
      animation-iteration-count: $all-count;
      animation-fill-mode: forwards;
      .xin {
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 2.5rem;
        transform: translate(-50%);
      }
    }
  }
  .move {
    z-index: 2;
    .fly-left,
    .fly-right {
      position: absolute;
      width: 0.6rem;
      bottom: 0.4rem;
      animation-duration: $move-time;
      animation-timing-function: linear;
      animation-iteration-count: $all-count;
      animation-fill-mode: forwards;
    }
    .fly-left {
      left: 25%;
      animation-name: move_left;
    }
    .fly-right {
      left: 50%;
      animation-name: move_right;
    }
    .person {
      width: 100%;
      display: block;
    }
    .bird {
      position: absolute;
      width: 0.8rem;
      left: 50%;
      bottom: -0.36rem;
      transform: translate(-50%);
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
      animation-duration: 1s;
      animation-timing-function: ease;
      animation-iteration-count: 1;
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
@keyframes showxin {
  0% {
    height: 0;
  }
  100% {
    height: 2.3rem;
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
@keyframes move_left {
  0% {
    opacity: 1;
    transform: translate(0, 0);
  }
  25% {
    transform: translate(-0.6rem, -1.2rem);
  }
  50% {
    transform: translate(-0.2rem, -1.6rem);
  }
  75% {
    transform: translate(0.1rem, -1.2rem);
  }
  100% {
    transform: translate(0.1rem, -0.6rem);
    opacity: 0;
  }
}
@keyframes move_right {
  0% {
    opacity: 1;
    transform: translate(0, 0);
  }
  25% {
    transform: translate(0.6rem, -1.2rem);
  }
  50% {
    transform: translate(0.2rem, -1.6rem);
  }
  75% {
    transform: translate(-0.1rem, -1.2rem);
  }
  100% {
    transform: translate(-0.1rem, -0.6rem);
    opacity: 0;
  }
}
</style>


