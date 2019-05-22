<template>
  <div class="zan-effect" @click="onXinTap($event)">
    <div class="xin iconfont icon-xin"></div>
    <div class="xin-container">
      <transition
        name="fade"
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:after-enter="afterEnter"
        v-on:enter-cancelled="enterCancelled"
        v-on:before-leave="beforeLeave"
        v-on:leave="leave"
        v-on:after-leave="afterLeave"
        v-on:leave-cancelled="leaveCancelled"
        :duration="{ enter: 800, leave: 800 }"
      >
        <div class="xin iconfont" :class="classObject" v-if="showXin" @animationend="anEnd"></div>
      </transition>
    </div>
  </div>
</template>
<script>
import config from "../../js/config.js";
import g from "../../js/global.js";
export default {
  data() {
    return {
      state: 1,
      showXin: false
    };
  },
  methods: {
    onXinTap() {
      var _this = this;
      this.showXin = true;
      var state = Math.floor(6 * Math.random());
      this.state = state == 0 ? 1 : state;
      /* this.$post(config.getUrl(config.liked), {
        liveId: g.liveId,
        openId: g.openId
      }).then(function(resp) {
        if (resp.data.success) {
        }
      }); */
    },
    anEnd() {
      this.showXin = false;
    },
    // --------
    // 进入中
    // --------

    beforeEnter: function(el) {
      console.log("beforeEnter");
    },
    // 当与 CSS 结合使用时
    // 回调函数 done 是可选的
    enter: function(el, done) {
      // ...
      done();
      console.log("enter");
    },
    afterEnter: function(el) {
      console.log("afterEnter");
    },
    enterCancelled: function(el) {
      console.log("enterCancelled");
    },

    // --------
    // 离开时
    // --------

    beforeLeave: function(el) {
      console.log("beforeLeave");
    },
    // 当与 CSS 结合使用时
    // 回调函数 done 是可选的
    leave: function(el, done) {
      // ...
      done();
      console.log("leave");
    },
    afterLeave: function(el) {
      // ...
      console.log("afterLeave");
    },
    // leaveCancelled 只用于 v-show 中
    leaveCancelled: function(el) {
      console.log("leaveCancelled");
      // ...
    }
  },
  computed: {
    classObject: function() {
      return {
        "icon-like-line": this.state == 1,
        "icon-xinxing": this.state == 2,
        "icon-xin3": this.state == 3,
        "icon-xin21": this.state == 4,
        "icon-xin2": this.state == 5
      };
    }
  }
};
</script>
<style lang="scss">
.zan-effect {
  position: absolute;
  color: $xs-color-font;
  z-index: 5;
  width: 0.26rem;
  height: 0.32rem;
  right: 0.08rem;
  bottom: 1.82rem;
  .xin {
    position: absolute;
    z-index: 6;
    font-size: 0.26rem;
  }
  .xin-container {
    position: absolute;
    z-index: 5;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .fade-enter-to {
    animation: fadein 0.4s;
  }
  .fade-enter-active,
  .fade-leave-active {
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translate(0, 0);
  }
}

@keyframes fadein {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(0, -0.6rem);
    opacity: 1;
  }
}
</style>

