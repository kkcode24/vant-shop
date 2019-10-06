<template>
    <div>
        <van-popup 
            v-model="$store.state.shoppingCar.show"
            closeable
            close-icon="close"
            position="bottom"
            style="overflow: visible;"
        >
            <div class="van-sku-container" v-if="$store.state.shoppingCar.show">
                <div class="van-hairline--bottom van-sku-header">
                    <div class="van-sku-header__img-wrap">
                        <img :src="app.prefixAttachs + $store.state.shoppingCar.fruit.fruit.thumbnailImage">
                    </div>
                    <div class="van-sku-header__goods-info">
                        <div class="van-sku__goods-name van-ellipsis">{{$store.state.shoppingCar.fruit.fruit.name}}</div>
                        <div class="van-sku__goods-price">
                            <span>
                                <span class="van-sku__price-symbol">￥</span>
                                <span class="van-sku__price-num">{{currentFruit.price | amount}}</span>
                            </span>
                        </div>
                    </div>
                </div>
                <!-- main -->
                <div class="van-sku-body" style="max-height: 536px;">
                    <div class="van-sku-group-container van-hairline--bottom">
                        <div class="van-sku-row">
                            <div class="van-sku-row__title">规格：</div>
                            <span  class="sku-row__item " :class="{'sku-row__item--active':item.isActive}" @click="selected(item)" v-for="item in $store.state.shoppingCar.fruit.fruitSpecificationsList" :key="item.specifications">
                                {{item.specifications}}
                            </span>
                        </div>
                    </div>
                    <div class="van-sku-stepper-stock">
                        <div class="van-sku-stepper-container">
                            <div class="van-sku__stepper-title">购买数量：</div>
                            <div class="van-sku__stepper van-stepper">
                              <van-stepper @overlimit='overlimit' v-model="selectedGoods.num" min="1"  :max='currentFruit.fruitNumber' />
                            </div>
                        </div>
                        <div class="van-sku__stock">剩余{{currentFruit.fruitNumber}}件</div>
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
import { addFriutToCart } from '@/api/shopingCart' 
export default {
    name: 'shoppingCar',
    data() {
        return {
            isActive: false,
            activeId: '',
            selectedGoods: {
                num: 0,
                id: '',
                cat: ''
            },
            currentFruit: {}
        }
    },
    methods: {
        selected(data) {
            console.log(data)
            this.currentFruit  = data
            if(this.activeId != data.id) {
                this.$store.state.shoppingCar.fruit.fruitSpecificationsList.forEach(item => {
                    this.$set(item, 'isActive', false)
                });
            }
            this.activeId = data.id
            data.isActive = !data.isActive
            if(data.isActive) {
              this.selectedGoods.id = data.id
              this.selectedGoods.cat = data.specifications    
            } else {
              this.selectedGoods.id = ''
              this.selectedGoods.cat = ''
            }
        },
        submit() {
            if(!this.selectedGoods.cat) {
                Toast(`请选择规格`);
                return 
            }
            console.log(this.selectedGoods)
        },
        overlimit() {
            if(this.selectedGoods.num == 1) {
                Toast('至少选择一件商品');
            }
        },
        // 加入购物车
        addFriutToCart() {
            addFriutToCart({

            }).then(res => {
              if(re.code == 0) {
                Toast('已成功添加至购物车');
                this.$store.commit('CLOSE_SHOPPING')
              }
            })
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