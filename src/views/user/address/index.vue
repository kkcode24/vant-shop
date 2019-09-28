<template>
  <div class="address-list">
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      :disabled-list="disabledList"
      disabled-text="以下地址超出配送范围"
      @add="onAdd"
      @edit="onEdit"
    />
    <!-- <van-address-list
      @add="onAdd"
    >
      <van-cell-group>
        <van-cell
          v-for="(item,index) in list"
          :title="item.name+'  '+item.tel"
          :label="item.address"
          :key="index"
        >
          <van-icon
            slot="right-icon"
            name="edit"
            @click="onEdit(item,index)"
          />
        </van-cell>
      </van-cell-group>
    </van-address-list> -->
  </div>
</template>

<script>
export default {
  name: "addressList",
  data() {
    return {
      chosenAddressId: null,
      list: [
        {
          id: "1",
          name: "张三",
          tel: "13000000000",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室"
        },
        {
          id: "2",
          name: "李四",
          tel: "1310000000",
          address: "浙江省杭州市拱墅区莫干山路 50 号"
        }
      ],
      disabledList: [
        {
          id: "3",
          name: "王五",
          tel: "1320000000",
          address: "浙江省杭州市滨江区江南大道 15 号"
        }
      ]
    };
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
    onAdd() {
      this.$router.push("/user/address/add");
    },
    onEdit(item, index) {
      this.$toast("编辑地址:" + index);
      this.$router.push("/user/address/edit");
    }
  }
};
</script>

<style lang="scss" scoped>
// .address-list {
//   .van-address-list {
//     box-sizing: border-box;
//     padding-bottom: 100px;
//     .van-radio__icon {
//       display: none !important;
//     }
//   }
// }
</style>
