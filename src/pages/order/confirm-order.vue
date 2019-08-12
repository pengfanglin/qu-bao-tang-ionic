<template>
  <div class="root">
    <top center="确认订单"/>
    <div class="content">
      <div class="address box-start" @click="addressClick">
        <div class="left">
          <div class="img"/>
        </div>
        <div class="right box-between-column">
          <div class="box-between">
            <h1>收货人:&nbsp;&nbsp;{{addressBean.address_name}}</h1>
            <h1>{{addressBean.address_mobile}}</h1>
          </div>
          <div class="box-start">
            <h1>收货地址:{{addressBean.address_province+addressBean.address_city+addressBean.address_district+addressBean.address_detail}}</h1>
          </div>
        </div>
      </div>
      <div class="cars">
        <div class="car" v-for="(shopCarMerchants,index) in shopCarMerchantsBeans">
          <div class="box-start car-top">{{shopCarMerchants.merchantsBean.merchants_name}}</div>
          <div class="goods box-between" v-for="shopCar in shopCarMerchants.shopCarBeans">
            <div class="goods-left box-left" @click.stop="goodsClick(shopCar.goods_id)">
              <my-image :initValue="shopCar.goods_img" options=" width:2rem;height:1.8rem;border-radius:0.1rem;"/>
            </div>
            <div class="goods-center">
              <h1>{{shopCar.goods_name}}</h1>
              <h2>规格:{{shopCar.specification_names}}</h2>
              <h3>￥{{shopCar.specification_price}}</h3>
            </div>
            <div class="goods-right">
              <h1>x{{shopCar.goods_num}}</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="express box-between">
        <h1>邮费</h1>
        <h1>{{totalPrice.is_free_express==1?'包邮':totalPrice.express_price}}</h1>
      </div>
      <group label-width="1.6rem" class="remark">
        <x-input v-model="orderRemark" title="买家留言:" placeholder="在此填写您的建议和要求" class="input"></x-input>
      </group>
      <div class="goods_tip box-end">
        <div class="box-center left">
          <h1>共</h1>
          <h2>{{buildGoodsNum}}</h2>
          <h3>件商品</h3>
        </div>
        <div class="box-center right">
          <h1>小计:</h1>
          <h2>￥{{isNull(totalPrice.express_price)?totalPrice.order_actual_price:totalPrice.order_actual_price-totalPrice.express_price}}</h2>
        </div>
      </div>
    </div>
    <div>
      <div class="box-end price">
        <div class="box-center price-left">
          <h1>合计&nbsp;:</h1>
          <h2>￥{{totalPrice.order_actual_price}}</h2>
        </div>
        <div class="theme pay" @click="insertOrder">去结算</div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        shopCarMerchantsBeans: [],
        addressBean:{},
        orderPriceList:[],
        totalPrice:{},
        orderRemark:''
      }
    },
    beforeMount() {
      this.shopCarMerchantsBeans=JSON.parse(decodeURIComponent(this.$route.params.shopCarMerchantsBeans));
      if(this.isNull(this.$route.params.addressBean)){
        this.post(1,'addressInterfaces.api?getDefaultAddress');
      }else{
        this.addressBean=JSON.parse(decodeURIComponent(this.$route.params.addressBean));
      }
      this.getOrderPrice();
    },
    methods: {
      doSuccess(index, data) {
        switch (index) {
          case 1:
            if(this.isNull(data)){
              this.showConfirm('提示','您还没有添加收货地址，无法下单');
            }else{
              this.addressBean=data;
            }
            break;
          case 2:
            this.orderPriceList=data;
            let order_actual_price=0;
            let express_price=0;
            let is_free_express=1;
            this.orderPriceList.forEach((orderPrice)=>{
              order_actual_price+=orderPrice.order_actual_price;
              express_price+=orderPrice.express_price;
              if(orderPrice.is_free_price==0){
                is_free_express==0
              }
            })
            this.$set(this.totalPrice,'order_actual_price',order_actual_price);
            this.$set(this.totalPrice,'express_price',express_price);
            this.$set(this.totalPrice,'is_free_express',is_free_express);
            break;
          case 3:
            this.$router.replace('/pay_order/'+encodeURIComponent(JSON.stringify(data)));
            break;
        }
      },
      getOrderPrice(){
        this.post(2,'orderInterfaces.api?getOrderPrice',{json:this.buildOrder()});
      },
      buildOrder(){
        let params={};
        let car_ids=[];
        let orderBeans=[];
        this.shopCarMerchantsBeans.forEach((shopCarMerchants)=>{
          shopCarMerchants.shopCarBeans.forEach((shopCar)=>{
            car_ids.push(shopCar.car_id);
          })
          let orderBean={};
          orderBean.merchants_id=shopCarMerchants.merchants_id;
          orderBean.order_remark=this.orderRemark;
          let orderGoodsBeans=[];
          shopCarMerchants.shopCarBeans.forEach((shopCar)=>{
            let orderGoodsBean={};
            orderGoodsBean.goods_id=shopCar.goods_id;
            orderGoodsBean.specification_id=shopCar.specification_id;
            orderGoodsBean.goods_num=shopCar.goods_num;
            orderGoodsBeans.push(orderGoodsBean);
          })
          orderBean.orderGoodsBeans=orderGoodsBeans;
          orderBeans.push(orderBean);
        })
        params.member_id=JSON.parse(localStorage.memberBean).member_id;
        params.car_ids=car_ids.join(',');
        params.address_id=this.addressBean.address_id;
        params.orderBeans=orderBeans;
        return JSON.stringify(params);
      },
      insertOrder(){
        this.post(3,'orderInterfaces.api?insertOrder',{json:this.buildOrder()})
      },
      addressClick(){
        this.$router.replace('/goods_address/'+encodeURIComponent(JSON.stringify(this.shopCarMerchantsBeans)));
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
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    background: #eee;
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
        .car {
          background: #fff;
          .car-top {
            padding: 0.1rem 0.2rem;
            background: #fff;
          }
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
      }
      .express{
        padding:0.1rem 0.2rem;
        background: #fff;
        h1{
          font-size: 0.3rem;
        }
      }
      .remark{
        width:100%;
        .input{
          height:0.9rem;
          padding-left:0.2rem;
          border-bottom: none;
        }
      }
      .goods_tip{
        padding:0.2rem 0.2rem;
        background: #fff;
        border-top:1px #eee solid;
        .left{
          h2{
            color:red;
            margin:0 0.1rem;
          }
        }
        .right{
          margin-left:0.5rem;
          h2{
            color:red;
            margin-left:0.2rem;
          }
        }
      }
    }
    .price{
      height:1rem;
      background: #fff;
      div{
        height:100%;
      }
      .price-left{
        h1{

        }
        h2{
          color:red;
        }
      }
      .pay{
        padding:0 0.5rem;
        line-height: 1rem;
        color:#fff;
        margin-left: 0.2rem;
      }
    }
  }
</style>
