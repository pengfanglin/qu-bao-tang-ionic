<template>
  <div class="login-root">
    <top back="black" :click="false" @click="goBack"></top>
    <div class="content">
      <div class="logo box-center">
        <div class="img"/>
      </div>
      <div class="form">
        <my-input placeholder="请输入手机号" type="phone" v-model="member_account" initValue="15639038767"></my-input>
        <my-input placeholder="请输入密码" type="password" v-model="member_password" initValue="123456"></my-input>
      </div>
      <div class="button" @click="login">
        <my-button text="登录"></my-button>
      </div>

      <div class="bottom box-between">
        <h1 @click="goRegister">注册</h1>
        <h2 @click="goForgetPassword">忘记密码?</h2>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        member_account:'',
        member_password:''
      }
    },
    methods: {
      doSuccess(index, data) {
        switch (index) {
          case 1:
            localStorage.memberBean=JSON.stringify(data);
            this.$router.back();
            break;
        }
      },
      login(){
        if(this.member_account==''){
          this.showTip('请输入手机号');
          return;
        }
        if(this.member_password==''){
          this.showTip('请输入密码');
          return;
        }
        this.post(1,'memberInterfaces.api?loginMember',{member_account:this.member_account,member_password:this.member_password});
      },
      goBack(){
        this.$router.push('/');
      },
      goRegister(){
        this.$router.push('/register');
      },
      goForgetPassword(){
        this.$router.push('/forget_password');
      }
    }
  }
</script>
<style lang="less" scoped>
.login-root{
  background: #eeefff;
  height:100%;
  .content{
    padding:0 0.3rem;
    .logo{
      padding:1rem 1rem;
      .img{
        width:1.5rem;
        height:1.5rem;
        border-radius: 100%;
        background-image: url(../../assets/images/logo.png);
      }
    }
    .form{
      >div{
        margin-top:0.2rem;
      }
    }
    .button{
      margin-top:1rem;
    }
    .bottom{
      margin-top: 0.3rem;
      h1{
        color:red;
      }
      h2{
        color:#999;
      }
    }
  }
}
</style>
