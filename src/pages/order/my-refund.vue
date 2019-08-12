<template>
<div class="root box-between-column">
  <top center="售后订单"></top>
    <my-scroller class="content" @scrollBottom="handleScroll('up')" ref="scroller">
    <div class="order" v-for="refundOrderBean in refundOrderBeans">
      <div class="box-between order-top">
        <h1>订单编号&nbsp;:&nbsp;{{refundOrderBean.order_no}}</h1>
        <h2>{{refundOrderBean.refund_state_show}}</h2>
      </div>
      <div class="goods box-between">
        <div class="goods_left box-center" @click.stop="goodsClick(refundOrderBean.orderGoodsBean.goods_id)">
          <my-image :initValue="refundOrderBean.orderGoodsBean.goods_img" options=" width:2rem;height:1.8rem;border-radius:0.1rem;"/>
        </div>
        <div class="goods-center box-center-column">
          <h1>{{refundOrderBean.orderGoodsBean.goods_name}}</h1>
          <h2>规格:{{refundOrderBean.orderGoodsBean.specification_names}}</h2>
        </div>
        <div class="goods-right box-center-column">
          <h1>￥{{refundOrderBean.orderGoodsBean.specification_price}}</h1>
          <h2>x{{refundOrderBean.refund_count}}</h2>
        </div>
      </div>
      <div class="order-bottom box-end">
        <h1 class="theme" @click="refundOrderDetail(refundOrderBean)">查看详情</h1>
      </div>
    </div>
    </my-scroller>
</div>
</template>
<script type="text/ecmascript-6">
    export default {
        data() {
            return {
              refundOrderBeans:[],
              page: 1,
              isSearch:false,
              isOver:false,
              isClear:false
            }
        },
        beforeMount() {
          this.getRefundOrderList();
        },
        methods: {
          doSuccess(index, data) {
            switch (index) {
              case 1:
                if(this.isClear){
                  this.refundOrderBeans=[];
                  this.isClear=false;
                  this.$refs.scroller.toTop();
                }
                if(this.isNull(data)){
                  this.isOver=true;
                }
                this.refundOrderBeans=this.refundOrderBeans.concat(data);
                this.isSearch=false;
                this.$refs.scroller.pullOver();
                break;
            }
          },
          refundOrderDetail(refundOrderBean){
            this.$router.push('/refund_order_detail/'+encodeURIComponent(JSON.stringify(refundOrderBean)));
          },
          getRefundOrderList(){
            this.post(1,'orderInterfaces.api?getRefundOrderList');
          },
          handleScroll(type){
            if(!this.isSearch){
              if(type=='up'){
                if(!this.isOver){
                  this.page++;
                  this.getRefundOrderList();
                }
              }else{
                this.clear();
                this.getRefundOrderList();
              }
            }
          },
          clear(){
            this.isClear=true;
            this.isOver=false;
            this.page=1;
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
    .order{
      margin-bottom: 0.2rem;
      .order-top{
        padding:0.1rem 0.2rem;
        background: #fff;
        border-bottom: 1px #eee solid;
        h2{
          color:red;
        }
      }
      .goods{
        background: #eeefff;
        padding:0.1rem 0.2rem;
        border-bottom: 1px #eee solid;
        height:2rem;
        div{
          height:100%;
          width:100%;
        }
        .goods-center{
          align-items: left;
          h2{
            color:#777;
            margin-top:0.3rem;
          }
        }
        .goods-right{
          align-items: flex-end;
          h1{
            color:red;
          }
          h2{
            color:#777;
            margin-top:0.3rem;
          }
        }
      }
      .order-bottom{
        background: #fff;
        padding:0.1rem 0.2rem;
        h1{
          padding:0.1rem 0.2rem;
          border-radius: 0.1rem;
          color:#FFF;
        }
      }
    }
  }
}
</style>
