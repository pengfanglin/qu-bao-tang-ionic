<template>
  <div>
    <div  class="send-code" v-if="type=='code'">
      <div :style="buildStyle" class="left">
        <input type="text" placeholder="请输入验证码" v-model="value" maxlength="6" class="input">
      </div>
      <my-code class="code" @sendCode="sendCode" :type="code" :mobile="mobile"></my-code>
    </div>
    <div class="input-root" :style="buildStyle" v-else="">
      <input :type="type" :placeholder="placeholder" v-model="value" :maxlength="max" :minlength="min" ref="inputDiv" class="input">
      <div class="phone img" v-if="type=='phone'"/>
      <div class="eye img" v-if="type=='password'" @click="eye($event)"/>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      placeholder: {
        type: String,
        default: ''
      },
      initValue: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'text'
      },
      max: {
        type: Number,
        default: 20
      },
      min: {
        type: Number,
        default: 0
      },
      bgColor: {
        type: String,
        default: '#FFF'
      },
      mobile:{
        type: String,
        default: ''
      },
      code:{
        type: String,
        default: ''
      }
    },
    data() {
      return {
        value: this.initValue,
      }
    },
    beforeMount(){
      this.$emit('input',this.value);
    },
    methods: {
      eye(event) {
        event.target.style.backgroundImage = this.$refs.inputDiv.type == 'password' ? require('../../assets/images/eye_open.png') : require('../../assets/images/eye_close.png');
        this.$refs.inputDiv.type = this.$refs.inputDiv.type == 'password' ? 'text' : 'password';
      },
      sendCode(data) {
        this.$emit('sendCode',data);
      },
    },
    computed: {
      buildStyle() {
        return {
          background: this.bgColor
        }
      }
    },
    watch:{
      value(){
        this.$emit('input',this.value);
      },
      initValue(){
        this.$emit('input',this.value);
      }
    }
  }
</script>
<style lang="less" scoped>
  .input-root {
    height: 0.9rem;
    border-radius: 0.1rem;
    padding: 0 0.2rem;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    .input {
      color: #777;
      font-size: 0.3rem;
      width: 90%;
      height: 100%;
    }
    .phone {
      width: 0.5rem;
      height: 0.7rem;
      background-image: url(../../assets/images/phone.png);
    }
    .eye {
      width: 0.5rem;
      height: 0.6rem;
      background-image: url(../../assets/images/eye_close.png);
    }
  }

  .send-code {
    height: 0.9rem;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    .left{
      height: 100%;
      border-radius: 0.1rem;
      padding-left:0.2rem;
      width:100%;
      .input {
        color: #777;
        font-size: 0.3rem;
        height: 100%;
      }
    }
    .code {
      flex-shrink: 0;
      display: inline-block;
      margin-left: 0.5rem;
    }
  }
</style>
