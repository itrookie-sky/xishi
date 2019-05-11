<template>
  <div class="rank-container">
    <div class="rank-small" v-if="showSmall">
      <h4 @click="onClose($event)">排行榜</h4>
      <div class="rs-btn iconfont icon-jiahao3" @click="onOpenClick($event)"></div>
      <div class="rank-outter">
        <ul class="rank-list">
          <li class="rank-item" v-for="(val,idx) in rankList" :key="idx">
            <div class="ri-progress" :style="{'width':val.num/top1*100+'%'}"></div>
            <div class="ri-text">
              <span>Top{{idx+1}}</span>
              <span>{{val.nickname}}</span>
              <span>{{val.num}}</span>
            </div>
          </li>
        </ul>
      </div>
      <!-- <div class="rank-item">
        <div class="ri-progress"></div>
        <div class="ri-text">
          <span>Top1</span>
          <span>最多七个字</span>
          <span>1111万</span>
        </div>
      </div>-->
    </div>
    <div class="rank-all" v-else>
      <div class="ra-close-btn iconfont icon-cha" @click="onClose($event)"></div>
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="全部排名" name="first">
          <div class="rank-item" v-for="(val,idx) in rankList" :key="idx">
            <div class="ri-progress" :style="{'width':val.num/top1*100+'%'}"></div>
            <div class="ri-text">
              <span>Top{{idx+1}}</span>
              <span>{{val.nickname}}</span>
              <span>{{val.num}}</span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="新郎天团排名" name="second">
          <div class="rank-item" v-for="(val,idx) in manList" :key="idx">
            <div class="ri-progress" :style="{'width':val.num/topMan*100+'%'}"></div>
            <div class="ri-text">
              <span>Top{{idx+1}}</span>
              <span>{{val.nickname}}</span>
              <span>{{val.num}}</span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="喜娘天团排名" name="third">
          <div class="rank-item" v-for="(val,idx) in womanList" :key="idx">
            <div class="ri-progress" :style="{'width':val.num/topWoman*100+'%'}"></div>
            <div class="ri-text">
              <span>Top{{idx+1}}</span>
              <span>{{val.nickname}}</span>
              <span>{{val.num}}</span>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!-- <div class="rank-item rank-item-mine">
        <div class="ri-progress" :style="{'width':mineRank.pro+'%'}"></div>
        <div class="ri-text">
          <span>Top{{mineRank.top}}</span>
          <span>{{mineRank.name}}</span>
          <span>{{mineRank.content}}</span>
        </div>
      </div>-->
    </div>
  </div>
