<template>
  <div class="code-root" :style="buildClass" @click="click">{{showText}}</div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      bgColor: {
        type: String,
        default: '#329ff9'
      },
      height: {
        type: String,
        default: '0.9rem'
      },
      width: {
        type: String,
        default: '2rem'
      },
      color: {
        type: String,
        default: '#fff'
      },
      time: {
        type: Number,
        default: 60
      },
      type: {
        type: String,
        required: true
      },
      mobile: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        text: '发送验证码',
        disable: false
      }
    },
    methods: {
      doSuccess(index, data) {
        switch (index) {
          case 1:
            this.$emit('sendCode', data);
            break;
        }
      },
      click() {
        if (!/^[0-9]{11}$/.test(this.mobile)) {
          this.showTip('请输入手机号');
          return;
        } else if (!this.disable) {
          this.sendCode();
          this.disable = true;
          this.text = this.time;
          let interval = setInterval(() => {
            this.text--;
            if (this.text == 0) {
              this.disable = false;
              this.text = '重发';
              clearInterval(interval);
            }
          }, 1000);
        }
      },
      sendCode() {
        this.post(1, 'settingInterfaces.api?sendCode', {code_type: this.type, mobile: this.mobile});
      }
    },
    computed: {
      buildClass() {
        return {
          'background': this.bgColor,
          'width': this.width,
          'height': this.height,
          'line-height': this.height,
          'color': this.color
        }
      },
      showText() {
        return this.disable ? this.text + 'S' : this.text;
      }
    }
  }
</script>
<style lang="less" scoped>
  .code-root {
    text-align: center;
    border-radius: 0.1rem;
    -webkit-tap-highlight-color: transparent;
    font-size: 0.3rem;
  }
</style>
