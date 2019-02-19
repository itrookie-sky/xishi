<template>
  <div>
    <div class="demo-container">
      <ul class="demo-list">
        <li>
          <an1></an1>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import an1 from "./animations/animations1.vue";
export default {
  components: {
    an1: an1
  },
  data() {
    return {
      radio: "1"
    };
  },

  methods: {}
};
</script>
<style scoped lang="scss">
.demo-container {
  position: relative;
  /* border: 1px solid #000; */
  margin: 0 auto;
  .demo-list {
    width: 100%;
    li {
      width: 3rem;
      height: 3rem;
      margin: 0 auto 0.2rem;
      border: $xs-border-1;
    }
  }
}
</style>