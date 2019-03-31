<template>
  <div>
    <div class="demo-container">
      <ul class="demo-list">
        <li>
          <an1></an1>
        </li>
         <li>
          <an2></an2>
        </li>
      </ul>
    </div>
    <el-button type="text" @click="onAlert">点击弹窗</el-button>
    <el-button type="text" @click="onMsg">点击消息</el-button>
    <el-button type="text" @click="onChatCreate">点击创建聊天室</el-button>
  </div>
</template>
<script>
import an1 from "./animations/animations1.vue";
import an2 from "./animations/animations2.vue";
export default {
  components: {
    an1: an1,
      an2: an2
  },
  data() {
    return {
      radio: "1"
    };
  },

  methods: {
    onAlert() {
      this.$confirm("此操作永久生效,是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    onMsg() {
      this.$message({
        message: "警告,这是一条警告!",
        type: "warning",
        duration: 0
      });
    },
    onChatCreate() {}
  }
};
</script>
<style  lang="scss">
@import url("../assets/scss/var.scss");
.demo-container {
  position: relative;
  /* border: 1px solid #000; */
  margin: 0 auto;
  .demo-list {
    width: 100%;
    li {
      width: 3.5rem;
      height: 3rem;
      margin: 0 auto 0.2rem;
      border: $xs-border-1;
    }
  }
}
</style>