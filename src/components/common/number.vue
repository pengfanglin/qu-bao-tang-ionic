<template>
  <div class="number-root box-center">
    <div class="box-center" @click="change('-')">-</div>
    <div class="box-center">{{number}}</div>
    <div class="box-center" @click="change('+')">+</div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 999999999
      },
      step: {
        type: Number,
        default: 1
      },
      value: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        number: this.value
      }
    },
    methods: {
      change(type) {
        if (type == '-') {
          this.number = this.number > this.min ? this.number - 1 : this.number;
        } else {
          this.number = this.number < this.max ? this.number + 1 : this.number;
        }

      }
    },
    watch: {
      value() {
        this.number = this.value;
      },
      number() {
        this.$emit('input', this.number);
        this.$emit('change', this.number);
      }
    }
  }
</script>
<style lang="less" scoped>
  .number-root {
    border: 1px #777 solid;
    background: #fff;
    width: 2.0rem;
    border-radius: 0.2rem;
    div {
      color: #777;
      font-size: 0.4rem;
      display: inline-block;
      text-align: center;
    }
    div:nth-child(1) {
      border-right: 1px #777 solid;
      flex: 1;
    }
    div:nth-child(2) {
      font-size: 0.3rem;
      flex: 2;
    }
    div:nth-child(3) {
      border-left: 1px #777 solid;
      color: #777;
      flex: 1;
    }
  }
</style>
