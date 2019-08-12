<template>
  <div class="login-root">
    <top back="black" class="top"></top>
    <div class="content">
      <div class="logo box-center">
        <div class="img"/>
      </div>
      <div class="form">
        <my-input placeholder="请输入手机号" type="phone" v-model="member_account"></my-input>
        <my-input placeholder="请输入密码" type="password" v-model="member_password"></my-input>
        <my-input placeholder="请再次输入密码" type="password" v-model="member_password_again"></my-input>
        <my-input type="code" v-model="code" :mobile="member_account" @sendCode="sendCode" code="register"></my-input>
      </div>
      <div class="button" @click="register">
        <my-button text="注册"></my-button>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        member_account: '',
        member_password: '',
        member_password_again: '',
        code: '',
        getCode: ''
      }
    },
    methods: {
      doSuccess(index, data) {
        switch (index) {
          case 1:
            localStorage.memberBean = JSON.stringify(data);
            this.$router.push('/');
            break;
        }
      },
      sendCode(data) {
        this.getCode = data;
      },
      register() {
        if (this.member_account == '') {
          this.showTip('请输入手机号');
          return;
        }
        if (this.member_password == '') {
          this.showTip('请输入密码');
          return;
        }
        if (this.member_password_again == '') {
          this.showTip('请确认密码');
          return;
        }
        if (this.member_password != this.member_password_again) {
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
        params.member_account = this.member_account;
        params.member_password = this.member_password;
        params.member_type = 0;
        params.code = this.code;
        this.post(1, 'memberInterfaces.api?registerMember', params);
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
