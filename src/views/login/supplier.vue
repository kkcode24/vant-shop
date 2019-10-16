<template>
  <div id="supplier">
    <van-cell-group>
      <van-field
        label="用户名"
        v-model="supplier.supplierName"
        disabled
      />
      <van-field
        label="供应水果"
        v-model="supplier.fruitName"
      />
      <van-field
        @click="showPopup('plan')"
        label="预计种植时间"
        v-model="supplier.plantingTime"
      />
      <van-field
        label="预计种植数量"
        v-model="supplier.planningNumber"
      />
      <van-field
        @click="showPopup('maturation')"
        label="预计成熟时间"
        v-model="supplier.maturationTime"
      />
      <van-field
        label="预计成熟产量"
        v-model="supplier.maturationNumber"
      />
    </van-cell-group>
    <van-popup
      position="bottom"
      v-model="show"
      :style="{ height: '50%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        @cancel="cancel"
        @confirm="confirm"
      />
    </van-popup>
    <div style="margin-top:10px;width:100%;text-align:center;">
      <van-button
        style="width:80%;"
        type="primary"
        size="large"
        @click="submit"
      >提交</van-button>
    </div>

  </div>
</template>

<script>
import moment from "moment";
import { getSupplier, updateSupplier } from "@/api/login";
export default {
  name: "supplier",
  data() {
    return {
      type: "plan",
      currentDate: new Date(),
      show: false,
      supplier: {}
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    showPopup(type) {
      this.show = true;
      this.type = type;
      if (type === "plan") {
        this.currentDate = this.supplier.plantingTime?new Date(this.supplier.plantingTime):new Date();
      } else if (type === "maturation") {
        this.currentDate = this.supplier.maturationTime?new Date(this.supplier.maturationTime):new Date();
      }
    },
    confirm(v) {
      if (this.type === "plan") {
        this.supplier.plantingTime = moment(v).format("YYYY-MM-DD");
      } else if (this.type === "maturation") {
        this.supplier.maturationTime = moment(v).format("YYYY-MM-DD");
      }
      this.show = false;
    },
    cancel() {
      this.show = false;
    },
    submit() {
      updateSupplier(this.supplier).then(res => {
        if (res.code === 0) {
          this.$toast.success("提交成功");
        }
      });
    },
    getInfo() {
      getSupplier().then(res => {
        if (res.code === 0) {
          this.supplier = Object.assign({}, res.data, {
            plantingTime: res.data.plantingTime===null?null:moment(res.data.plantingTime).format("YYYY-MM-DD"),
            maturationTime: res.data.maturationTime===null?null:moment(res.data.maturationTime).format("YYYY-MM-DD")
          });
        }
      });
    }
  }
};
</script>

<style lang="scss">
.van-cell {
  line-height: 0.84rem;
  .van-field__label {
    margin-right: 10px;
  }
}
</style>