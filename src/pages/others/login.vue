<template>
  <div class="content">
    <div class="login_window box_center_column">
      <h1>人职初管理系统</h1>
      <div class="input_divs box_column">
        <div class="box_between form_div">
          <img src="../../assets/images/common/member.png">
          <input type="text" v-model="username" @focus="inputFocus" @blur="inputBlur" placeholder="账号" @keyup.enter="login" v-focus>
        </div>
        <div class="box_between form_div">
          <img src="../../assets/images/common/password.png">
          <input type="password" v-model="password" @focus="inputFocus" @blur="inputBlur" placeholder="密码" @keyup.enter="login">
        </div>
      </div>
      <span class="login_button" @click="login">登录</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {list} from '../../common'
  export default {
    mixins: [list],
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      login() {
        if (!/^[a-z0-9]{1,50}$/.test(this.username)) {
          this.message('账号格式出错', 'waring');
          return;
        }
        if (!/^[a-z0-9]{1,50}$/.test(this.password)) {
          this.message('密码格式出错', 'waring');
          return;
        }
        this.post(this.api.login, {
          username: this.username,
          password: this.password
        }, (data) => {
            this.$store.commit('systemAccount', {id:data.id,username:data.username});
            this.$router.push('/home');
        });

      },
      doFiled(index, error) {
        this.message(this.isEmpty(error) ? '登录失败!' : error, 'error');
      },
      inputFocus(e){
        e.target.parentNode.style.borderColor='#44bef6';
        e.target.parentNode.style.boxShadow='0 0 10px rgba(68,190,246,0.8)';
      },
      inputBlur(e){
        e.target.parentNode.style.borderColor='#999';
        e.target.parentNode.style.boxShadow='';
      }
    },
    mounted() {
// //    setTimeout(()=>{
// //      this.login();
// //    },200);
    }
  }
</script>
<style lang="less" scoped>
  .content {
    background: url(../../assets/images/common/login-background.jpg) top center no-repeat;
    background-size: cover;
    position: absolute;
    height: 100%;
    width: 100%;
    .login_window {
      width: 500px;
      height: 400px;
      position: fixed;
      top: 50%;
      left: 50%;
      background: white;
      opacity: 0.6;
      border-radius: 15px;
      transform: translate(-50%, -50%);
      >h1 {
        font-size: 30px;
        font-weight: bold;
        color: #419641;
      }
      .input_divs {
        >.form_div {
          width: 280px;
          height: 40px;
          border-radius: 5px;
          margin: 10px 0;
          border:2px #999 solid;
          padding:2px;
          >img{
            margin:0 5px;
          }
          > input {
            width: 100%;
            height:100%;
            border: none;
            outline: none;
            font-size: 18px;
            color:#333;
          }
        }
      }
      .login_button {
        width: 280px;
        height: 40px;
        background: rgb(64,158,255);
        color: #fff;
        font-size: 18px;
        border-radius: 10px;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
        margin-top: 10px;
        &:hover{
          background: rgba(64,158,255,0.9);
        }
      }
    }
  }
  .code_div {
    width: 280px;
    .code_input_div{
      width: 100%;
      height: 40px;
      border-radius: 5px;
      border:2px #999 solid;
      padding:2px;
    }
    input {
      width: 100%;
      height:100%;
      border: none;
      outline: none;
      font-size: 18px;
      color:#333;
    }
    > div:nth-child(2) {
      cursor: pointer;
      background: #ccc;
      width:150px;
      height:40px;
      margin: 0 20px;
      > p {
        font-size: 22px;
        color: #ff00ff;
      }
    }
  }
  .bottom {
    position: fixed;
    width: 100%;
    text-align: center;
    bottom: 30px;
    > a {
      color: #fff;
      &:hover {
        color: #ccc;
      }
    }
  }
</style>
