<template>
  <div class="root box-between-column">
    <top center="售后详情"/>
    <my-scroller class="content">
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
      <div class="refund_note">
        <h1 v-if="refundOrderBean.refund_state=='wait_review'">您的申请已提交成功，正在等待商家审核，请耐心等待，谢谢合作</h1>
        <h1 v-if="refundOrderBean.refund_state=='accept'">商家已同意您的退款申请，请等待退款到账</h1>
        <h1 v-if="refundOrderBean.refund_state=='refuse'">商家拒绝了您的退款申请，您可以联系客服，或者申请平台介入</h1>
        <h1 v-if="refundOrderBean.refund_state=='end'">退款已到账，请注意查收，祝您购物愉快</h1>
      </div>
      <div class="refund_price box-between">
        <h1>退款金额</h1>
        <h2>￥{{refundOrderBean.refund_price}}</h2>
      </div>
      <div class="refund_info box-start-column">
        <h1>售后单号:{{refundOrderBean.refund_no}}</h1>
        <h1>下单时间:{{refundOrderBean.orderBean.create_time}}</h1>
        <h1>申请时间:{{refundOrderBean.create_time}}</h1>
        <h1>付款时间:{{refundOrderBean.order_no}}</h1>
      </div>
      <div class="reason_name box-start">
        <h1>退款原因:</h1>
        <h2>{{refundOrderBean.reason_name}}</h2>
      </div>
      <div class="refund_desc">
        <h1>退款备注:</h1>
        <h2>{{refundOrderBean.refund_desc}}</h2>
      </div>
      <div class="refund_imgs" v-if="!isNull(refund_imgs)">
        <h1>退款凭证:</h1>
        <div>
          <my-images :initValue="refund_imgs" filed="refund_imgs" :onlyShow="true" :max="3" :disable="true" options="width:1.5rem;height:1.5rem;"/>
        </div>
      </div>
    </my-scroller>
    <div class="bottom box-end">
      <a :href="'tel:'+refundOrderBean.orderBean.contact_mobile">
        <h1>联系商家</h1>
      </a>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {},
    data() {
      return {
        refundOrderBean:{},
        refund_imgs:''
      }
    },
    beforeMount() {
      this.refundOrderBean=JSON.parse(decodeURIComponent(this.$route.params.refundOrderBean));
      console.log(this.refundOrderBean)
      if(!this.isNull(this.refundOrderBean.refund_img1)){
        this.refund_imgs+=this.refundOrderBean.refund_img1+',';
      }
      if(!this.isNull(this.refundOrderBean.refund_img2)){
        this.refund_imgs+=this.refundOrderBean.refund_img2+',';
      }
      if(!this.isNull(this.refundOrderBean.refund_img3)){
        this.refund_imgs+=this.refundOrderBean.refund_img3+',';
      }
    },
    methods: {
      doSuccess(index, data) {
        switch (index) {
          case 0:
            break;
        }
      }
    }
  }
</script>
<style lang="less" scoped>
.root{
  height:100%;
  background: #eeefff;
  .content{
    overflow-y: auto;
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
    .refund_note{
      background: #fff;
      padding:0.1rem 0.2rem;
    }
    .refund_price{
      padding:0.1rem 0.2rem;
      margin:0.2rem 0;
      background: #fff;
      h2{
        color:red;
      }
    }
    .refund_info{
      background: #fff;
      h1{
        padding:0.1rem 0.2rem;
      }
    }
    .reason_name{
      margin: 0.2rem 0;
      padding:0.1rem 0.2rem;
      background: #fff;
      h2{
        margin-left: 0.1rem;
      }
    }
    .refund_desc{
      margin: 0.2rem 0;
      padding:0.1rem 0.2rem;
      background: #fff;
      h2{
        margin-top:0.1rem;
      }
    }
    .refund_imgs{
      background: #fff;
      padding:0.1rem 0.2rem;
    }
  }
  .bottom{
    padding:0.2rem 0.2rem;
    background: #fff;
    a{
      padding:0.1rem 0.2rem;
      border-radius: 0.1rem;
      border: 1px #000 solid;
    }
  }
}
</style>
