<template>
  <div class="money-container">
    <el-row type="flex" class="btn-back">
      <el-col :span="6">
        <el-button size="mini" type="info" @click="onBackTap($event)">返回</el-button>
      </el-col>
    </el-row>
    <div class="money-my">
      <div class="mm-content">
        <h4>我的余额</h4>
        <div class="mm-count">
          <label>{{money}}</label>
          <label>账户余额(元)</label>
        </div>
      </div>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button type="primary" size="mini" @click="onGetMoneyTap($event)">提现</el-button>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" size="mini" @click="onGetAll($event)">全部提现</el-button>
        </el-col>
        <el-col :span="6">
          <el-button @click="onRecordTap($event)" type="primary" size="mini">余额详情</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="money-prompt">
      <h4>提示信息</h4>
      <ul class="mp-desc" v-show="showDesc">
        <li v-for="(value,idx) in desc" :key="idx">{{idx+1+'.'+value}}</li>
      </ul>
      <div class="mp-alert" v-show="showGetAlert">
        <div class="mp-content">
          <div class="mp-complete" v-if="showComplete">
            <div class="iconfont icon-duihaocheckmark17"></div>
            <p>提现成功</p>
          </div>
          <div class="mp-count" v-else>
            <label>提现</label>
            <p class="big-font">
              <span>是否确认提现</span>
              <span>{{money}}</span>
            </p>
          </div>
        </div>
        <el-row type="flex" justify="center" v-show="showAlertBtn">
          <el-col :span="6">
            <el-button type="primary" size="mini" @click="onTrue($event)">确认</el-button>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" size="mini" @click="onPass($event)">取消</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="money-record" v-show="showRecord" @click.capture.stop="onMoneyRecordTap($event)">
      <div class="mr-outter">
        <ul class="mr-list">
          <li
            v-for="(item,idx) in record"
            :key="idx"
            :class="{'color-gray':item.type=='dec','color-red':item.type=='add'}"
          >
            <p>{{item.created}}</p>
            <p>{{item.des}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import config from "../js/config.js";
import g from "../js/global.js";
import utils from "../js/utils";
export default {
  data() {
    return {
      money: 99999.99,
      desc: [
        "提现到账后,将直接转入微信钱包中",
        "提现时会收取5%的手续费",
        "若60天(含)内未提取,余额会自动清零",
        "每天最多提去3次",
        "只有余额大于0时才可以提取余额",
        "提现时到账时间为1个工作日内"
      ],
      record: [
        {
          id: 1001,
          customer_id: 1000,
          open_id: "123456",
          live_id: 1000,
          amount: 50,
          type: "dec",
          des: "发送了红包50元",
          created: 1555603256,
          is_del: 0
        },
        {
          id: 1000,
          customer_id: 1000,
          open_id: "123456",
          live_id: 1000,
          amount: 20,
          type: "add",
          des: "从张三那抢红包获得20元",
          created: 1555603200,
          is_del: 0
        }
      ],
      state: 1,
      showRecord: false
    };
  },
  computed: {
    showDesc() {
      return this.state == 1;
    },
    showGetAlert() {
      return this.state == 2 || this.state == 3;
    },
    showComplete() {
      return this.state == 3;
    },
    showAlertBtn() {
      return this.state == 2;
    }
  },
  methods: {
    onRecordTap(ev) {
      this.showRecord = true;
    },
    onMoneyRecordTap(ev) {
      this.showRecord = false;
    },
    sendMoney(value) {
      var _this = this;
      this.$post(config.getUrl(config.cashOut), {
        openId: g.openId,
        liveId: g.liveId,
        money: +value
      }).then(function(resp) {
        if (resp.data.success) {
          _this.$message({
            type: "success",
            message: "提现成功" + value + "元"
          });
        } else {
          _this.$message({
            type: "warning",
            message: resp.data.message
          });
        }
      });
    },
    onGetMoneyTap(ev) {
      var _this = this;
      this.$prompt("请输入金额", "提现", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|[1-9]\d*$/g,
        inputErrorMessage: "请输入数字"
      })
        .then(({ value }) => {
          /*  this.$message({
            type: "success",
            message: "输入余额" + value
          }); */
          _this.sendMoney(value);
        })
        .catch(() => {
          _this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    onGetAll(ev) {
      var _this = this;
      this.$confirm("此操作将所有余额提现, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          _this.sendMoney(this.money);
        })
        .catch(() => {
          _this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    onBackTap(ev) {
      this.$router.replace("/live");
    },
    onTrue(ev) {
      this.$message({
        message: "提现成功",
        type: "success"
      });
    },
    onPass(ev) {
      this.state = 1;
    }
  },
  mounted() {
    var _this = this;

    _this
      .$post(config.getUrl(config.amount), {
        openId: g.openId,
        liveId: g.liveId
      })
      .then(function(resp) {
        if (resp.data.success) {
          _this.money = resp.data.data.amount;
          let log = resp.data.data.log;
          for (let i = 0; i < log.length; i++) {
            let item = log[i];
            item.created = utils.time.getYMDHMSByTimestamp(item.created);
          }
          _this.record = log;
        }
      });
  }
};
</script>
<style lang="scss" >
.money-container {
  width: 100%;
  height: 100vh;
  background-color: $xs-color-gray1;
  font-size: 0.16rem;
  border: $xs-border-0;
  .btn-back {
    margin-top: 0.1rem;
  }
  /*element 样式重写*/
  .el-button--mini {
    padding: 0.06rem 0.12rem;
    font-size: 0.14rem;
  }
  .el-button--primary {
    width: 0.82rem;
  }

  h4 {
    color: $xs-color-theme;
    margin-bottom: 0.12rem;
  }

  .money-my {
    margin-bottom: 0.6rem;
    .mm-content {
      .mm-count {
        width: 60%;
        padding: 0.2rem 0;
        margin: 0rem auto 0.16rem;
        background-color: $xs-color-theme;
        color: #fff;
        label {
          display: block;
        }
        :nth-child(1) {
          font-size: 0.4rem;
        }
      }
    }
  }
  .money-prompt {
    width: 100%;
    .mp-desc {
      li {
        text-align: left;
        width: 70%;
        margin: 0 auto 0.1rem;
        font-size: 0.14rem;
      }
    }
    .mp-content {
      width: 76%;
      height: 1.6rem;
      background-color: $xs-color-theme;
      border-radius: 0.06rem;
      margin: 0 auto 0.12rem;
      color: #fff;
      border: $xs-border-0;
      .big-font {
        font-size: 0.2rem;
      }
      .mp-count {
        width: 100%;
        height: 100%;
        label {
          display: block;
          padding: 0.15rem 0 0.32rem;
        }
      }
      .mp-complete {
        border: $xs-border-0;
        .icon-duihaocheckmark17 {
          width: 0.5rem;
          height: 0.5rem;
          font-size: 0.5rem;
          margin: 0.3rem auto 0.1rem;
        }
      }
    }
  }
  .money-record {
    position: fixed;
    top: 25%;
    left: 10%;
    right: 10%;
    height: 3rem;
    background-color: #fff;
    border: 0.015rem solid $xs-color-theme1;
    border-radius: 0.05rem;
    padding: 0.2rem 0 0.24rem 0.24rem;
    z-index: 6;
    text-align: left;
    font-size: 0.14rem;

    .mr-outter {
      width: 100%;
      height: 100%;
      overflow-x: hidden;
      overflow-y: scroll;
      .mr-list {
        li {
          margin-top: 0.1rem;
          :nth-child(2) {
            font-size: 0.13rem;
          }
        }
      }
    }

    .color-gray {
      color: $xs-color-gray2;
    }
    .color-red {
      color: $xs-color-font;
    }
  }
}
</style>


