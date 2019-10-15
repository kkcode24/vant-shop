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
      areaList: areaList,
    };
  },
  methods: {
    onSave(f) {
      let postData = Object.assign({},f,{isDefault:0});
      this.$store.dispatch('saveWxUserAddress',postData).then(res=>{
        if(res.code===0){
          this.$router.replace(this.$route.query.redirect || '/user/address')
        }
      })
    }
  }
};
</script>
