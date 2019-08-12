<template>
<div class="root">
  <top center="我的订单"/>
  <tab active-color="#ff0000" bar-active-color="#329ff9" class="tab shrink" :scroll-threshold="5">
    <tab-item @on-item-click="tabClick" :selected="isNull(this.$route.params.order_state)">全部</tab-item>
    <tab-item @on-item-click="tabClick" :selected="this.$route.params.order_state=='wait_pay'?true:false">待付款</tab-item>
    <tab-item @on-item-click="tabClick" :selected="this.$route.params.order_state=='wait_send'?true:false">待发货</tab-item>
    <tab-item @on-item-click="tabClick" :selected="this.$route.params.order_state=='wait_receive'?true:false">待收货</tab-item>
    <tab-item @on-item-click="tabClick" :selected="this.$route.params.order_state=='wait_assessment'?true:false">待评价</tab-item>
  </tab>
  <my-scroller class="content" @scrollBottom="handleScroll('up')" ref="scroller">
    <div class="orders" v-if="!isNull(orderBeans)">
      <div class="order" v-for="order in orderBeans" @click="orderClick(order.order_id)">
        <div class="box-between order-top">
          <h1>订单编号&nbsp;:&nbsp;{{order.order_no}}</h1>
          <h2>{{order.order_state_show}}</h2>
        </div>
        <div class="goods box-between" v-for="goods in order.orderGoodsBeans">
          <div class="goods_left box-center" @click.stop="goodsClick(goods.goods_id)">
            <my-image :initValue="goods.goods_img" options=" width:2rem;height:1.8rem;border-radius:0.1rem;"/>
          </div>
          <div class="goods-center">
            <h1>{{goods.goods_name}}</h1>
            <h2>规格:{{goods.specification_names}}</h2>
          </div>
          <div class="goods-right">
            <h1>￥{{goods.specification_price}}</h1>
            <h2>X{{goods.goods_num}}</h2>
          </div>
        </div>
        <div class="price box-end">
          <div>共{{goodsNum(order)}}件商品</div>
          <div class="box-center">
            <h1>合计&nbsp;:&nbsp;</h1>
            <h2>￥{{orderPrice(order)}}</h2>
          </div>
        </div>
        <div class="operation box-end">
          <div class="cancel" @click.stop="receiveOrder(order.order_id)" v-if="order.order_state=='wait_receive'">确认收货</div>
          <div class="cancel" @click.stop="assessmentOrder(order.order_id)" v-if="order.order_state=='wait_assessment'">评价订单</div>
          <div class="cancel" @click.stop="deleteOrder(order.order_id)">删除订单</div>
          <div class="cancel" @click.stop="cancelOrder(order.order_id)" v-if="order.order_state=='wait_pay'">取消订单</div>
          <div class="refund theme" @click.stop="refundOrder(order)" v-if="'wait_send,end,wait_assessment,wait_receive'.indexOf(order.order_state)!=-1">申请退款</div>
          <div class="pay theme" @click.stop="payOrder(order.order_id,order.order_actual_price)" v-if="order.order_state=='wait_pay'">付款</div>
        </div>
      </div>
    </div>
  </my-scroller>
</div>

