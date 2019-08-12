<template>
  <div class="root box-between-column">
    <top center="提现" @rightClick="withdrawalHistory">
      <div class="img"></div>
    </top>
    <div class="content">
      <group class="pay_price box-start-column">
        <x-input v-model="withdrawal_price" title="提现金额" placeholder="请输入提现金额" class="input"></x-input>
        <x-input v-model="withdrawal_no" title="提现账号" placeholder="请输入提现账号" class="input"></x-input>
      </group>
      <div class="check_pay_way">
        <div class="pay_way_top box-start">
          <h1>选择提现方式</h1>
        </div>
        <group class="pay_ways">
          <cell title="支付宝" :border-intent="false" class="cell">
            <img slot="icon" :src="require('../../assets/images/icon_alipay.png')"/>
            <div class="box-start car-top" @click="changePayWay('alipay')">
              <check-icon :value="withdrawal_way=='alipay'?true:false"/>
            </div>
          </cell>
          <cell title="微信" :border-intent="false" class="cell">
            <img slot="icon" :src="require('../../assets/images/icon_wx.png')"/>
            <div class="box-start car-top" @click="changePayWay('wx')">
              <check-icon :value="withdrawal_way=='wx'?true:false"/>
            </div>
          </cell>
        </group>
      </div>
      <div class="withdrawal_tip">
        <div class="top box-start center">
          <h1>可提现金额:</h1>
          <h2>{{memberBean.cash_balance}}</h2>
        </div>
        <div class="bottom box-center">
          <h1>我同意并且阅读</h1>
          <h2 @click="showView">《提现协议》</h2>
        </div>
      </div>
      <div class="pay_ok">
        <my-button text="确认提现" @click="test"/>
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
        memberBean:{},
        withdrawal_way: 'alipay',
        withdrawal_price: '',
        withdrawal_no: '',
        html_url:'',
        isShow:false,
        member_pay_password:''
      }
    },
    beforeMount(){
      this.post(1,'memberInterfaces.api?getMemberDetail');
      this.post(3,'settingInterfaces.api?getHtmlDetail',{html_name:'提现协议'});
    },
    methods: {
      doSuccess(index, data) {
        switch (index) {
          case 1:
            this.memberBean=data;
            break;
          case 2:
            this.showTip('申请提现成功');
            this.$router.back();
            break;
          case 3:
            this.html_url=data.html_url;
            break;
        }
      },
      withdrawalHistory(){
        this.$router.push('/withdrawal_history');
      },
      popupShow(){
        this.member_pay_password='';
      },
      showView(){
        this.$router.push('/web_view/'+encodeURIComponent(this.html_url)+'/提现协议');
      },
      test() {
        if (!/^[0-9]*[1-9][0-9]*$/.test(this.withdrawal_price)) {
          this.showTip('提现金额非法(只能是整数)');
          return;
        }
        if(this.memberBean.cash_balance<this.withdrawal_price){
          this.showTip('余额不足');
          return;
        }
        if (this.isNull(this.withdrawal_no)) {
          this.showTip('请输入提现账号');
          return;
        }
        this.isShow=true;
      },
      withdrawal(){
        this.post(2, 'memberInterfaces.api?applyWithdrawal', {
          withdrawal_price: this.withdrawal_price,
          withdrawal_no: this.withdrawal_no,
          withdrawal_way: this.withdrawal_way,
          member_pay_password:this.member_pay_password
        });
      },
      changePayWay(way) {
        this.withdrawal_way = way;
      }
    },
    watch:{
      member_pay_password(){
        if(this.member_pay_password.length==6){
          this.withdrawal();
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .root {
    background: #eee;
    height: 100%;
    .img{
      width: 0.5rem;
      height:0.5rem;
      background-image: url(../../assets/images/withdrawal_history.png);
    }
    .content {
      height: 100%;
      .pay_price {
        background: #fff;
        .input {
          height: 0.9rem;
          padding-left: 0.2rem;
          border-bottom: none;
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
              h2 {
                margin-left: 0.2rem;
                color: #777;
                font-size: 0.25rem;
              }
            }
          }
        }
      }
      .withdrawal_tip{
        margin:0.1rem 0 1rem 0;
        .top{
          padding:0.2rem 0.2rem;
          background: #fff;
          h2{
            color:red;
          }
        }
        .bottom{
          text-align: center;
          margin-top:0.5rem;
          h2{
            color:#329ff9;
          }
        }
      }
      .pay_ok {
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
