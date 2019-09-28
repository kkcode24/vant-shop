<template>
  <div>
    <van-address-edit
      :area-list="areaList"
      save-button-text="保存并使用"
      @save="onSave"
    />
  </div>
</template>

<script>
import areaList from "@/views/user/address/area";
export default {
  name: "addAddress",
  data() {
    return {
      areaList
    };
  },
  methods: {
    onSave() {
      this.$toast("save");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
