<template>
  <div class="user">
    <img
      class="user-poster"
      src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png"
    >
    <div class="user-info">
      <van-cell-group class="user-group">
        <van-cell
          icon="records"
          title="全部订单"
          value="查看全部订单"
          is-link
        />
      </van-cell-group>
      <van-row class="user-links">
        <van-col span="6">
          <van-icon name="pending-payment" />
          待付款
        </van-col>
        <van-col span="6">
          <van-icon name="records" />
          待接单
        </van-col>
        <van-col span="6">
          <van-icon name="tosend" />
          待发货
        </van-col>
        <van-col span="6">
          <van-icon name="logistics" />
          已发货
        </van-col>
      </van-row>
      <van-cell-group>
        <van-cell
          icon="points"
          title="个人信息"
          is-link
        />
        <van-cell
          icon="gold-coin-o"
          title="客服聊天"
          is-link
        />
        <van-cell
          icon="gift-o"
          title="收货地址"
          is-link
          to="user/address"
        />
        <van-cell
          icon="gift-o"
          title="分销员中心"
          is-link
        />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { Row, Col, Icon, Cell, CellGroup } from "vant";
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  }
};
</script>

<style rel="stylesheet/scss" scoped lang="scss">
.user {
  background: #f8f8f8;
  &-poster {
    width: 100%;
    height: 30%;
    display: block;
  }
  &-info {
    height: 70%;
    padding: 0 10px 30px 10px;
    .user-group {
      margin-top:10px;
    }
    .user-links {
      margin-bottom: 10px;
      padding: 5px 0 10px;
      font-size: 12px;
      text-align: center;
      background-color: #fff;
      .van-icon {
        display: block;
        font-size: 24px;
      }
    }
  }
}
</style>