<template>
  <div class="give-container">
    <div class="iconfont icon-cha" @click="onClose($event)"></div>
    <div class="give-gift">
      <div class="gg-outter">
        <ul class="gg-inner">
          <li class="gg-item" v-for="(value,idx) in list" :key="idx" @click="onGiftSelect(idx)">
            <img
              :src="value.image"
              :class="{'border-select':idx==select,'border-unselect':idx!=select}"
            >
            <p>{{value.blessing}}</p>
            <p>{{value.money}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="give-input">
      <el-input-number
        v-model="count"
        controls-position="right"
        @change="handleChange"
        :min="1"
        :max="999"
      ></el-input-number>
    </div>
    <div class="give-input">
      <el-input v-model="desc" placeholder="默认祝福语"></el-input>
    </div>
    <div class="give-btn" @click="giveGift($event)">送礼物</div>
  </div>
</template>
<script>
import utils from "../../js/utils";
import config from "../../js/config.js";
import IM from "../../js/chat/chat.js";
import g from "../../js/global.js";
import { msgType, giftTitle, weixinResp } from "../../js/const.js";
import weixin from "../../js/weixin.js";
export default {
  props: {
    list: Array
  },
  data() {
    return {
      select: 0,
      name: "",
      desc: "",
      count: 1,
      gift: [
        {
          animation: "tianshi",
          blessing: "百年好合",
          createtime: 1554978631,
          id: 1,
          image: "http://demo.csjlive.com/res/gift/effect_tianshi.png",
          order: 1,
          reward: 0,
          status: "0",
          title: "tianshi",
          type: "0",
          money: 0.01
        }
      ]
    };
  },
  methods: {
    onClose(ev) {
      this.$emit("close", "give");
    },
    onGiftSelect(idx) {
      this.select = idx;
    },
    giveGift(ev) {
      var _this = this;
      this.$post(config.getUrl(config.sendGift), {
        openId: g.openId,
        liveId: g.liveId,
        giftId: _this.curGift.id,
        money: _this.curGift.money,
        num: _this.count,
        name: g.userInfo.nickname,
        blessing: _this.desc
      }).then(function(resp) {
        if (resp.data.success) {
          var payData = resp.data.data;
          utils.log("%c[wx pay] 礼物调用支付", "color:blue");
          weixin
            .pay(
              payData.timeStamp,
              payData.nonceStr,
              payData.prepay_id,
              payData.paySign
            )
            .then(function(pay) {
              switch (pay.errMsg) {
                case weixinResp.payOk:
                  _this.sendGift();
                  break;
              }
            });
        }
      });
    },
    sendGift(ev) {
      let _this = this;
      let gift = this.curGift;
      let msg = IM.getBaseMsg(msgType.gift);
      msg.title = gift.title;
      // msg.img = config.getResUrl(config.gift, "effect_" + giftTitle.xin);
      msg.img = gift.image;
      msg.animation = gift.animation;
      IM.sendMsg(msg).then(function(data) {
        _this.$emit("send-msg", data);
        _this.$emit("close", "give");
      });
    },
    handleChange(ev) {}
  },
  computed: {
    curGift() {
      return this.list[this.select];
    }
  },
  mounted() {
    var _this = this;
    this.$nextTick(function() {});
  }
};
</script>
<style lang="scss">
.give-container {
  position: fixed;
  z-index: 6;
  left: 5%;
  right: 5%;
  bottom: 0.1rem;
  height: 4rem;
  background-color: $xs-color-theme1;
  border: $xs-border-0;
  border-radius: $border-radius-all;
  color: #fff;
  font-size: 0.14rem;
  .border-select {
    border: 0.02rem solid #f7e99b;
  }
  .border-unselect {
    border: 0.02rem solid rgba(0, 0, 0, 0);
  }
  .icon-cha {
    position: absolute;
    right: 0.02rem;
    top: 0.02rem;
  }
  .give-gift {
    width: 92%;
    height: 2rem;
    margin: 0.2rem auto 0.24rem;
    .gg-outter {
      width: 100%;
      height: 100%;
      font-size: 0.14rem;
      overflow-x: hidden;
      overflow-y: scroll;
      .gg-inner {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        width: 100%;
        height: 100%;
        .gg-item {
          width: 33.33333333%;
          img {
            display: block;
            width: 0.91rem;
            margin: 0 auto;
            border-radius: 0.08rem;
          }
        }
      }
    }
  }
  .give-input {
    width: 60%;
    margin: 0 auto 0.2rem;
  }
  .give-btn {
    margin: 0 auto;
    width: 0.6rem;
    line-height: 0.22rem;
    background-color: #fff;
    color: $xs-color-font;
    border-radius: 0.03rem;
  }
}
</style>


