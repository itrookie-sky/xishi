<template>
  <div class="binding-container">
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <p class="shenfen">您的身份为:</p>
      </el-col>
    </el-row>
    <el-row type="flex" class="people-radio" justify="center">
      <el-col :span="20">
        <el-radio v-model="radio" label="man">新郎:{{man}}</el-radio>
        <el-radio v-model="radio" label="woman">新娘:{{woman}}</el-radio>
      </el-col>
    </el-row>
    <el-row type="flex" class="people-select" justify="center">
      <el-col :span="10">
        <p class="ps-p">活动中收款微信为:</p>
      </el-col>
      <el-col :span="10">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="23">
        <p class="shenfen">PS:活动中所有人的新人红包和礼物的金额都会直接进入收款的微信账号中,可在活动页面中直接提现</p>
      </el-col>
    </el-row>
    <el-row type="flex" class="people-tel" justify="center">
      <el-col :span="20">
        <el-input maxlength="21" autosize placeholder="请输入手机号" v-model="telInput"></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" class="people-code" justify="center" align="middle">
      <el-col :span="11">
        <el-input size="large" autosize placeholder="短信验证码" v-model="codeInput"></el-input>
      </el-col>
      <el-col :span="8" :offset="1">
        <el-button @click="onCodeTap($event)">{{codeLab}}</el-button>
      </el-col>
    </el-row>
    <el-row type="flex" class="people-tel" justify="center">
      <el-col :span="8">
        <el-button class="btn-submit" @click="submit($event)">提交</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import g from "../js/global.js";
import config from "../js/config.js";
import utils from "../js/utils.js";
export default {
  data() {
    return {
      radio: "man",
      man: "新郎名",
      woman: "新娘名",
      options: [
        {
          value: "0",
          label: "新郎"
        },
        {
          value: "1",
          label: "新娘"
        }
      ],
      value: "1",
      telInput: "",
      codeInput: "",
      codeLab: "获取验证码"
    };
  },
  methods: {
    onCodeTap() {
      var _this = this;

      var reg = /^1[2345789]\d{9}$/;
      if (!reg.test(this.telInput)) {
        this.$message({
          message: "手机号输入有误,请重新输入",
          type: "warning"
        });
        return;
      }

      this.$post(config.getUrl(config.newFormCode), {
        phone: this.telInput
      }).then(function(resp) {
        if (resp.data.success) {
          _this
            .$post(config.getUrl(config.newSendVCode), {
              liveId: g.liveId,
              phone: _this.telInput,
              fCode: resp.data.data.fCode,
              identity: _this.radio
            })
            .then(function(resp1) {
              if (resp1.data.success) {
              } else {
                _this.$message({
                  message: "验证码获取失败",
                  type: "warning"
                });
              }
            });
        } else {
          _this.$message({
            message: "验证码获取失败",
            type: "warning"
          });
        }
      });
    },
    submit() {
      var _this = this;
      if (!this.codeInput) {
        _this.$message({
          message: "验证码格式不正确",
          type: "warning"
        });
        return;
      }

      if (!g.onlyCode) {
        _this.$message({
          message: "身份验证不通过",
          type: "warning"
        });
        return;
      }

      this.$post(config.getUrl(config.newVerification), {
        liveId: g.liveId,
        phone: this.telInput,
        vCode: this.codeInput,
        identity: this.radio,
        onlyCode: g.onlyCode
      }).then(function(resp) {
        _this.$message({
          message: resp.data.message,
          type: "warning"
        });
      });
    }
  }
};
</script>
<style lang="scss">
.binding-container {
  height: 100vh;
  width: 100%;
  background-color: rgb(232, 232, 232);
  font-size: 0.16rem;
  text-align: left;
  vertical-align: middle;
  .shenfen {
    padding: 0.4rem 0 0 0;
  }
  .people-radio {
    padding: 0.2rem 0;
    .el-radio__label {
      font-size: 0.16rem;
    }
  }
  .people-select {
    .ps-p {
      height: 100%;
      line-height: 0.3rem;
    }
  }
  .people-tel {
    padding: 0.4rem 0 0 0;
  }
  .people-code {
    padding: 0.2rem 0 0 0;
    .el-textarea {
      height: 100%;
    }
    .el-button--default {
      width: 100%;
    }
  }
  .btn-submit {
    width: 100%;
  }
}
</style>

