<template>
    <div>
        <van-popup 
            v-model="$store.state.shoppingCar.show"
            closeable
            close-icon="close"
            position="bottom"
            style="overflow: visible;"
        >
            <div class="van-sku-container">
                <div class="van-hairline--bottom van-sku-header">
                    <div class="van-sku-header__img-wrap">
                        <img :src="goods.url">
                    </div>
                    <div class="van-sku-header__goods-info">
                        <div class="van-sku__goods-name van-ellipsis">{{goods.name}}</div>
                        <div class="van-sku__goods-price">
                            <span>
                                <span class="van-sku__price-symbol">￥</span>
                                <span class="van-sku__price-num">39.00</span>
                            </span>
                        </div>
                    </div>
                </div>
                <!-- main -->
                <div class="van-sku-body" style="max-height: 536px;">
                    <div class="van-sku-group-container van-hairline--bottom">
                        <div class="van-sku-row">
                            <div class="van-sku-row__title">{{goods.normName}}：</div>
                            <span  class="sku-row__item " :class="{'sku-row__item--active':item.isActive}" @click="selected(item)" v-for="item in goods.normList" :key="item.name">
                            {{item.name}}
                            </span>
                        </div>
                    </div>
                    <div class="van-sku-stepper-stock">
                        <div class="van-sku-stepper-container">
                            <div class="van-sku__stepper-title">购买数量：</div>
                            <div class="van-sku__stepper van-stepper">
                            <van-stepper @overlimit='overlimit' v-model="selectedGoods.num" min="1" :max="goods.limitNum" />
                            </div>
                        </div>
                        <div class="van-sku__stock">剩余40930件</div>
                        <!---->
                    </div>
                </div>
                <!-- 按钮 -->
                <div class="van-sku-actions">
                <van-button class="van-sku-button" color="#f44" :square='true' type="primary" @click="submit">加入购物车</van-button>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
import { Toast } from 'vant';
export default {
    name: 'shoppingCar',
    props: {
        id: [String, Number]
    },
    data() {
        return {
            isActive: false,
            goods: {
              url: 'https://img.yzcdn.cn/upload_files/2019/02/15/FvQABol-o2caaSWZn6EgjrD_TmMG.jpg',
              name: '泰国进口椰青原箱 2个装 单果重750g以上 （赠送开椰器和吸管） 新鲜水',
              normName: '颜色',
              normList: [
                {name: '250g*3(买三送一）', id: 1, isActive: false},
                {name: '250g*3(买三）', id: 2, isActive: false},
                {name: '250g*3(买', id: 3, isActive: false},
                {name: '250g*3(买三送一1）', id: 4, isActive: false},
                {name: '250g*3(买三21）', id: 5, isActive: false},
                {name: '250g*3(买21', id: 6, isActive: false}
              ],
              limitNum: 11
            },
            activeId: '',
            selectedGoods: {
                num: 0,
                id: '',
                cat: ''
            }
        }
    },
    mounted() {
      this.init()
    },
    methods: {
        init() {
          if(this.goods.normList.length == 1) {
            this.selectedGoods.id = this.goods.normList[0].id
            this.selectedGoods.cat = this.goods.normList[0].name
          }
        },
        selected(data) {
            if(this.activeId != data.id) {
                this.goods.normList.forEach(item => {
                    item.isActive = false
                });
            }
            this.activeId = data.id
            data.isActive = !data.isActive
            if(data.isActive) {
              this.selectedGoods.id = this.goods.normList[0].id
              this.selectedGoods.cat = this.goods.normList[0].name
            } else {
              this.selectedGoods.id = ''
              this.selectedGoods.cat = ''
            }
        },
        submit() {
            if(!this.selectedGoods.cat) {
                Toast(`请选择${this.goods.normName}`);
                return 
            }
            console.log(this.selectedGoods)
        },
        overlimit() {
            if(this.selectedGoods.num == 1) {
                Toast('至少选择一件商品');
            }
        }
    }
}
</script>

<style rel="stylesheet/scss" scoped lang="scss">
    .van-sku-container {
        font-size: 14px;
        background: #fff;
        overflow-y: visible;
        max-height: -webkit-max-content;
        max-height: -moz-max-content;
        max-height: max-content;
        // header
        .van-sku-header {
            margin-left: 15px;
            position: relative;
            .van-sku-header__img-wrap {
                position: relative;
                float: left;
                margin-top: -10px;
                width: 80px;
                height: 80px;
                background: #f8f8f8;
                border-radius: 2px;
            }
            .van-sku-header__goods-info {
                padding: 10px 60px 10px 10px;
                min-height: 82px;
                overflow: hidden;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                display: flex;
                justify-content: flex-start;
                .van-sku__goods-name {
                    font-size: 14px;
                }
                .van-sku__goods-price {
                    color: #f44;
                    margin-top: 10px;
                    vertical-align: middle;
                    span {
                        .van-sku__price-num, .van-sku__price-symbol {
                            vertical-align: middle;
                        }
                        .van-sku__price-symbol {
                            color: #f44;
                        }
                        .van-sku__price-num {
                            font-size: 16px;
                        }
                    }
                }
            }
        }
        // main
        .van-sku-body {
            max-height: 350px;
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
            .van-sku-group-container {
                margin-left: 15px;
                padding: 12px 0 2px;
                position: relative;
                .van-sku-row:last-child {
                    margin-bottom: 0;
                }
                .van-sku-row {
                    margin: 0 15px 10px 0;
                    .van-sku-row__title {
                        padding-bottom: 10px;
                    }
                    .sku-row__item {
                        display: inline-block;
                        padding: 5px 9px;
                        margin: 0 10px 10px 0;
                        height: 28px;
                        min-width: 52px;
                        line-height: 16px;
                        font-size: 12px;
                        text-align: center;
                        border: 1px solid #969799;
                        background: #969799;
                        border-radius: 3px;
                        color: #000;
                        box-sizing: border-box;
                        background: #fff;
                        &.sku-row__item--active {
                            background-color: #f44;
                            border-color: #f44;
                            color: #fff;
                        }
                    } 
                }
            }
        }
        // button
        .van-sku-actions {
            padding: 10px 0 0 0;
            background: #ebedf0;
            .van-sku-button {
                width: 100%;
                height: 50px;
                border-radius: 0
            }
        }
    }

    .van-hairline--bottom:after {
        border-bottom-width: 1px;
        &:after {
            content: " ";
            position: absolute;
            pointer-events: none;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            top: -50%;
            left: -50%;
            right: -50%;
            bottom: -50%;
            -webkit-transform: scale(.5);
            -moz-transform: scale(.5);
            transform: scale(.5);
            border: 0 solid #ebedf0;
        }
    }

</style>