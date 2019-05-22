<template>
  <div class="happy-container">
    <div class="happy-inner">
      <div class="happy-item" @click="onClick(idx)" v-for="(val,idx) in list" :key="idx">
        <img :src="val.image">
        <h4>{{val.title}}</h4>
      </div>
    </div>
  </div>
</template>
<script>
import utils from "../../js/utils";
import config from "../../js/config.js";
import g from "../../js/global.js";
export default {
  data() {
    return {
      list: [
        {
          id: 5,
          live_id: 1000,
          title: "ceshi5",
          type: "url",
          image: "http://pic32.nipic.com/20130823/13339320_183302468194_2.jpg",
          file_url: "http://video.znj.com/v/yingyonjq0772.mp4",
          label: null,
          created: 1557028353,
          is_del: 0
        },
        {
          id: 5,
          live_id: 1000,
          title: "ceshi5",
          type: "url",
          img: "http://pic32.nipic.com/20130823/13339320_183302468194_2.jpg",
          file_url: "http://video.znj.com/v/yingyonjq0772.mp4",
          label: null,
          created: 1557028353,
          is_del: 0
        },
        {
          id: 5,
          live_id: 1000,
          title: "ceshi5",
          type: "url",
          img: "http://pic32.nipic.com/20130823/13339320_183302468194_2.jpg",
          file_url: "http://video.znj.com/v/yingyonjq0772.mp4",
          label: null,
          created: 1557028353,
          is_del: 0
        }
      ],
      pageInfo: {
        pageNum: 1,
        pageSize: 30,
        count: 5
      },
      testRes:
        "http://video.changlive.com/d1/584720825510/vod_video/1540370426307/A9TUQS.m3u8"
    };
  },
  methods: {
    onClick(idx) {
      // this.$emit("video-src", this.testRes);
      var info = this.list[idx];
      this.$emit("video-src", info.file_url);
    }
  },
  mounted() {
    var _this = this;
    this.$nextTick(function() {
      _this
        .$post(config.getUrl(config.happy), {
          openId: g.openId,
          liveId: g.liveId,
          page: 1,
          page_size: 50
        })
        .then(function(resp) {
          var data = resp.data.data;
          if (resp.data.success) {
            _this.list = data.list;
            _this.pageInfo = data.page;
          }
        });
    });
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
      > img {
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