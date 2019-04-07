<template>
  <div id="app">
    <div class="menu" @click="onMenuClick">{{showMenuCom}}</div>
    <ul v-show="showMenu" class="test-menu">
      <li v-for="(item,index) in testList" :key="index">
        <router-link :to="item.link">{{item.desc}}</router-link>
      </li>
    </ul>
    <router-view/>
  </div>
</template>

<script>
import utils from "./js/utils.js";
import g from "./js/global.js";
export default {
  name: "App",
  data: function() {
    return {
      testList: g.testMenu,
      showMenu: false
    };
  },
  methods: {
    onMenuClick: function(ev) {
      this.showMenu = !this.showMenu;
    }
  },
  computed: {
    showMenuCom() {
      return this.showMenu ? "隐藏" : "显示";
    }
  }
};
</script>

<style>
@import url("./assets/scss/var.scss");
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
}
.test-menu {
  position: fixed;
  z-index: 9999998;
  top: 0.1rem;
  left: 0;
}
.test-menu li {
  margin-top: 0.15rem;
  font-size: 0.2rem;
}
.test-menu li a,
.test-menu li a:visited {
  color: #666;
}
.menu {
  position: fixed;
  z-index: 9999999;
  top: 0;
  left: 0;
  font-size: 0.2rem;
  color: #636363;
}
</style>