</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        orderBeans:[],
        page: 1,
        orderState:'',
        isSearch:false,
        isOver:false,
        isClear:false
      }
    },
    beforeMount() {
      this.orderState=this.$route.params.order_state;
    },
    methods: {
      doSuccess(index, data) {
        switch (index) {
          case 1:
            if(this.isClear){
              this.orderBeans=[];
              this.isClear=false;
              this.$refs.scroller.toTop();
            }
            if(this.isNull(data)){
              this.isOver=true;
            }
            this.orderBeans=this.orderBeans.concat(data);
            this.isSearch=false;
            this.$refs.scroller.pullOver();
            break;
          case 2:
            this.showTip('取消订单成功');
            this.clear();
            this.getOrderList();
            break;
          case 3:
            this.showTip('删除订单成功');
            this.clear();
            this.getOrderList();
            break;
        }
      },
      tabClick(index){
        switch(index){
          case 0:
            this.orderState='';
            break;
          case 1:
            this.orderState='wait_pay';
            break;
          case 2:
            this.orderState='wait_send';
            break;
          case 3:
            this.orderState='wait_receive';
            break;
          case 4:
            this.orderState='wait_assessment';
            break;
        }
      },
      goodsNum(order){
        let num=0;
        if(!this.isNull(order.orderGoodsBeans)){
          order.orderGoodsBeans.forEach((orderGoods)=>{
            num+=orderGoods.goods_num;
          })

        }
        return num;
      },
      orderPrice(order){
        let price=0;
        if(!this.isNull(order.orderGoodsBeans)){
          order.orderGoodsBeans.forEach((orderGoods)=>{
            price+=orderGoods.goods_num*orderGoods.specification_price;
          })
        }
        return price;
      },
      getOrderList(){
        this.isSearch=true;
        this.post(1, 'orderInterfaces.api?getOrderList', {order_state:this.orderState,page:this.page});
      },
      handleScroll(type){
        if(!this.isSearch){
          if(type=='up'){
            if(!this.isOver){
              this.page++;
              this.isSearch=true;
              this.getOrderList();
            }
          }else{
            this.clear();
            this.isSearch=true;
            this.getOrderList();
          }
        }
      },
      orderClick(orderId){
        this.$router.push('/order_detail/'+orderId);
      },
      goodsClick(goodsId){
        this.$router.push('/goods_detail/'+goodsId);
      },
      cancelOrder(orderId){
       this.showConfirm('提示','取消订单后不可恢复，确定取消?',(select)=>{
         if(select){
           this.post(2,'orderInterfaces.api?cancelOrder',{order_id:orderId});
         }
       });
      },
      deleteOrder(orderId){
        this.showConfirm('提示','删除订单后不可恢复，确定删除?',(select)=>{
          if(select){
            this.post(3,'orderInterfaces.api?deleteOrder',{order_id:orderId});
          }
        });
      },
      receiveOrder(orderId){
        this.showConfirm('提示','亲，确定要收货么？?',(select)=>{
          if(select){
            this.post(4,'orderInterfaces.api?receiveOrder',{order_id:orderId});
          }
        });
      },
      assessmentOrder(orderId){
        this.$router.push('/assessment_order/'+orderId);
      },
      refundOrder(order){
        this.$router.push('/refund_order_goods/'+encodeURIComponent(JSON.stringify(order)));
      },
      payOrder(order_id,order_actual_price){
        let data={};
        data.order_ids=order_id;
        data.order_actual_price=order_actual_price;
        this.$router.push('/pay_order/'+encodeURIComponent(JSON.stringify(data)));
      },
      clear(){
        this.isClear=true;
        this.isOver=false;
        this.page=1;
      }
    },
    watch:{
      orderState(){
        this.clear();
        this.getOrderList();
      }
    }
  }
</script>
<style lang="less" scoped>
.root{
  height:100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  background: #eee;
  .tab{
    height:0.9rem;
  }
  .content{
    .orders{
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-start;
      .order{
        margin-bottom:0.2rem;
        background: #fff;
        .order-top{
          padding:0.1rem 0.2rem;
          background: #fff;
          h2{
            color:red;
          }
        }
        .goods{
          background: #eeefff;
          padding:0.1rem 0.2rem;
          border-bottom: 1px #ddd solid;
          height:2rem;
          div{
            height:100%;
            width:100%;
          }
          .goods-center{
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            align-items: flex-start;
            h2{
              margin-top:0.2rem;
              color:#777;
            }
          }
          .goods-right{
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;
            text-align: right;
            h1{
              color:red;
            }
            h2{
              margin-top:0.1rem;
              color:#777;
            }
          }
        }
        .price{
          padding:0.2rem 0.2rem;
          border-bottom: 1px #ddd solid;
          div{
            font-size:0.28rem;
            margin-left:0.5rem;
          }
          >div:nth-child(2){
            h2{
              color:red;
            }
          }
        }
      }
      .operation{
        background: #fff;
        a{
          display: inline-block;
        }
        .cancel,.customer{
           margin:0.2rem 0.2rem 0.2rem 0;
           padding:0.1rem 0.2rem;
           border-radius: 0.1rem;
           border:1px #000 solid;
         }
        .refund{
          margin:0.2rem 0.2rem 0.2rem 0;
          border:1px #329ff9 solid;
          border-radius: 0.1rem;
          padding:0.1rem 0.2rem;
          color:#fff;
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
  }
}
</style>
