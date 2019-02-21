<template>
  <div class="an1">
    <div class="bg">
      <div class="meteor" data-id-1>
        <img class="star" src="../../assets/img/effect/animations/effect_01_01.png">
        <img class="tail" src="../../assets/img/effect/animations/effect_01_02.png">
      </div>
      <div class="meteor" data-id-2>
        <img class="star" src="../../assets/img/effect/animations/effect_01_01.png">
        <img class="tail" src="../../assets/img/effect/animations/effect_01_02.png">
      </div>
      <div class="meteor" data-id-3>
        <img class="star" src="../../assets/img/effect/animations/effect_01_01.png">
        <img class="tail" src="../../assets/img/effect/animations/effect_01_02.png">
      </div>
      <div class="meteor" data-id-4>
        <img class="star" src="../../assets/img/effect/animations/effect_01_01.png">
        <img class="tail" src="../../assets/img/effect/animations/effect_01_02.png">
      </div>
      <div class="meteor" data-id-5>
        <img class="star" src="../../assets/img/effect/animations/effect_01_01.png">
        <img class="tail" src="../../assets/img/effect/animations/effect_01_02.png">
      </div>
      <div class="meteor" data-id-6>
        <img class="star" src="../../assets/img/effect/animations/effect_01_01.png">
        <img class="tail" src="../../assets/img/effect/animations/effect_01_02.png">
      </div>
      <div class="meteor" data-id-7>
        <img class="star" src="../../assets/img/effect/animations/effect_01_01.png">
        <img class="tail" src="../../assets/img/effect/animations/effect_01_02.png">
      </div>
      <div class="meteor" data-id-8>
        <img class="star" src="../../assets/img/effect/animations/effect_01_01.png">
        <img class="tail" src="../../assets/img/effect/animations/effect_01_02.png">
      </div>
      <div class="meteor" data-id-9>
        <img class="star" src="../../assets/img/effect/animations/effect_01_01.png">
        <img class="tail" src="../../assets/img/effect/animations/effect_01_02.png">
      </div>
      <div class="meteor" data-id-10>
        <img class="star" src="../../assets/img/effect/animations/effect_01_01.png">
        <img class="tail" src="../../assets/img/effect/animations/effect_01_02.png">
      </div>
    </div>
    <div class="people"></div>
  </div>
</template>
<script>
export default {
  methods: {}
};
</script>
<style lang="scss" scoped>
$time-end: 8s;
$meteor-normal: 2s;
$meteor-fast: 1s;
$meteor-slow: 3s;
.an1 {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .bg,
  .people {
    position: absolute;
    width: inherit;
    height: inherit;
  }
  .bg {
    z-index: 1;
    transform: rotate(-45deg);
    .meteor {
      position: absolute;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;

      animation-name: meteor;
      animation-timing-function: ease;
      animation-iteration-count: infinite;
      .star {
        flex: 0 0 0rem;
        width: 0.1rem;
      }
      .tail {
        width: 1rem;
      }
    }
    [data-id-1] {
      left: 0rem;
      top: 0.5%;
      animation-duration: $meteor-normal;
    }
    [data-id-2] {
      left: 0.8rem;
      top: 0.8rem;
      animation-duration: $meteor-fast;
    }
    [data-id-3] {
      left: 0.4rem;
      bottom: 0.6rem;
      animation-duration: $meteor-slow;
    }
    [data-id-4] {
      left: 0rem;
      bottom: 0rem;
      animation-duration: $meteor-normal;
    }
    [data-id-5] {
      left: 0.9rem;
      bottom: 0.4rem;
      animation-duration: $meteor-fast;
    }
    [data-id-6] {
      left: -5%;
      bottom: 1rem;
      animation-duration: $meteor-slow;
    }
    [data-id-7] {
      right: 0.2rem;
      bottom: 50%;
      animation-duration: $meteor-fast;
    }
    [data-id-8] {
      left: 1.2rem;
      bottom: 0.7rem;
      animation-duration: $meteor-normal;
    }
    [data-id-9] {
      left: 10%;
      top: 33%;
      animation-duration: $meteor-slow;
    }
    [data-id-10] {
      left: 40%;
      top: 20%;
      animation-duration: $meteor-normal;
    }
  }
  .people {
    z-index: 2;
  }
}
@keyframes meteor {
  0% {
    transform: translate(500%);
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translate(0rem);
    opacity: 0;
  }
}
</style>


