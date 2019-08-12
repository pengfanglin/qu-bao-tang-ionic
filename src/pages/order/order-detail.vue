<template>
  <div class="root box-between-column">
    <top center="订单详情"/>
    <div class="content">
      <div class="address box-start">
        <div class="left">
          <div class="img"/>
        </div>
        <div class="right box-between-column">
          <div class="box-between">
            <h1>收货人:&nbsp;&nbsp;{{orderBean.address_name}}</h1>
            <h1>{{orderBean.address_mobile}}</h1>
          </div>
          <div class="box-start">
            <h1>收货地址:{{orderBean.address_province+orderBean.address_city+orderBean.address_district+orderBean.address_detail}}</h1>
          </div>
        </div>
      </div>
      <div class="cars">
        <div class="goods box-between" v-for="orderGoodsBean in orderBean.orderGoodsBeans">
          <div class="goods-left box-left" @click.stop="goodsClick(shopCar.goods_id)">
            <my-image :initValue="orderGoodsBean.goods_img" options=" width:2rem;height:1.8rem;border-radius:0.1rem;"/>
          </div>
          <div class="goods-center">
            <h1>{{orderGoodsBean.goods_name}}</h1>
            <h2>规格:{{orderGoodsBean.specification_names}}</h2>
            <h3>￥{{orderGoodsBean.specification_price}}</h3>
          </div>
          <div class="goods-right">
            <h1>x{{orderGoodsBean.goods_num}}</h1>
          </div>
        </div>
      </div>
      <div class="remark box-start">
        <h1>买家留言:</h1>
        <h2>{{orderBean.order_remark}}</h2>
      </div>
      <div class="express box-between">
        <h1>快递配送费</h1>
        <h1>{{orderBean.express_price==0?'快递免邮':orderBean.express_price}}</h1>
      </div>
      <div class="goods_tip box-end">
        <div class="box-center right">
          <h1>实际支付:</h1>
          <h2>￥{{orderBean.order_actual_price}}</h2>
        </div>
      </div>
      <div class="box-between-column order_info">
        <div>
          <h1>订单编号:{{orderBean.order_no}}</h1>
        </div>
        <div>
          <h1>创建时间:{{orderBean.create_time}}</h1>
        </div>
      </div>
    </div>
    <div class="box-end order_bottom shrink">
      <a :href="'tel:'+orderBean.contact_mobile">
        <div class="customer">联系客服</div>
      </a>
      <div class="cancel" @click="lookLogistics" v-if="orderBean.order_state=='wait_receive'||orderBean.order_state=='wait_assessment'||orderBean.order_state=='end'||orderBean.order_state=='refund'">物流查询</div>
      <div class="cancel" @click="cancelOrder" v-if="orderBean.order_state=='wait_pay'">取消订单</div>
      <div class="pay theme" @click="payOrder" v-if="orderBean.order_state=='wait_pay'">付款</div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        orderBean: {}
      }
    },
    beforeMount() {
      this.post(1,'orderInterfaces.api?getOrderDetail',{order_id:this.$route.params.order_id});
    },
    methods: {
      doSuccess(index, data) {
        switch (index) {
          case 1:
            this.orderBean=data;
            break;
          case 2:
            this.showTip('取消成功');
            this.$router.back();
            break;
            break;
          case 3:
            this.$router.replace('/pay_order/'+encodeURIComponent(JSON.stringify(data)));
            break;
        }
      },
      cancelOrder(){
        this.post(2,'orderInterfaces.api?cancelOrder',{order_id:this.orderBean.order_id});
      },
      payOrder(){
        let data={};
        data.order_ids=this.orderBean.order_id;
        data.order_actual_price=this.orderBean.order_actual_price;
        this.$router.push('/pay_order/'+encodeURIComponent(JSON.stringify(data)));
      },
      lookLogistics(){
        this.$router.push('/logistics/'+this.orderBean.logistics_code+'/'+this.orderBean.logistics_no)
      }
    },
    computed: {
      buildGoodsNum(){
        let num=0;
        this.shopCarMerchantsBeans.forEach((shopCarMerchants)=>{
          shopCarMerchants.shopCarBeans.forEach((shopCar)=>{
            num+=shopCar.goods_num;
          })
        })
        return num;
      }
    }
  }
</script>
<style lang="less" scoped>
  .root {
    height: 100%;
    background: #eeefff;
    .content {
      height: 100%;
      overflow-y: auto;
      .address{
        padding:0 0.2rem;
        background: #fff;
        .left{
          .img{
            background-image: url(../../assets/images/address.png);
            width:0.6rem;
            height:0.6rem;
          }
        }
        .right{
          width:100%;
          padding:0.2rem 0 0.2rem 0.2rem;
          >div:nth-child(2){
            margin-top: 0.1rem;
            h1{
              font-size: 0.25rem;
              color:#777;
            }
          }
        }
      }
      .cars {
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        background: #eeefff;
        .goods {
          background: #eeefff;
          padding: 0.1rem 0.2rem;
          border-bottom: 1px #ddd solid;
          height: 2rem;
          > div {
            display: inline-block;
            height: 100%;
          }
          .goods-left {
            > div {
              height: 100%;
              display: flex;
              flex-flow: column;
              justify-content: center;
            }
          }
          .goods-center {
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-between;
            align-items: flex-start;
            flex: 1;
            margin-left: 0.2rem;
            h2{
              color:#666;
              font-size: 0.25rem;
            }
            h3{
              color:red;
            }
          }
          .goods-right{
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: center;
          }
        }
      }
      .express{
        margin-top:0.1rem;
        padding:0.1rem 0.2rem;
        background: #fff;
        h1{
          font-size: 0.3rem;
        }
      }
      .remark{
        background: #fff;
        padding:0.1rem 0.2rem;
        border-bottom: 1px #eee solid;
      }
      .goods_tip{
        padding:0.2rem 0.2rem;
        background: #fff;
        border-top:1px #eee solid;
        .right{
          margin-left:0.5rem;
          h2{
            color:red;
            margin-left:0.2rem;
          }
        }
      }
      .order_info{
        margin-top:0.1rem;
        >div{
          padding:0.1rem 0.2rem;
          background: #fff;
        }
      }
    }
    .order_bottom{
      background: #fff;
      .cancel,.customer{
        margin:0.2rem 0.2rem 0.2rem 0;
        padding:0.1rem 0.2rem;
        border-radius: 0.1rem;
        border:1px #000 solid;
      }
      .pay{
        margin:0.2rem 0.2rem 0.2rem 0;
        border:1px #329ff9 solid;
        border-radius: 0.1rem;
        padding:0.1rem 0.5rem;
        color:#fff;
      }
    }
  }
</style>
