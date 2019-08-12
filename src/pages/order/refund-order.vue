<template>
<div class="root box-between-column">
  <top center="退款商品"></top>
  <div class="content">
    <div class="box-between content-top">
      <h1>请选择退款数量</h1>
    </div>
    <div class="goods box-between">
      <div class="goods_left box-center" @click.stop="goodsClick(goods.goods_id)">
        <my-image :initValue="orderGoodsBean.goods_img" options=" width:2rem;height:1.8rem;border-radius:0.1rem;"/>
      </div>
      <div class="goods-center box-between-column">
        <h1>{{orderGoodsBean.goods_name}}</h1>
        <h2>规格:{{orderGoodsBean.specification_names}}</h2>
        <h3>￥{{orderGoodsBean.specification_price}}</h3>
      </div>
      <div class="goods-right box-end-column">
        <number :min="1" :max="orderGoodsBean.goods_num" v-model="refund_num" class="number"></number>
      </div>
    </div>
    <group>
      <div class="content-slider">
        <h1>退款类型</h1>
      </div>
      <cell title="未收到货" :border-intent="false" class="cell">
        <div @click="checkRefundType('only_money')">
          <check-icon :value="refund_type=='only_money'?true:false"/>
        </div>
      </cell>
      <cell title="已收到货" :border-intent="false" class="cell">
        <div @click="checkRefundType('refund_goods')">
          <check-icon :value="refund_type=='refund_goods'?true:false"/>
        </div>
      </cell>
    </group>
    <group>
      <div class="content-slider">
        <h1>退款原因</h1>
      </div>
      <div @click="showRefundReason">
        <cell :title="reason_name" :border-intent="false" :is-link="true" class="cell"/>
      </div>
    </group>
    <group>
      <div class="content-slider">
        <h1>退款金额</h1>
      </div>
      <div  class="refund_price box-start">
        <h1>{{'￥'+refund_num*orderGoodsBean.specification_price}}</h1>
      </div>
    </group>
    <group>
      <div class="content-slider">
        <h1>退款说明</h1>
      </div>
      <div class="refund_note">
        <x-textarea v-model="refund_note" :max="255" placeholder="在此填写您的建议和要求"/>
      </div>
    </group>
    <group>
      <div class="content-slider">
        <h1>退款凭证</h1>
      </div>
      <div class="refund_note">
        <my-images :initValue="refund_imgs" path="/images/refund" filed="refund_imgs" :max="3" @change="imageChange" options="width:1.5rem;height:1.5rem;"/>
      </div>
    </group>
  </div>
  <div class="view_bottom theme" @click="applyRefund">提交申请</div>
  <popup v-model="isShow" height="auto" position="bottom" class="view_root box-between-column">
    <div class="top box-between" v-for="reasonReason in refundReasonBeans">
      <div>
        <h1>{{reasonReason.reason_name}}</h1>
      </div>
      <div @click="changeRefundReason(reasonReason.reason_id,reasonReason.reason_name)">
        <check-icon :value="reason_id==reasonReason.reason_id?true:false"/>
      </div>
    </div>
    <div class="view_bottom theme" @click="isShow=false">确定</div>
  </popup>
</div>
</template>
<script type="text/ecmascript-6">
    export default {
      data() {
            return {
              orderGoodsBean:{},
              refundReasonBeans:[],
              refund_type:'only_money',
              reason_name:'请选择退款原因',
              isShow:false,
              reason_id:0,
              refund_num:1,
              refund_note:'',
              refund_imgs:''
            }
        },
        beforeMount() {
          this.orderGoodsBean=JSON.parse(decodeURIComponent(this.$route.params.orderGoodsBean));
          this.refund_num=this.orderGoodsBean.goods_num;
          this.post(1,'orderInterfaces.api?getRefundReasonList');
        },
        methods: {
          doSuccess(index,data){
            switch(index){
              case 1:
                this.refundReasonBeans=data;
                break;
              case 2:
                this.showTip('申请成功');
                this.$router.go(-2);
            }
          },
          applyRefund(){
            let params={};
            let imgs=this.refund_imgs.split(',');
            imgs.forEach((img,index)=>{
              params['refund_img'+(index+1)]=img;
            })
            params.order_goods_id=this.orderGoodsBean.order_goods_id;
            params.order_id=this.orderGoodsBean.order_id;
            params.reason_name=this.reason_name;
            params.refund_count=this.refund_num;
            params.refund_desc=this.refund_note;
            params.refund_type=this.refund_type;
            this.post(2,'orderInterfaces.api?refundOrder',params);
          },
          checkRefundType(type){
            this.refund_type=type;
          },
          showRefundReason(){
            this.isShow=true;
          },
          changeRefundReason(reason_id,reason_name){
            this.reason_id=reason_id;
            this.reason_name=reason_name;
          },
          imageChange(key,value){
            this.refund_imgs=value;
          }
        }
    }
</script>
<style lang="less" scoped>
.root{
  height:100%;
  .content{
    overflow-y: auto;
    .content-top{
      padding:0.1rem 0.2rem;
      background: #fff;
      border-bottom: 1px #eee solid;
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
        .number{
          height:auto;
          width:2.0rem;
        }
      }
    }
  }
  .content-slider{
    padding:0.1rem 0.2rem;
    background: #eee;
  }
  .cell{
    height:0.7rem;
    padding:0 0.3rem;
  }
  .refund_price{
    height:0.7rem;
    padding:0 0.3rem;
    h1{
      color:red;
    }
  }
  .refund_note{
    padding:0 0.2rem;
  }
}
.view_root{
  background: #fff;
  .top{
    height:0.8rem;
    padding:0 0.2rem;
  }
}
.view_bottom{
  flex-grow:0;
  height:0.9rem;
  color:#fff;
  line-height: 0.9rem;
  text-align: center;
  width:100%;
  font-size: 0.4rem;
}
  .refund_note{
    margin-bottom: 0.1rem;
  }
</style>
