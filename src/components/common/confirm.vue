<template>
  <transition name="transtion">
    <div class="dialog-root" v-if="isShow">
      <div class="dialog-content box-between-column">
        <div class="dialog-title box-center">
          <div>{{title}}</div>
        </div>
        <div class="dialog-message box-center">
          <div>{{message}}</div>
        </div>
        <div class="dialog-operation box-center">
          <div @click="dialogClick(true)">确认</div>
          <div @click="dialogClick(false)">取消</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  /**
   * 对话框组件
   * message:对话框的提示消息内容
   * 对话框与父组件的数据交互采用的单独的Vue组件作为通讯中介，调用对话框后父组件会监听bus中的事件
   */
  export default {
    data() {
      return {
        isShow: true
      }
    },
    methods: {
      dialogClick(select) {
        this.isShow = false;
        let elements = document.getElementsByClassName('layout-root');
        elements[0].style.filter = 'none';
        this.bus.$emit('dialogClick', select);
      }
    },
    mounted() {
      let elements = document.getElementsByClassName('layout-root');
      elements[0].style.filter = 'blur(10px)';
    }
  }
</script>
<style scoped lang="less">
  .dialog-root {
    position: fixed;
    top: 0;
    z-index: 6666;
    width: 100%;
    height: 100%;
    .dialog-content {
      display: flex;
      flex-flow: column;
      position: absolute;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      min-width: 70%;
      border-radius: 0.2rem;
      background: #fff;
    }
    .dialog-title{
      padding:0.2rem 0.2rem 0 0.2rem;
      div{
        color:#000;
        font-size:0.3rem;
      }
    }
    .dialog-message {
      padding:0.2rem;
      div{
        color:#888;
        font-size:0.3rem;
      }
    }
    .dialog-operation {
      border-top:1px #ddd solid;
     div {
        color:#329ff9;
       font-size:0.3rem;
       width:100%;
       text-align: center;
       padding:0.2rem;
      }
      div:nth-child(1){
        border-right:1px #ddd solid;
      }
    }
  }

  .dialog-message {

  }

  .dialog-operation {

  }

  .dialog-operation > p {

  }

  .transtion-enter-active, .transtion-leave-active {
    transition: opacity 0.5s;
  }

  .transtion-enter, .transtion-leave-to {
    opacity: 0;
  }
</style>
