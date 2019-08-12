<template>
  <div class="root box-between-column">
    <top center="支付订单"></top>
    <div class="content">
      <div class="pay_price box-start">
        <h1>总计:</h1>
        <h2>￥{{payInfo.order_actual_price}}</h2>
      </div>
      <div class="check_pay_way">
        <div class="pay_way_top box-start">
          <h1>选择支付方式</h1>
        </div>
        <group class="pay_ways">
          <cell :border-intent="false" class="cell">
            <div slot="title" class="box-start balance">
              <h1>余额</h1>
              <h2>{{isNull(memberBean)?'':'(￥'+memberBean.total_balance+')'}}</h2>
            </div>
            <img slot="icon" :src="require('../../assets/images/icon_my.png')"/>
            <div class="box-start car-top" @click="changePayWay('member_balance')">
              <check-icon :value="payWay=='member_balance'?true:false"/>
            </div>
          </cell>
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
    <popup v-model="isShow" height="50%" position="bottom" class="view_root" @on-show="popupShow">
      <div class="pay_password center">请输入支付密码</div>
      <div class="input_all box-center" id="inputBoxContainer">
        <input type="text" class="realInput" v-model="member_pay_password" maxlength="6" ref="pay_password_input"/>
        <div class="text box-center">
          <div v-for="i in 6" class="box-center center">
            <h1 v-if="isNull(member_pay_password[i-1])"></h1>
            <h1 v-else="" class="hide_password"></h1>
          </div>
        </div>
      </div>
    </popup>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        payInfo: {},
        payWay: 'member_balance',
        memberBean: {},
        isShow: false,
        member_pay_password: ''
      }
    },
    beforeMount() {
      this.payInfo = JSON.parse(decodeURIComponent(this.$route.params.payInfo));
      this.post(2, 'memberInterfaces.api?getMemberDetail');
    },
    methods: {
      doSuccess(index, data) {
        switch (index) {
          case 1:
            let pingpp = require('pingpp-js');
            pingpp.createPayment(data, function (result, err) {
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
          case 2:
            this.memberBean = data;
            break;
        }
      },
      popupShow() {
        this.member_pay_password = '';
      },
      doPending(index, data) {
        this.$router.replace('/pay_success/'+this.payInfo.order_ids);
      },
      pay() {
        if (this.payWay == 'member_balance') {
          this.isShow = true;
        } else {
          this.post(1, 'orderInterfaces.api?payRealOrderList', {
            order_ids: this.payInfo.order_ids,
            channel: this.payWay
          });
        }
      },
      changePayWay(way) {
        this.payWay = way;
      }
    },
    watch: {
      member_pay_password() {
        if (this.member_pay_password.length == 6) {
          this.post(1, 'orderInterfaces.api?payRealOrderList', {
            order_ids: this.payInfo.order_ids,
            channel: this.payWay,
            member_pay_password: this.member_pay_password
          });
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .root {
    background: #eee;
    height: 100%;
    .content {
      height: 100%;
      .pay_price {
        padding: 0.2rem 0.2rem;
        background: #fff;
        h2 {
          color: red;
          margin-left: 0.1rem;
        }
      }
      .check_pay_way {
        margin-top: 0.1rem;
        background: #fff;
        .pay_way_top {
          padding: 0.2rem;
        }
        .pay_ways {
          .cell {
            height: 0.9rem;
            padding: 0 0.2rem;
            img {
              width: 0.6rem;
              height: 0.6rem;
              margin-right: 0.1rem;
            }
            .balance {
              h1 {

              }
              h2 {
                margin-left: 0.2rem;
                color: #777;
                font-size: 0.25rem;
              }
            }
          }
        }
      }
      .pay_ok {
        margin-top: 2rem;
        padding: 0 0.2rem;
      }
    }
    .view_root{
      .pay_password{
        margin-top:0.5rem;
      }
      .input_all{
        margin: 1rem 0;
        position: relative;
        .realInput{
          height:1rem;
          width:6rem;
          position: absolute;
          opacity: 0;
          z-index: 5555;
        }
        .text{
          position: absolute;
          div:nth-child(1){
            border-left: 1px #666 solid;
          }
          div{
            text-align: center;
            line-height: 1rem;
            border-right: 1px #666 solid;
            border-top: 1px #666 solid;
            border-bottom: 1px #666 solid;
            height:1rem;
            width:1rem;
            .hide_password{
              background: #000;
              width:0.2rem;
              height:0.2rem;
              border-radius: 100%;
            }
          }
        }
      }
    }
  }
</style>
