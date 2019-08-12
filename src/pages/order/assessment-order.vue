<template>
  <div class="root box-between-column">
    <top center="评价订单"/>
    <div class="content">
      <div class="order_goods" v-for="(orderGoodsBean,index) in orderBean.orderGoodsBeans">
        <div class="top box-start">
          <my-image :initValue="orderGoodsBean.specification_img" options="width:0.6rem;height:0.6rem;border-radius:0.1rem;"/>
          <h1>商品评分</h1>
          <rater :max="5" v-model="assessmentBeans[index].assessment_star1" active-color="#ff5000"></rater>
        </div>
        <group class="center">
          <x-textarea v-model="assessmentBeans[index].assessment_desc" :max="200" placeholder="请输入您的评价内容" class="text_area"></x-textarea>
        </group>
        <div class="bottom">
          <my-images :initValue="assessmentBeans[index].imgs" :filed="index+''" @change="imagesChange" path="/images/assessment" options="width:1rem;height:1rem;border-radius:0.1rem;"/>
        </div>
      </div>
      <div class="assessment_bottom box-between-column">
        <div class="top box-center">
          <h1>商家评价</h1>
        </div>
        <div class="center box-start">
          <h1>物流评分</h1>
          <rater :max="5" v-model="assessment_star2" active-color="#ff5000"></rater>
        </div>
        <div class="bottom box-start">
          <h1>服务评分</h1>
          <rater :max="5" v-model="assessment_star3" active-color="#ff5000"></rater>
        </div>
      </div>
    </div>
    <div class="root_bottom shrink theme box-center" @click="assessmentOk">
      <h1>提交</h1>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">

  export default {
    data() {
      return {
        orderBean:{},
        assessmentBeans:[],
        assessment_star2:0,
        assessment_star3:0
      }
    },
    beforeMount() {
      this.post(1,'orderInterfaces.api?getOrderDetail',{
        order_id:this.$route.params.order_id
      });
    },
    methods: {
      doSuccess(index, data) {
        switch (index) {
          case 1:
            this.orderBean=data;
            data.orderGoodsBeans.forEach((orderGoodsBean)=>{
              let temp={
                member_id:data.member_id,
                order_id:data.order_id,
                merchants_id:data.merchants_id,
                assessment_desc:'',
                assessment_type:'goods',
                assessment_star1:0,
                assessment_star2:0,
                assessment_star3:0,
                assessment_img1:'',
                assessment_img2:'',
                assessment_img3:''
              }
              this.assessmentBeans.push(temp);
            })
            break;
          case 2:
            this.showTip('评价成功');
            this.$router.back();
            break;
        }
      },
      imagesChange(filed,value){
        this.assessmentBeans[parseInt(filed)].imgs=value;
      },
      assessmentOk(){
        this.assessmentBeans.forEach((item,assessmentIndex)=>{
          item.assessment_star2=this.assessment_star2;
          item.assessment_star3=this.assessment_star3;
          item.goods_id=this.orderBean.orderGoodsBeans[assessmentIndex].goods_id;
          if(!this.isNull(item.imgs)){
            item.imgs.split(',').forEach((img,index)=>{
              item['assessment_img'+(index+1)]=img;
            })
          }
          delete item.imgs;
        });
        this.post(2,'orderInterfaces.api?assessmentOrder',{
          json:JSON.stringify(this.assessmentBeans)
        });
      }
    }
  }
</script>
<style lang="less" scoped>
.root{
  height:100%;
  background: #eeefff;
  .content{
    height:100%;
    overflow-y: auto;
    .order_goods{
      background: #fff;
      margin-bottom: 0.2rem;
      .top{
        padding:0.2rem 0.2rem;
        h1{
          margin: 0 0.2rem;
        }
      }
      .center{
        padding:0.1rem 0;
        margin: 0 0.2rem;
        border: 1px #777 solid;
        border-radius: 0.2rem;
        .text_area{
          padding:0.1rem;
        }
      }
      .bottom{
        padding:0.1rem 0.2rem;
      }
    }
    .assessment_bottom{
      background: #fff;
      padding:0.2rem 0.2rem;
      .top{
        h1{
          font-size: 0.35rem;
        }
      }
      .center{
        margin:0.1rem 0;
        h1{
          margin-right: 0.2rem;
        }
      }
      .bottom{
        h1{
          margin-right: 0.2rem;
        }
      }
    }
  }
  .root_bottom{
    height:1rem;
    h1{
      font-size: 0.3rem;
      color:#fff;
    }
  }
}
</style>
