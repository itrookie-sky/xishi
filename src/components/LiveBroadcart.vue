<template>
  <div class="live-container">
    <section class="live-top">
      <video
        id="live-video"
        class="video-js vjs-default-skin live-video"
        controls="controls"
        preload="none"
        poster
        x5-playsinline="true"
        playsinline="true"
        webkit-playsinline="true"
        x-webkit-airplay="true"
        x5-video-player-type="h5"
        x5-video-player-fullscreen="false"
        x5-video-orientation="portraint"
      >
        <source
          src="http://video.changlive.com/d1/584720824163/vod_video/1544769107686/MX6S1W.m3u8"
          type="application/x-mpegURL"
        >
      </video>
    </section>
    <section class="active-container">
      <div class="active-menu">
        <div class="active-people">
          <span class="iconfont icon-ren12"></span>
          <span>{{people}}</span>
        </div>
        <div class="active-live">
          <span class="iconfont icon-shuaxin"></span>
          <span>直播</span>
        </div>
        <div class="active-home">
          <div class="active-top">
            <div>
              <img src="../assets/img/guide/guide_07.png">
              <span>{{progressMan}}</span>
            </div>
            <div>当家指数</div>
            <div>
              <img src="../assets/img/guide/guide_09.png">
              <span>{{progressWoman}}</span>
            </div>
          </div>
          <div class="active-progress">
            <div class="ap-rate" :style="pgObj"></div>
          </div>
        </div>
      </div>
      <ul class="active-nav">
        <li
          class="an-item"
          :class="{'w-70':anSelectIdx==idx}"
          v-for="(va,idx) in activeNav"
          :key="idx"
          :data-an-key="idx"
          @click="onAnTap"
        >{{va}}</li>
      </ul>
      <!-- 活动区 -->
      <div class="active-content">
        <keep-alive>
          <component :is="curActiveCpt"></component>
        </keep-alive>
      </div>
    </section>
  </div>
</template>
<script>
import videojs from "video.js";
import Utils from "../js/utils";
import Chat from "./cpt/Chat.vue";
import Happy from "./cpt/HappyList.vue";
export default {
  components: {
    Chat,
    Happy
  },
  data() {
    return {
      people: "1000万",
      progress: 30,
      /**直播功能区 */
      activeNav: ["祝福现场", "幸福时刻"],
      anSelectIdx: 0,
      activeCpts: [Chat, Happy]
    };
  },
  computed: {
    progressMan: function() {
      return this.progress + "%";
    },
    progressWoman: function() {
      return `${100 - this.progress}%`;
    },
    pgObj() {
      return {
        width: this.progressMan
      };
    },
    curActiveCpt() {
      return this.activeCpts[this.anSelectIdx];
    }
  },
  methods: {
    onAnTap(ev) {
      this.anSelectIdx = +ev.target.getAttribute("data-an-key");
    }
  },
  meounted: function() {
    videojs(
      "live-video",
      {
        bigPlayButton: false,
        textTrackDisplay: false,
        posterImage: true,
        errorDisplay: false,
        controlBar: true
      },
      function() {
        this.play();
      }
    );
  }
};
</script>
<style scoped lang="scss">
.live-container {
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  height: 100vh;
  font-size: 0.2rem;
  overflow: hidden;
}
.live-top {
  width: 100%;
  height: 33.33%;
}
.live-video {
  width: 100%;
  height: 100%;
}
.active-container {
  width: 97.3%;
  height: 66.3%;
  padding: 0 0.04rem 0.04rem 0.04rem;
  border: rgba(0, 0, 0, 0) solid 0.01rem;
  background: -webkit-radial-gradient(50% 20%, circle cover, #e5086c, #e60119);
}
.active-menu {
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 0.48rem;
  // border: #000 solid 1px;
  color: #fff;
  font-size: 0.13rem;
  .iconfont {
    font-size: 0.24rem;
  }
  .active-people,
  .active-live {
    height: 0.33rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex: 1 1 20%;
    .iconfont {
      height: 0.24rem;
    }
  }
  .active-home {
    height: 100%;
    flex: 1 1 60%;
    // border: #000 solid 1px;
    .active-top {
      width: 96%;
      height: 46%;
      margin: 0 auto;
      display: flex;
      :nth-child(1),
      :nth-child(3) {
        display: flex;
        flex: 1 1 30%;
        align-items: center;
        img {
          flex: none;
          width: 0.15rem;
          height: 0.18rem;
        }
      }
      :nth-child(2) {
        flex: 1 1 40%;
        line-height: 0.24rem;
        text-align: center;
      }
      :nth-child(1) {
        flex-direction: row;
        span {
          text-align: left;
          padding-left: 0.04rem;
        }
      }
      :nth-child(3) {
        flex-direction: row-reverse;
        span {
          text-align: right;
          padding-right: 0.02rem;
        }
      }
    }
    .active-progress {
      height: 36%;
      width: 96%;
      margin: 0.02rem auto 0;
      background-color: rgba(255, 255, 255, 0.4);
      .ap-rate {
        height: 100%;
        width: 20%;
        background-color: rgb(0, 180, 237);
      }
    }
  }
}
.active-nav {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: 100%;
  height: 0.24rem;
  font-size: 0.14rem;
  color: #e5086a;
  .an-item {
    flex: 0 1 30%;
    width: 30%;
    height: 0.24rem;
    line-height: 0.24rem;
    background-color: #fff;
    transition: all 0.2s ease;
  }
  li:not(:first-child) {
    border-left: 0.05rem solid #e5086a;
  }
  .w-70 {
    width: 70%;
    flex: 1 0 30%;
  }
}
.active-content {
  width: 100%;
  height: 81.33%;
  margin-top: 0.05rem;
}
</style>

