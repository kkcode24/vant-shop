<template>
  <div>
    <!-- 联系人卡片 -->
    <van-contact-card
      :type="cardType"
      :name="currentContact.name"
      :tel="currentContact.tel"
      @click="choseAddress"
    />
  </div>
</template>

<script>
export default {
  name: 'submitOrder',
  data() {
    return {
      chosenContactId: null,
      addresslist: [{
        name: '张三',
        tel: '13000000000',
        id: 0
      }]
    };
  },

  computed: {
    cardType() {
      return this.chosenContactId !== null ? 'edit' : 'add';
    },
    currentContact() {
      const id = this.chosenContactId;
      return id !== null ? this.addresslist.filter(item => item.id === id)[0] : {};
    }
  },
  mounted(){
    let storeAddressList = this.$store.getters.addressList;
    if(!storeAddressList){
      this.$store.dispatch("getWxUserAddress").then((res) => {
        if(res.code === 0&&res.data.length>0){
          this.addressList = res.data;
        }
      });
    }
    if(storeAddressList&&storeAddressList.length>0){
      let defaultAddress = storeAddressList.filter(item=>item.isDefault);
      if(defaultAddress.length>0){
        this.chosenContactId = defaultAddress[0].id;
      }
      this.addressList = storeAddressList;
    }
  },
  methods: {
    choseAddress(){
       this.$router.push({
        path: '/user/address/add',
        query: { redirect: this.$route.fullPath } //登录重定向
      })
    }
  }
};
</script>

<style scoped>
</style>
