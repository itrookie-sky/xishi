<template>
  <div class="big-img-container" @click="onClose">
    <img class="big-img" :src="url">
  </div>
</template>
<script>
export default {
  props: {
    url: String
  },
  data() {
    return {};
  },
  methods: {
    onClose(ev) {
      this.$emit("close", "bigimg");
    }
  },
  computed: {},
  mounted: {}
};
</script>
<style lang="scss">
.big-img-container {
  display: block;
  position: fixed;
  z-index: 7;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.55);
  .big-img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 99.8%;
  }
}
</style>

