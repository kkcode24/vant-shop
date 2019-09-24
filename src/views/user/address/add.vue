<template>
  <div>
    <van-address-edit
      :area-list="areaList"
      show-set-default
      show-search-result
      :search-result="searchResult"
      @save="onSave"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import areaList from "@/views/user/address/area";
export default {
  name: "addAddress",
  data() {
    return {
      areaList,
      searchResult: []
    };
  },
  methods: {
    onSave() {
      this.$toast("save");
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区"
          }
        ];
      } else {
        this.searchResult = [];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
