<template>
  <div class="an6">
    <div class="bg">
      <img class="xingqiu" src="../../assets/img/effect/animations/effect_xingqiu.png">
    </div>
    <div class="move">
      <div class="feichuan">
        <img class="img-feichuan" src="../../assets/img/effect/animations/effect_feichuan.png">
        <img class="ren" src="../../assets/img/effect/animations/effect_taikongren.png">
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
$move-time: 3s;
$show: 0.5s;
.an6 {
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
    .xingqiu {
      width: 3rem;
      left: 0;
      top: 0;
    }
  }
  .move {
    z-index: 2;
    img {
      position: absolute;
    }
    .feichuan {
      position: absolute;
      width: 6rem;
      height: 6rem;
      top: 1.6rem;
      left: 1.6rem;
      transform: rotate(-20deg);
      animation-name: move_feichuan;
      animation-duration: $move-time;
      animation-timing-function: ease;
      animation-iteration-count: 1;
      // animation-delay: $move-time;
      animation-fill-mode: forwards;
      .ren,
      .img-feichuan {
        position: absolute;
      }
      .ren {
        width: 0.3rem;
        top: 0.14rem;
        left: 0.4rem;
      }
      .img-feichuan {
        left: 0;
        top: 0rem;
        width: 1rem;
      }
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
@keyframes show_people {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes move_feichuan {
  0% {
    transform: rotate(-20deg);
  }
  100% {
    transform: rotate(34deg);
  }
}
</style>


