<template>
  <div class="button-root" :style="buildClass" @click="click">{{text}}</div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {
          bgColor:{
            type:String,
            default:'#329ff9'
          },
          height:{
            type:String,
            default:'0.9rem'
          },
          width:{
            type:String,
            default:'100%'
          },
          text:{
            type:String,
            default:''
          },
          fontSize:{
            type:String,
            default:'0.4rem'
          },
          color:{
            type:String,
            default:'#fff'
          }
        },
        data() {
            return {}
        },
        methods: {
            click(){
              this.$emit('click');
            }
        },
      computed:{
          buildClass(){
            return {
              'background':this.bgColor,
              'font-size':this.fontSize,
              'width':this.width,
              'height':this.height,
              'color':this.color,
              'line-height':this.height
            }
          }
      }
    }
</script>
<style lang="less" scoped>
.button-root{
  text-align: center;
  border-radius: 0.1rem;
  -webkit-tap-highlight-color:transparent;
}
</style>
