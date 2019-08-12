<template>
  <div class="root" @scroll="scroll($event)" ref="scroller">
    <slot>
      <div class="box-start-column no_data">
        <div class="img"/>
        <h1>没有数据</h1>
      </div>
    </slot>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {},
    data() {
      return {
        isSearch:false
      }
    },
    beforeMount() {

    },
    methods: {
      scroll($event) {
        var wholeHeight = this.$refs.scroller.scrollHeight;
        var scrollTop = this.$refs.scroller.scrollTop;
        var divHeight = this.$refs.scroller.clientHeight;
        if (scrollTop + divHeight >= wholeHeight-400) {
          if(!this.isSearch){
            this.$emit('scrollBottom');
            this.isSearch=true;
          }
        }
      },
      pullOver(){
        this.isSearch=false;
      },
      toTop(){
        this.$refs.scroller.scrollTop=0;
      }
    }
  }
</script>
<style lang="less" scoped>
  .root {
    height: 100%;
    overflow-y: auto;
    .no_data{
      position: fixed;
      transform: translate(-50%,-50%);
      top:50%;
      left:50%;
      .img{
        background-image: url(../../assets/images/no-data.png);
        width:1rem;
        height:1rem;
      }
      h1{
        color:#777;
      }
    }
  }
</style>
