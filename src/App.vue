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

<style>
/* #app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
