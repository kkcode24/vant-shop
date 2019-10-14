<template>
  <div id="app">
    <authLogin />
    <keep-alive>
      <router-view class="view-router"  v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view class="view-router" v-if="!$route.meta.keepAlive"></router-view>
    <router-view name="tabbar"></router-view>
    <shoppingCar v-if="$store.state.shoppingCar.show" />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang='scss'>
@import './styles/app.scss';
#app {
  width: 100%;
  height: 100%;
}
</style>
