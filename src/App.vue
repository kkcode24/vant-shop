<template>
  <div id="app">
    <keep-alive>
      <router-view class="view-router"  v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view class="view-router" v-if="!$route.meta.keepAlive"></router-view>
    <router-view name="tabbar"></router-view>
    <shoppingCar />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang='scss'>
@import './styles/app.scss';
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
#app {
  width: 100%;
  height: 100%;
}
</style>
