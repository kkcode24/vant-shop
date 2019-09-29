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
      currentContact: {},
      chosenContactId: null,
      addresslist: []
    };
  },
  mounted() {
    console.log(this.$store.getters.addressList);
    let storeAddressList = this.$store.getters.addressList;
    console.log(storeAddressList);
    if (storeAddressList && storeAddressList.length > 0) {
      let defaultAddress = storeAddressList.filter(item => !item.isDefault);
      this.chosenContactId = defaultAddress[0].id;
      this.currentContact = defaultAddress[0];
      this.addressList = storeAddressList;
    }
  },

  methods: {
    choseAddress() {
      let path = "/user/address";
      if (this.addressList.length === 0) {
        path = "/user/address/add";
      }
      this.$router.push({
        path: path,
        query: { redirect: this.$route.fullPath }
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
