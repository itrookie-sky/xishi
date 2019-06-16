<template>
  <div class="live-container">
    <section class="live-top">
      <!--  
        x5-video-player-type="h5"
        x5-video-player-fullscreen="true"
      -->
      <!--  <video
        id="live-video"
        class="video-js vjs-default-skin live-video"
        ref="videoPlayer"
        controls="controls"
        preload="none"
        poster
        x5-playsinline="true"
        playsinline="true"
        webkit-playsinline="true"
        x-webkit-airplay="true"
        x5-video-orientation="portraint"
      >
        <source
          src="http://video.changlive.com/d1/584720826491/vod_video/1546355590080/MRMKBJ.m3u8"
          type="application/x-mpegURL"
        >
      </video>-->
      <video-player
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
        @play="onPlayerPlay($event)"
        @pause="onPlayerPause($event)"
      ></video-player>
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
          <component :is="curActiveCpt" @video-src="setVideoSrc"></component>
        </keep-alive>
      </div>
    </section>
  </div>
</template>
<script>
import videojs from "video.js";
import utils from "../js/utils";
import config from "../js/config.js";
import Chat from "./cpt/Chat.vue";
import Happy from "./cpt/HappyList.vue";
import g from "../js/global.js";
import IM from "../js/chat/chat.js";
import weixin from "../js/weixin.js";
import { videoPlayer } from "vue-video-player";
export default {
  components: {
    Chat,
    Happy,
    videoPlayer
  },
  data() {
    return {
      people: "1000万",
      progress: 30,
      /**直播功能区 */
      activeNav: ["祝福现场", "幸福时刻"],
      anSelectIdx: 0,
      activeCpts: [Chat, Happy],
      playerOptions: {
        //        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            withCredentials: false,
            src:
              "http://video.changlive.com/d1/584720826491/vod_video/1546355590080/MRMKBJ.m3u8",
            type: "application/x-mpegURL"
          }
        ],
        poster: g.live.cover_image, //你的封面地址
        width: document.documentElement.clientWidth,
        height: 300,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: true,
          fullscreenToggle: true //全屏按钮
        }
      }
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
    },
    player() {
      return this.$refs.videoPlayer.player;
    }
  },
  methods: {
    onAnTap(ev) {
      this.anSelectIdx = +ev.target.getAttribute("data-an-key");
    },
    onPlayerPlay(player) {
      utils.log("%c[video play] 视频播放", "color:green");
    },
    onPlayerPause(player) {
      utils.log("%c[video pause] 视频暂停", "color:red");
    },
    setVideoSrc(src) {
      utils.log("%c[video src] 视频播放地址切换", "color:green", src);
      this.player.src(src);
    },
    updateHomeValue() {
      var _this = this;
      this.$post(config.getUrl(config.exponent), {
        openId: g.openId,
        liveId: g.liveId,
        page_size: 5
      }).then(function(resp) {
        if (resp.data.success) {
          var data = resp.data.data;
          _this.people = data.seeNum;
          _this.progress = data.man_count;
        }
      });
    }
  },
  beforeDestroy() {
    var _this = this;
    utils.time.rmTimer(_this.updateHomeValue, _this);
    utils.log("移除轮询");
  },
  mounted: function() {
    var _this = this;

    weixin.shareUpdate();

    this.$nextTick(function() {
      utils.time.rgTimer(_this.updateHomeValue, _this, 2000);
      _this
        .$post(config.getUrl(config.live), {
          openId: g.openId,
          liveId: g.liveId
        })
        .then(function(resp) {
          if (resp.status == 200) {
            var data = resp.data.data;
            if (resp.data.success) {
              _this.people = data.visit_num + "";
              _this.progress = data.exponent.man.percent;
              g.chatRoomId = resp.data.data.chat;
              _this.setVideoSrc(resp.data.data.video);
              IM.open();
            } else {
            }
          } else {
            _this.$message({
              message: `错误码:${resp.status}`,
              type: "warning"
            });
          }
        });
    });

    /*  videojs(
      this.$refs.video,
      {
        bigPlayButton: false,
        textTrackDisplay: false,
        posterImage: true,
        errorDisplay: false,
        controlBar: true,
        loop: true,
        sources: [
          {
            src:
              "http://video.changlive.com/d1/584720826491/vod_video/1546355590080/MRMKBJ.m3u8",
            type: "application/x-mpegURL"
          }
        ]
      },
      function() {
        this.play();
        utils.log("自动播放视频");
      }
    ); */
  }
};
</script>
<style scoped lang="scss">
.live-container {
  position: absolute;
  flex-direction: column;
  flex-wrap: wrap;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  font-size: 0.2rem;
  overflow: hidden;
}
.live-top {
  width: 100%;
  height: 33.33%;
  .video-player {
    height: 100%;
  }
}
.live-video {
  width: 100%;
  height: 100%;
}
.active-container {
  position: absolute;
  /* width: 97.3%;
  height: 66.3%; */
  top: 33.3%;
  bottom: 0;
  left: 0;
  right: 0;
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

