<template>
  <div class="hongbao-container">
    <div class="hongbao-close iconfont icon-cha" @click="onClose($event)"></div>
    <div class="hb-top">
      <el-carousel indicator-position="outside" height="1.2rem">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="hb-content">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="24">
          <el-input v-model="money" placeholder="金额"></el-input>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="24">
          <el-input-number
            v-model="count"
            controls-position="right"
            @change="handleChange"
            :min="1"
            :max="999"
          ></el-input-number>
          <!-- <el-input v-model="count" placeholder="数量"></el-input> -->
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="space-around">
        <el-col :span="5">
          <el-radio v-model="radio" label="1">新人</el-radio>
        </el-col>
        <el-col :span="5">
          <el-radio v-model="radio" label="2">新郎亲友</el-radio>
        </el-col>
        <el-col :span="5">
          <el-radio v-model="radio" label="3">新娘亲友</el-radio>
        </el-col>
        <el-col :span="5">
          <el-radio v-model="radio" label="4">全部亲友</el-radio>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="24">
          <el-input v-model="desc" placeholder="祝福语"></el-input>
        </el-col>
      </el-row>
      <div class="hb-send-btn" @click="onHongbaoSend($event)">
        <label>发红包</label>
      </div>
    </div>
  </div>
</template>
<script>
import utils from "../../js/utils";
export default {
  data() {
    return {
      money: "",
      count: "",
      radio: "4",
      desc: ""
    };
  },
  methods: {
    handleChange(ev) {},
    onHongbaoSend(ev) {
      utils.log(ev);
    },
    onClose(ev) {
      this.$emit("close", "hongbao");
    }
  }
};
</script>
<style lang="scss">
@import url(../../assets/scss/var.scss);
.hongbao-container {
  position: fixed;
  bottom: 10%;
  left: 50%;
  z-index: 6;
  transform: translateX(-50%);
  background-color: $xs-color-theme1;
  border-radius: $border-radius-all;
  width: 94%;
  min-height: 4rem;
  .hongbao-close {
    position: absolute;
    z-index: 6;
    top: 0.04rem;
    right: 0.04rem;
    color: #fff;
  }
  .hb-top {
  }
  .hb-content {
    width: 80%;
    margin: 0.2rem auto 0rem;
    .row-bg {
      margin-top: 0.1rem;
    }
    .hb-send-btn {
      color: $xs-color-font;
      margin: 0.2rem auto 0;
      padding: 0.04rem 0;
      background-color: #fff;
      border-radius: 0.04rem;
      width: 0.8rem;
      font-size: 0.13rem;
    }
  }
}
</style>


