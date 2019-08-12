<template>
  <div class="root box-between-column">
    <top center="我的消息"/>
    <tab active-color="#ff0000" bar-active-color="#329ff9" class="type_div shrink">
      <tab-item @on-item-click="messageTypeClick('order')" :selected="msg_type=='order'?true:false">订单消息</tab-item>
      <tab-item @on-item-click="messageTypeClick('system')" :selected="msg_type=='system'?true:false">系统消息</tab-item>
    </tab>
    <my-scroller class="content" @scrollBottom="handleScroll('up')" ref="scroller">
      <div v-for="message in memberMsgBeans" class="message">
        <div class="top">
          <h1>{{message.msg_title}}</h1>
        </div>
        <div class="center">
          <h1>{{message.msg_desc}}</h1>
        </div>
        <div class="bottom">
          <h1>{{message.create_time}}</h1>
        </div>
      </div>
    </my-scroller>
  </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {},
        data() {
            return {
              isSearch:false,
              page:1,
              isClear:false,
              isOver:false,
              msg_type:'order',
              memberMsgBeans:[]
            }
        },
        beforeMount() {
          this.getMemberMsgList();
        },
        methods: {
            doSuccess(index, data) {
                switch (index) {
                    case 1:
                      if(this.isClear){
                        this.memberMsgBeans=[];
                        this.isClear=false;
                        this.$refs.scroller.toTop();
                      }
                      if(this.isNull(data)){
                        this.isOver=true;
                      }
                      this.memberMsgBeans=this.memberMsgBeans.concat(data);
                      this.$refs.scroller.pullOver();
                      this.isSearch=false;
                        break;
                }
            },
          messageTypeClick(type){
            this.msg_type=type;
            this.clear();
            this.getMemberMsgList();
          },
          getMemberMsgList(){
            this.isSearch=true;
            this.post(1,'memberInterfaces.api?getMemberMsgList',{msg_type:this.msg_type,page:this.page});
          },
          handleScroll(type){
            if(!this.isSearch&&!this.isOver){
              this.page++;
              this.getMemberMsgList(false);
            }
          },
          clear(){
            this.isClear=true;
            this.page=1;
            this.isOver=false;
          }
        }
    }
</script>
<style lang="less" scoped>
 .root{
   height:100%;
   background: #eeefff;
   .type_div{
     width:100%;
     height: 0.9rem;
   }
   .message{
     margin:0.15rem 0.3rem;
     background: #fff;
     border-radius: 0.2rem;
     h1{
       margin:0 0.2rem;
     }
     .top{
       padding:0.1rem 0;
        text-align: center;
       color:#666;
     }
     .center{
       border-top: 1px #eee solid;
       border-bottom: 1px #eee solid;
       padding:0.1rem 0;
     }
     .bottom{
       color:#777;
       padding:0.1rem 0;}
   }
 }
</style>
