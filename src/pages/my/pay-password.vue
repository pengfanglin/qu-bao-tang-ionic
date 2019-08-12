<template>
  <div class="login-root">
    <top class="top" center="修改支付密码"></top>
    <div class="content">
      <div class="logo box-center">
        <div class="img"/>
      </div>
      <div class="account box-center">
        <h1>{{member_account}}</h1>
      </div>
      <div class="form">
        <my-input placeholder="请输入支付密码" type="password" v-model="member_pay_password"></my-input>
        <my-input placeholder="请再次输入支付密码" type="password" v-model="member_pay_password_again"></my-input>
        <my-input type="code" v-model="code" :mobile="member_account" @sendCode="sendCode" code="pay_passwrod"></my-input>
      </div>
      <div class="button" @click="register">
        <my-button text="立即修改"></my-button>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        member_account:'',
        member_pay_password: '',
        member_pay_password_again: '',
        code: '',
        getCode: ''
      }
    },
    beforeMount(){
      this.member_account=JSON.parse(localStorage.memberBean).member_account;
    },
    methods: {
      doSuccess(index, data) {
        switch (index) {
          case 1:
            this.$router.back();
            break;
        }
      },
      sendCode(data) {
        this.getCode = data;
      },
      register() {
        if (this.member_pay_password == '') {
          this.showTip('请输入支付密码');
          return;
        }
        if (this.member_pay_password_again == '') {
          this.showTip('请确认支付密码');
          return;
        }
        if (this.member_pay_password != this.member_pay_password_again) {
          this.showTip('两次密码不同');
          return;
        }
        if (this.code == '') {
          this.showTip('请输入验证码');
          return;
        }
        if (this.code != this.getCode) {
          this.showTip('验证码错误');
          return;
        }
        let params = {};
        params.member_pay_password = this.member_pay_password;
        params.member_type = 0;
        params.code = this.code;
        this.post(1, 'memberInterfaces.api?updateMemberPayPassword', params);
      }
    }
  }
</script>
<style lang="less" scoped>
  .login-root {
    background: #eeefff;
    height: 100%;
    .content{
      padding:0 0.3rem;
      .logo {
        padding: 1rem 0;
        .img {
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 100%;
          background-image: url(../../assets/images/logo.png);
        }
      }
      .account{
        margin-bottom:0.2rem;
      }
      .form{
        >div{
          margin-top:0.2rem;
        }
      }
      .button {
        margin-top: 0.5rem;
      }
    }
  }
</style>
