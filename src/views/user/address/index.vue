<template>
  <div class="address-list">
    <van-address-list
      v-model="chosenAddressId"
      :list="addressList"
      :switchable="isSwitch"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect"
    />
      <!-- :disabled-list="disabledList"
      disabled-text="以下地址超出配送范围" -->
    <!-- <van-address-list
      @add="onAdd"
    >
      <van-cell-group>
        <van-cell
          v-for="(item,index) in addressList"
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
      isSwitch: false,
      chosenAddressId: null,
      addressList: [
        // {
        //   id: "1",
        //   name: "张三",
        //   tel: "13000000000",
        //   address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室"
        // }
      ],
      disabledList: [
        // {
        //   id: "3",
        //   name: "王五",
        //   tel: "1320000000",
        //   address: "浙江省杭州市滨江区江南大道 15 号"
        // }
      ]
    };
  },
  mounted(){
    if(this.$route.query.redirect === '/order/submit'){
      this.isSwitch = true;
    }

    let storeAddressList = this.$store.getters.addressList;
    if (storeAddressList && storeAddressList.length > 0) {
      this.addressList = storeAddressList.map(item=>{
        if(!item.isDefault){
          this.chosenAddressId = item.id;
        }
        item.address = item.province + item.city + item.county + item.addressDetail;
        return item;
      })
    }
    
  },
  methods: {
    onAdd() {
      this.$router.push("/user/address/add");
    },
    onEdit(item, index) {
      this.$router.push({
        name: "editAddress",
        path: "/user/address/edit",
        params: {id:this.addressList[index].id}
      });
    },
    onSelect(item, index){
      item.isDefault = 0;
      this.$store.dispatch('selectAddress',item).then(()=>{
        this.$router.replace(this.$route.query.redirect);
      })
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
