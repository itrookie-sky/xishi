<template>
  <div class="signin-container">
    <h3>签到助力</h3>
    <div class="sign-close iconfont icon-iconclose" @click="onClose($event)"></div>
    <p class="sign-desc">
      <span>签到人数越多,新人得到</span>
      <span class="s-pro">奖励</span>
      <span>越丰厚!</span>
    </p>
    <p class="sign-desc" v-show="!complete">
      <span>{{info.person[0]}}</span>
      <span>和</span>
      <span>{{info.person[1]}}</span>
      <span>{{info.time}}</span>
      <span>开始</span>
    </p>

    <div class="sign-progress">
      <ul class="sp-tabs">
        <li v-for="(val,idx) in progressTabs" :key="idx">{{val}}</li>
      </ul>
      <el-progress
        class="sp-progress"
        :text-inside="true"
        :stroke-width="18"
        :percentage="progressCur"
        status="success"
        :show-text="false"
      ></el-progress>
    </div>
    <p class="sign-desc-com" v-show="complete">
      <span>您已经签到成功,</span>
      <span>请于{{info.time}}</span>
      <span>到达{{info.address}}参加</span>
      <span>{{info.person[0]}}</span>
      <span>和</span>
      <span>{{info.person[1]}}</span>
      <span>的婚礼</span>
    </p>
    <div class="sign-form" v-show="!complete">
      <el-form
        @submit.native.prevent
        :label-position="labelPosition"
        label-width="1rem"
        :model="formAlign"
      >
        <el-form-item label="姓名" label-width=".6rem">
          <el-row type="flex" justify="space-between">
            <el-col :span="16">
              <el-input v-model="formAlign.name"></el-input>
            </el-col>
            <el-col :span="6">
              <el-select v-model="formAlign.sex" placeholder>
                <el-option label="先生" value="man"></el-option>
                <el-option label="女士" value="woman"></el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="电话" label-width=".6rem">
          <el-row type="flex" justify="space-between">
            <el-col :span="15">
              <el-input v-model="formAlign.region"></el-input>
            </el-col>
            <el-col :span="9">
              <label class="sf-code-lab">短信验证码</label>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="短信验证码">
          <el-input v-model="formAlign.code"></el-input>
        </el-form-item>
        <el-form-item label label-width="0">
          <el-radio-group v-model="formAlign.arrive">
            <el-row type="flex" justify="space-between">
              <el-col :span="8">
                <el-radio label="参加婚礼" value="1"></el-radio>
              </el-col>
              <el-col :span="8">
                <el-radio label="无法到场" value="2"></el-radio>
              </el-col>
              <el-col :span="8">
                <el-radio label="待定" value="3"></el-radio>
              </el-col>
            </el-row>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <div class="sign-submit-btn" @click="onSubmit($event)" v-show="!complete">
      <label>签到</label>
    </div>
    <div class="sign-submit-btn1" @click="onClose($event)" v-show="complete">
      <label>关闭</label>
    </div>
  </div>
</template>
<script>
import utils from "../../js/utils";
export default {
  data() {
    return {
      info: {
        person: ["新新郎", "新新娘"],
        time: "2017-11-11 10:00",
        address: ""
      },
      progressTabs: ["100", "200", "300", "400"],
      progressCur: 60,
      /**表单 */
      formAlign: {
        name: "",
        tel: "",
        code: "",
        sex: "",
        arrive: "1"
      },
      labelPosition: "left",
      complete: true
    };
  },
  methods: {
    onSubmit(ev) {
      utils.log(this.formAlign);
    },
    onClose(ev) {
      this.$emit("close", "signin");
    }
  }
};
</script>
<style lang="scss">
.signin-container {
  position: fixed;
  width: 94%;
  height: 4.5rem;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 6;
  background-color: $xs-color-theme1;
  color: #fff;
  font-size: 0.16rem;
  > h3 {
    font-weight: 400;
    margin-top: 0.15rem;
  }
  .sign-close {
    position: absolute;
    z-index: 6;
    top: 0.04rem;
    right: 0.04rem;
  }
  .sign-desc {
    margin-top: 0.1rem;
  }
  .sign-desc-com {
    margin-top: 0.8rem;
    padding: 0 0.26rem;
  }
  .s-pro {
    background-color: #fff;
    border-radius: 0.04rem;
    color: $xs-color-font;
    padding: 0.01rem 0.06rem;
  }
  .sign-progress {
    position: relative;
    width: 84%;
    margin: 0.4rem auto 0;
    .sp-tabs {
      display: flex;
      width: 100%;
      position: absolute;
      z-index: 6;
      top: -0.01rem;
      > li {
        flex: 1 0 25%;
        border: 0.01rem solid #fff;
        border-radius: 0.03rem;
      }
    }
    .sp-progress {
      height: 100%;
      .el-progress-bar__outer {
        border-radius: 0.03rem;
        background-color: rgba(0, 0, 0, 0);
      }
      .el-progress-bar__inner {
        border-radius: 0.03rem;
      }
    }
  }
  .sign-form {
    color: #fff;
    margin: 0.3rem auto 0;
    width: 90%;
    .sf-code-lab {
      font-size: 0.14rem;
      line-height: 0.26rem;
      text-align: right;
    }
    .el-form-item {
      margin-bottom: 0.1rem;
    }
    .el-input__inner {
      padding: 0 0.05rem 0;
      height: 0.26rem;
      line-height: 0.26rem;
      font-size: 0.14rem;
    }
    .el-input__icon {
      line-height: 0.26rem;
    }
    .el-form-item__content {
      line-height: 0.26rem;
    }
    .el-input--suffix {
      padding: 0;
      font-size: 0.16rem;
    }
    .el-form-item__label {
      font-size: 0.16rem;
      color: #fff;
      line-height: 0.26rem;
    }
    .el-radio__label {
      font-size: 0.1rem;
      padding-left: 0.06rem;
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
  }
  .sign-submit-btn,
  .sign-submit-btn1 {
    color: #999;
    margin: 0.25rem auto 0;
    padding: 0.04rem 0;
    background-color: #fff;
    border-radius: 0.04rem;
    width: 1.2rem;
  }
  .sign-submit-btn1 {
    margin: 1rem auto 0;
  }
}
</style>


