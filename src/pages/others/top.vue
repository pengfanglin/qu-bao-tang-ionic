<template>
  <div class="width-all">
    <div class="top-root box-between width-all" :class="back=='black'?'':'theme'">
      <div class="top_left" :class="back=='no'?'no_back':back=='black'?'back_black':'back_white'" @click="goBack"></div>
      <div class="top_center" :style="back=='black'?'color:#000;':'color:#fff;'">{{center}}</div>
      <div class="top_right" @click="rightClick">
        <slot>
          <div class="slot"/>
        </slot>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props:{
          back:{
            type:String,
            default:'white'
          },
          center:{
            type:String,
            default:''
          },
          click:{
            type:Boolean,
            default:true
          }
        },
      methods:{
        goBack() {
          if(this.click){
            this.$router.back();
          }else{
            this.$emit('click');
          }
        },
        rightClick(){
          this.$emit('rightClick');
        }
      }
    }
</script>
<style lang="less" scoped>
  .top-root {
    height: 1rem;
    flex-shrink: 0;
    .no_back{
      background-size:cover;
      width:0.5rem;
      height:0.5rem;
    }
    .top_left {
      margin-left: 0.2rem;
    }
    .top_center {
      font-size: 0.35rem;
      color: #fff;
    }
    .top_right {
      margin-right: 0.3rem;
      .slot {
        width: 0.5rem;
        height: 0.5rem;
      }
    }
  }
</style>
