<template>
  <transition name="transtion">
    <div class="toast-root" v-if="isShow" :class="'type_'+type">{{message}}</div>
  </transition>
</template>
<script type="text/ecmascript-6">
  /**
   * 提示消息组件
   * message：提示内容
   * isShow：是否显示，默认为true
   * type：提示框颜色类型 primary：默认 success：成功 info：一般信息 warning:警告 danger：危险
   */
 export default {
   data(){
     return{
       message:'',
       type:'',
       isShow:true
     }
   },
   mounted(){
     setTimeout(()=>{
       this.isShow=false;
     },1000);
   }
 }
</script>
<style scoped>
.toast-root{
  background:rgba(50,50,50,0.9);
  border-radius: 0.2rem;
  text-align: center;
  position: fixed;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%,0);
  z-index: 8888888;
  color:#fff;
  font-size:0.28rem;
  padding:0.2rem 0.3rem;
}
.type_primary{
  background:#337AB7;
}
.type_success{
  background:#5CB85C;
}
.type_info{
  background:#5BC0DE;
}
.type_warning{
  background:#F0C14E;
}
 .type_danger{
   background:#D9534F;
 }
.transtion-enter-active,.transtion-leave-active{
    transition: opacity 1.0s;
  }
  .transtion-enter,.transtion-leave-to{
    opacity: 0;
  }
</style>
