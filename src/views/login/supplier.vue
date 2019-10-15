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
        v-model="supplier.planningTime"
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
        this.currentDate = new Date(this.supplier.planningTime);
      } else if (type === "maturation") {
        this.currentDate = new Date(this.supplier.maturationTime);
      }
    },
    confirm(v) {
      if (this.type === "plan") {
        this.supplier.planningTime = moment(v).format("YYYY-MM-DD");
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
            planningTime: moment(res.data.planningTime).format("YYYY-MM-DD"),
            maturationTime: moment(res.data.maturationTime).format("YYYY-MM-DD")
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>