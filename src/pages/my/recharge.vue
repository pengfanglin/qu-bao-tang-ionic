<template>
<div class="root box-between-column">
  <top center="充值"></top>
  <div class="content">
    <group class="pay_price box-start-column">
      <x-input v-model="rechargeMoney" title="￥" placeholder="请输入充值金额" class="input"></x-input>
    </group>
    <div class="check_pay_way">
      <div class="pay_way_top box-start">
        <h1>选择支付方式</h1>
      </div>
      <group class="pay_ways">
        <cell title="支付宝" :border-intent="false" class="cell">
          <img slot="icon" :src="require('../../assets/images/icon_alipay.png')"/>
          <div class="box-start car-top" @click="changePayWay('alipay_wap')">
            <check-icon :value="payWay=='alipay_wap'?true:false"/>
          </div>
        </cell>
        <cell title="微信" :border-intent="false" class="cell">
          <img slot="icon" :src="require('../../assets/images/icon_wx.png')"/>
          <div class="box-start car-top" @click="changePayWay('wx_wap')">
            <check-icon :value="payWay=='wx_wap'?true:false"/>
          </div>
        </cell>
      </group>
    </div>
    <div class="pay_ok">
      <my-button text="确认支付" @click="pay"/>
    </div>
  </div>
</div>
</template>
<script type="text/ecmascript-6">
    export default {
        data() {
            return {
              payWay:'alipay_wap',
              rechargeMoney:''
            }
        },
        methods: {
            doSuccess(index, data) {
                switch (index) {
                    case 1:
                      let pingpp = require('pingpp-js');
                      pingpp.createPayment(data, function(result, err){
                        if (result == "success") {
                          // 只有微信公众号 (wx_pub)、QQ 公众号 (qpay_pub)
                          //支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL
                        } else if (result == "fail") {
                          this.showTip('支付失败');
                        } else if (result == "cancel") {
                          this.showTip('支付已取消');
                        }
                      });
                        break;
                }
            },
          doPending(index,data){
            this.showTip('支付成功');
            this.$router.back();
          },
          pay(){
              if(!/^[0-9]*[1-9][0-9]*$/.test(this.rechargeMoney)){
                this.showTip('充值金额非法(只能是整数)');
                return;
              }
             this.post(1,'memberInterfaces.api?memberRecharge',{recharge_money:this.rechargeMoney,channel:this.payWay});
          },
          changePayWay(way){
              this.payWay=way;
          }
        }
    }
</script>
<style lang="less" scoped>
.root{
  background: #eee;
  height:100%;
  .content{
    height:100%;
    .pay_price{
      background: #fff;
      .input{
        height:0.9rem;
        padding-left:0.2rem;
        border-bottom: none;
      }
    }
    .check_pay_way{
      margin-top: 0.1rem;
      background: #fff;
      .pay_way_top{
        padding: 0.2rem;
      }
      .pay_ways{
        .cell {
          height: 0.9rem;
          padding: 0 0.2rem;
          img {
            width: 0.6rem;
            height: 0.6rem;
            margin-right: 0.1rem;
          }
          .balance{
            h1{

            }
            h2{
              margin-left:0.2rem;
              color:#777;
              font-size: 0.25rem;
            }
          }
        }
      }
    }
    .pay_ok{
      margin-top:2rem;
      padding:0 0.2rem;
    }
  }
}
</style>
