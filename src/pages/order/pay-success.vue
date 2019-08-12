<template>
  <div class="root box-between-column">
    <top center="支付成功"></top>
    <div class="content box-center">
      <div class="center box-center-column">
        <div class="order_top box-start-column">
          <div class="img"/>
          <h1>支付成功</h1>
          <h2>我们将尽快为您安排发货</h2>
        </div>
        <div class="order_info box-start-column">
          <div>
            <h1>订单号</h1>
            <h2>{{orderBean.order_no}}</h2>
          </div>
          <div>
            <h1>支付方式</h1>
            <h2>{{orderBean.pay_way_show}}</h2>
          </div>
          <div>
            <h1>收件人</h1>
            <h2>{{orderBean.address_name}}</h2>
          </div>
          <div>
            <h1>联系电话</h1>
            <h2>{{orderBean.address_mobile}}</h2>
          </div>
          <div>
            <h1>收货地址-省</h1>
            <h2>{{orderBean.address_province}}</h2>
          </div>
          <div>
            <h1>收货地址-市</h1>
            <h2>{{orderBean.address_city}}</h2>
          </div>
          <div>
            <h1>收货地址-区</h1>
            <h2>{{orderBean.address_district}}</h2>
          </div>
          <div>
            <h1>详细地址</h1>
            <h2>{{orderBean.address_detail}}</h2>
          </div>
          <div>
            <h1>支付金额</h1>
            <h2>{{totalPrice}}</h2>
          </div>
        </div>
        <div class="bottom box-center">
          <h1 @click="buyAgain">继续购物</h1>
          <h2 @click="orderDetail">订单详情</h2>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data() {
            return {
              orderBeans:[],
              orderBean:{}
            }
        },
        beforeMount() {
          let order_ids=this.$route.params.order_ids;
          let index=order_ids.indexOf(',');
          if(index!=-1){
            order_ids=order_ids.substring(0,index);
          }
          if(!this.isNull(order_ids)){
            this.post(1,'orderInterfaces.api?getOrderList',{order_ids:order_ids});
          }
        },
        methods: {
            doSuccess(index, data) {
                switch (index) {
                    case 1:
                      if(!this.isNull(data)){
                        this.orderBeans=data;
                        this.orderBean=data[0];
                      }
                        break;
                }
            },
          buyAgain(){
              this.$router.replace('/home');
          },
          orderDetail(){
            this.$router.replace('/order_detail/'+this.orderBean.order_id);
          }
        },
      computed:{
          totalPrice(){
            let totalPrice=0;
            this.orderBeans.forEach((orderBean)=>{
              totalPrice+=orderBean.order_actual_price;
            })
            return totalPrice;
          }
      }
    }
</script>
<style lang="less" scoped>
.root{
  background: #eeefff;
  height:100%;
  div{
    width:100%;
  }
  .content{
    padding:1rem;
    height:100%;
    .center{
      .order_top{
        text-align: center;
        align-items: center;
        .img{
          width:2rem;
          height:2rem;
          background-image: url(../../assets/images/face.png);
        }
        h1{
          font-size: 0.35rem;
          margin:0.1rem 0.1rem;
        }
      }
      .order_info{
        div{
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          align-items: center;
          margin-top: 0.1rem;
          h1{
            color:#777;
          }
          h2{
            color:#777;
          }
        }
      }
      .bottom{
        margin-top:1rem;
        h1{
          font-size: 0.4rem;
          color:#329ff9;
        }
        h2{
          margin-left: 1rem;
          font-size: 0.4rem;
          color:#419641;
        }
      }
    }
  }
}
</style>
