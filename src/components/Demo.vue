<template>
  <div>
    <div class="container">
      <el-row>
        <el-button type="danger" disabled>危险按钮</el-button>
        <el-radio v-model="radio" label="1">备选项</el-radio>
        <el-radio v-model="radio" label="2">备选项</el-radio>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: "Demo",
  data() {
    return {
      radio: "1"
    };
  },
  methods: {}
};
</script>
<style scoped>
.container {
  position: relative;
  width: 200px;
  height: 200px;
  /* border: 1px solid #000; */
  margin: 0 auto;
}

</style>