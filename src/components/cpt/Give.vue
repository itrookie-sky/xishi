<template>
  <div class="give-container">
    <div class="iconfont icon-cha" @click="onClose($event)"></div>
    <div class="give-gift">
      <div class="gg-outter">
        <ul class="gg-inner">
          <li class="gg-item" v-for="(value,idx) in gift" :key="idx" @click="onGiftSelect(idx)">
            <img
              src="../../assets/img/effect/effect_05.png"
              :class="{'border-select':idx==select,'border-unselect':idx!=select}"
            >
            <p>{{value.title}}</p>
            <p>{{value.cost}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="give-input">
      <el-input v-model="name" placeholder="输入姓名"></el-input>
    </div>
    <div class="give-input">
      <el-input v-model="desc" placeholder="默认祝福语"></el-input>
    </div>
    <div class="give-btn" @click="giveGift($event)">送礼物</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      select: 0,
      name: "",
      desc: "",
      gift: [
        {
          link: "",
          title: "一场流星雨",
          cost: "$999.99"
        },
        {
          link: "",
          title: "一场流星雨",
          cost: "$999.99"
        },
        {
          link: "",
          title: "一场流星雨",
          cost: "$999.99"
        },
        {
          link: "",
          title: "一场流星雨",
          cost: "$999.99"
        },
        {
          link: "",
          title: "一场流星雨",
          cost: "$999.99"
        },
        {
          link: "",
          title: "一场流星雨",
          cost: "$999.99"
        },
        {
          link: "",
          title: "一场流星雨",
          cost: "$999.99"
        },
        {
          link: "",
          title: "一场流星雨",
          cost: "$999.99"
        },
        {
          link: "",
          title: "一场流星雨",
          cost: "$999.99"
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
    giveGift(ev) {}
  }
};
</script>
<style lang="scss">
.give-container {
  position: fixed;
  z-index: 99999;
  left: 5%;
  right: 5%;
  bottom: .1rem;
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


