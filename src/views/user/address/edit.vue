<template>
  <div>
    <van-address-edit
      show-delete
      show-set-default
      :address-info="addressInfo"
      :area-list="areaList"
      save-button-text="保存并使用"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import areaList from "@/views/user/address/area";
import {getUserAddressInfo} from "@/api/address";
export default {
  name: "editAddress",
  data() {
    return {
      areaList,
      addressInfo:{}
    };
  },
  mounted(){
    this.getAddressInfo();
  },
  methods: {
    getAddressInfo(){
      getUserAddressInfo(this.$route.params.id).then(res=>{
        if(res.code===0){
          this.addressInfo = Object.assign({},res.data,{isDefault:!Boolean(res.data.isDefault)});
        }
      })
    },
    onSave(f) {
      let postData = Object.assign({}, f, { isDefault: 0 });
      this.$store.dispatch("updateWxUserAddress", postData).then(res => {
        if (res.code === 0) {
          this.$router.replace(this.$route.query.redirect || "/user/address");
        }
      });
    },
    onDelete(f){
      if(f.isDefault){
        this.$toast('默认地址不可删除');
        return false;
      }
      this.$store.dispatch("deleteWxUserAddress", f.id).then(res => {
        if (res.code === 0) {
          this.$toast('删除成功');
          this.$router.replace("/user/address");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

