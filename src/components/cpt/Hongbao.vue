<template>
  <div class="hongbao-container">
    <div class="hongbao-close iconfont icon-iconclose" @click="onClose($event)"></div>
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
.hongbao-container {
  position: fixed;
  top: 30%;
  left: 50%;
  z-index: 6;
  transform: translateX(-50%);
  background-color: $xs-color-theme1;
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
    .el-form-item {
      margin-bottom: 0.1rem;
    }
    .el-input__inner {
      padding: 0 0.05rem 0;
      height: $input-height;
      line-height: $input-height;
      font-size: 0.14rem;
    }
    .el-input__icon {
      line-height: $input-height;
    }
    .el-form-item__content {
      line-height: $input-height;
    }
    .el-input--suffix {
      padding: 0;
      font-size: 0.16rem;
    }
    .el-form-item__label {
      font-size: 0.16rem;
      color: #fff;
      line-height: $input-height;
    }
    .el-radio__label {
      font-size: 0.1rem;
      padding-left: 0.03rem;
    }
    .el-radio-group {
      width: 100%;
    }
    .el-radio {
      color: #333;
    }
    .el-radio__input.is-checked + .el-radio__label {
      color: #fff;
    }
    .el-radio__inner {
      width: 0.13rem;
      height: 0.13rem;
    }
    .el-input-number {
      width: 100%;
      .el-input {
        line-height: $input-num-h;
        height: $input-num-h;
      }
      .el-input__inner {
        height: $input-num-h;
      }
    }
    .el-input-number__increase,
    .el-input-number__decrease {
      width: 0.2rem;
      line-height: 0.13rem;
      right: 0;
    }
    .el-input {
      line-height: $input-height;
    }
    .el-input-number__increase {
    }
    .el-input-number__decrease {
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


