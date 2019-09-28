<template>
  <div>
    <!-- 联系人卡片 -->
    <van-contact-card
      :type="cardType"
      :name="currentContact.name"
      :tel="currentContact.tel"
      add-text="添加收货地址"
      @click="choseAddress"
    />
  </div>
</template>

<script>
export default {
  name: "submitOrder",
  data() {
    return {
      currentContact:{},
      chosenContactId: null,
      addresslist: []
    };
  },
  mounted() {
    let storeAddressList = this.$store.getters.addressList;
    if (storeAddressList && storeAddressList.length > 0) {
      let defaultAddress = storeAddressList.filter(item => !item.isDefault);
      this.chosenContactId = defaultAddress[0].id;
      this.currentContact = defaultAddress[0];
      this.addressList = storeAddressList;
      console.log(storeAddressList);
    }
  },
  
  methods: {
    choseAddress() {
      this.$router.push({
        path: "/user/address/add",
        query: { redirect: this.$route.fullPath } //登录重定向
      });
    }
  },
  computed: {
    cardType() {
      return this.chosenContactId !== null ? "edit" : "add";
    }
  }
};
</script>

<style scoped>
</style>
