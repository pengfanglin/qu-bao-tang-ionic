<template>
<div class="root box-between-column">
  <top center="退款商品"></top>
  <div class="content box-start-column">
    <div class="box-between order-top">
      <h1>订单编号&nbsp;:&nbsp;{{orderBean.order_no}}</h1>
    </div>
    <div class="goods box-between" v-for="goods in orderBean.orderGoodsBeans">
      <div class="goods_left box-center" @click.stop="goodsClick(goods.goods_id)">
        <my-image :initValue="goods.goods_img" options=" width:2rem;height:1.8rem;border-radius:0.1rem;"/>
      </div>
      <div class="goods-center box-between-column">
        <h1>{{goods.goods_name}}</h1>
        <h2>规格:{{goods.specification_names}}</h2>
        <h3>￥{{goods.specification_price}}</h3>
      </div>
      <div class="goods-right box-end-column">
        <h1 class="theme" @click="applyRefund(goods)">申请退款</h1>
      </div>
    </div>
  </div>
</div>
</template>
<script type="text/ecmascript-6">
    export default {
        data() {
            return {
              orderBean:{}
            }
        },
        beforeMount() {
          this.orderBean=JSON.parse(decodeURIComponent(this.$route.params.orderBean));
        },
        methods: {
            applyRefund(orderGoodsBean){
              this.$router.push('/refund_order/'+encodeURIComponent(JSON.stringify(orderGoodsBean)));
            }
        }
    }
</script>
<style lang="less" scoped>
.root{
  height:100%;
  background: #f7f7f7;
  .content{
    height:100%;
    .order-top{
      padding:0.1rem 0.2rem;
      background: #fff;
      border-bottom: 1px #eee solid;
      h2{
        color:red;
      }
    }
    .goods{
      background: #fff;
      padding:0.1rem 0.2rem;
      border-bottom: 1px #eee solid;
      height:2rem;
      div{
        height:100%;
        width:100%;
      }
      .goods-center{
        h2{
          color:#777;
        }
        h3{
          color:red;
        }
      }
      .goods-right{
        align-items: flex-end;
        h1{
          color:#fff;
          border-radius: 0.1rem;
          padding:0.1rem 0;
          width:1.5rem;
          text-align: center;
        }
      }
    }
  }
}
</style>
