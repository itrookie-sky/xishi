<template>
  <div class="guide-cpt">
    <div class="title-container border-0">
      <img class="title" :src="guideData.title">
      <p>{{guideData.desc}}</p>
    </div>
    <div class="lab-list border-0">
      <div class="lab-item" :class="{'bg-white':select}">上一次选择</div>
      <div class="lab-container" :class="{'con-select':select}">
        <label v-show="select" @click="onMoreClick">{{guideData.desc+"更多标签"}}</label>
        <div class="iconfont icon-shangjiantou" v-show="select"></div>
        <div class="scroll" :class="{'more-select':select,'more-unselect':!select}">
          <ul>
            <li
              class="lab-item bg-white"
              v-for="(lab,index) in parseLabList"
              :key="index"
              :data-idx="index"
              @click="onLabClick($event)"
            >{{ lab.title }}</li>
          </ul>
        </div>
        <div class="iconfont icon-xiajiantou1" v-show="select"></div>
      </div>
      <div class="lab-item bg-white" :class="{hide:select}" v-on:click="onMoreClick">更多</div>
    </div>
  </div>
</template>
<script>
import utils from "../js/utils.js";
import conf from "../js/config.js";
import { router } from "../js/const.js";
import { constants } from "fs";
export default {
  name: "guide-lab-list",
  props: {
    /**
        [{
          title:string, logo图片路径
          desc:string,
          labList:[],
        }]
      */
    "guide-data": {
      type: Object
    }
  },
  data: function() {
    return {
      /**选择更多 */
      select: false
    };
  },
  methods: {
    onMoreClick: function(ev) {
      this.select = !this.select;
    },
    getLabel(idx) {
      return this.guideData.labList[idx];
    },
    onLabClick: function(ev) {
      let self = this;
      let lab = this.getLabel(ev.target.getAttribute("data-idx"));
      this.$post(conf.getUrl(conf.setLabel), {
        openId: this.global.openId,
        liveId: this.global.liveId,
        labelId: lab.id
      })
        .then(function(resp) {
          if (resp.status == 200) {
            self.loginedHandler();
          } else {
            utils.log("请求失败", resp.status);
          }
        })
        .catch(function(err) {
          self.global.utils.log(err);
        });
    },
    loginedHandler() {
      let g = this.global;
      this.$router.push(router.live);
    }
  },
  computed: {
    parseLabList: function() {
      if (this.select) {
        return this.guideData.labList;
      } else {
        return this.guideData.labList.slice(0, 5);
      }
    }
  }
};
</script>
<style scoped>
.guide-cpt {
  width: 100%;
  font-size: 0.18rem;
  color: #fff;
  display: block;
}
.title {
  display: block;
  width: 0.7rem;
  margin: 0 auto;
}
.title-container {
  font-weight: 100;
  text-align: center;
}
.lab-item {
  width: 1rem;
  padding: 0.03rem;
  margin: 0 auto 0.08rem;
  text-align: center;
  vertical-align: middle;
  font-size: 0.16rem;
  border-radius: 0.032rem;
  overflow: hidden;
}
.bg-white {
  background-color: rgba(255, 255, 255, 0.26);
}
.lab-list {
  margin: 0.1rem auto 0;
}
.lab-container {
  width: 1.4rem;
  margin: 0.1rem auto 0.1rem;
}
.con-select {
  padding: 0.1rem 0.1rem 0.25rem;
  height: 2.4rem;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 0.06rem;
}
.more-select {
  overflow-x: none;
  overflow-y: auto;
}
.more-unselect {
  overflow: hidden;
}
.iconfont {
  font-size: 0.18rem;
}
.scroll {
  height: 82%;
}
</style>