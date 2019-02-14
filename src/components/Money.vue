<template>
  <div class="money-container">
    <el-row type="flex" class="btn-back">
      <el-col :span="6">
        <el-button size="mini" type="info">返回</el-button>
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
          <el-button type="primary" size="mini">提现</el-button>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" size="mini">余额详情</el-button>
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
            <el-button type="primary" size="mini">确认</el-button>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" size="mini">取消</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="money-record" v-show="showRecord">
      <ul class="mr-list">
        <li v-for="(item,idx) in record" :key="idx">
          <p>{{item.timestamp}}</p>
          <p>
            <span>从</span>
            <span>{{item.name}}</span>
            <span>红包抢到</span>
            <span>{{item.money}}</span>
            <span>元</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
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
          name: "三个字",
          timestamp: "2018-11-11 12:12",
          money: "999.99"
        }
      ],
      state: 1,
      showRecord: true
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
  methods: {}
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
}
</style>


