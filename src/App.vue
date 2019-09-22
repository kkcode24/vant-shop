<template>
  <div id="app">
    <keep-alive>
      <router-view class="view-router"  v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view class="view-router" v-if="!$route.meta.keepAlive"></router-view>
    <router-view name="tabbar"></router-view>
    <shoppingCar />
    <authLogin />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