</template>
<script>
import { labType } from "../../js/const.js";
import utils from "../../js/utils";
export default {
  props: {
    isSmall: {
      type: Boolean,
      default: true
    },
    people: {
      type: Array
    }
  },
  data() {
    return {
      showSmall: this.isSmall,
      activeName: "first",
      top1: 120,
      topMan: 100,
      topWoman: 80,
      rankList: [],
      mineRank: { top: 16, name: "最多七个字", content: "1111万", pro: 80 },
      test: [
        {
          headimgurl:
            "http://thirdwx.qlogo.cn/mmopen/0sDCa2E8S1uS9ysTe9o0PmiatPekMv07wEmsvhib25iczibKOicffX2z95jT6g8T7XiaglicyobVoypvBw36RtFJlgZwkGwosun641V/132",
          id: 1004,
          label: "同学",
          label_id: 1,
          nickname: "%E3%80%82",
          num: "40",
          openid: "obeXIt3pNDRuOYRgz1KWjOwIEoZM",
          type: "man"
        },
        {
          headimgurl:
            "http://thirdwx.qlogo.cn/mmopen/Q3auHgzwzM7DJ7AJr0qQ4jW7bkoBq3U3PcsnS68ab37D1slLnvWApHAPlJ8Sahiaib0u8ib1dzmsNBcj7HLouUZPg/132",
          id: 1001,
          label: "亲属",
          label_id: 4,
          nickname: "%E5%B0%8F%E5%90%96%E9%BE%99",
          num: "20",
          openid: "obeXItwugPnhyPc6SPHbMsdKe3Xw",
          type: "woman"
        }
      ]
    };
  },
  computed: {
    manList() {
      return this.people.man;
    },
    womanList() {
      return this.people.woman;
    }
  },
  methods: {
    onOpenClick(ev) {
      this.showSmall = false;
    },
    onClose(ev) {
      this.showSmall = true;
      this.$emit("close", "rank");
    },
    handleClick(tab, event) {}
  },
  watch: {
    people() {
      function sortTop(a, b) {
        return b - a;
      }
      var _this = this;
      var man = this.people.man;
      var woman = this.people.woman;
      var top = man.concat(woman);

      if (top.length > 0) {
        this.top1 = top.sort(sortTop)[0].num || 0;
      }
      if (man.length > 0) {
        this.topMan = man.sort(sortTop)[0].num || 0;
      }
      if (woman.length > 0) {
        this.topWoman = woman.sort(sortTop)[0].num || 0;
      }

      this.rankList = top;
      utils.log("排行榜排序", top, man, woman);
      utils.log("排行榜排序", this.top1, this.man, this.woman);
    }
  },
  mounted() {}
};
</script>
<style lang="scss" >
.rank-container {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 6;
  border-radius: $border-radius-all;
  .rank-small {
    position: absolute;
    z-index: 6;
    top: 0;
    right: 0;
    width: 2.8rem;
    color: $xs-color-font;
    border: 0.02rem solid $xs-color-theme;
    background-color: #fff;
    > h4 {
      font-size: 0.18rem;
    }
    .rs-btn {
      position: absolute;
      top: 0;
      right: 0;
    }
    .rank-outter {
      width: 100%;
      min-height: 1.5rem;
      overflow-y: scroll;
      overflow-x: hidden;
      .rank-list {
        width: 100%;
      }
    }
  }
  .rank-item {
    position: relative;
    height: 0.24rem;
    width: 100%;
    margin-top: 0.05rem;
    font-size: 0.14rem;
    word-wrap: none;
    color: #000;
    border-radius: 0.13rem;
    background-color: $xs-color-gray;
    .ri-progress {
      position: absolute;
      z-index: 3;
      top: 50%;
      transform: translateY(-50%);
      width: 20%;
      height: 90%;
      border-radius: 0.13rem;
      background-color: $xs-color-blue;
    }
    .ri-text {
      z-index: 4;
      position: absolute;
      width: 100%;
      height: 100%;
      > span {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        white-space: nowrap;
      }
      :nth-child(1) {
        left: 0.06rem;
      }
      :nth-child(2) {
        left: 0.56rem;
      }
      :nth-child(3) {
        right: 0.06rem;
      }
    }
  }
  .rank-all {
    position: fixed;
    z-index: 6;
    width: 94%;
    min-height: 4rem;
    bottom: 0.1rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    .ra-close-btn {
      position: absolute;
      top: 0.04rem;
      right: 0.06rem;
      color: $xs-color-font;
      z-index: 6;
    }
    .el-tabs {
      padding-bottom: 0.3rem;
    }
    .el-tabs__item {
      font-size: 0.14rem;
      line-height: 0.3rem;
      height: 0.3rem;
    }
    #tab-first,
    #tab-second,
    #tab-third {
      padding-left: 0.12rem;
      padding-right: 0.12rem;
    }
    .el-tabs__nav-next,
    .el-tabs__nav-prev {
      line-height: 0.3rem;
    }
    .el-tabs__content {
      padding: 0rem;
    }
    .el-tabs--border-card {
      box-shadow: none;
      border-bottom: none;
    }
    .rank-item-mine {
      position: absolute;
      bottom: 0;
    }
  }
}
</style>

