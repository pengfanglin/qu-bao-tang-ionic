<template>
  <div class="root box-between-column">
    <top center="提现记录"/>
    <my-scroller class="content" @scrollBottom="handleScroll('up')" ref="scroller">
      <div v-for="history in withdrawalBeans" class="history">
        <div class="top center">
          <h1>{{history.withdrawal_no}}</h1>
        </div>
        <div class="box-between history_center">
          <h1>{{history.withdrawal_price}}</h1>
          <h2>{{history.withdrawal_way_show}}</h2>
        </div>
        <div class="box-between bottom">
          <h1>{{history.withdrawal_state_show}}</h1>
          <h1>{{history.create_time}}</h1>
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
              withdrawalBeans:[]
            }
        },
        beforeMount() {
          this.getWithdrawalList();
        },
        methods: {
            doSuccess(index, data) {
                switch (index) {
                    case 1:
                      if(this.isClear){
                        this.withdrawalBeans=[];
                        this.isClear=false;
                        this.$refs.scroller.toTop();
                      }
                      if(this.isNull(data)){
                        this.isOver=true;
                      }
                      this.withdrawalBeans=this.withdrawalBeans.concat(data);
                      this.$refs.scroller.pullOver();
                      this.isSearch=false;
                        break;
                }
            },
          getWithdrawalList(){
            this.isSearch=true;
            this.post(1,'memberInterfaces.api?getWithdrawalList',{page:this.page});
          },
          handleScroll(type){
            if(!this.isSearch&&!this.isOver){
              this.page++;
              this.getWithdrawalList(false);
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
   .content{
     .history{
       background: #fff;
       margin-bottom: 0.2rem;
       padding:0.1rem 0.2rem;
       .history_center{
          margin:0.1rem 0;
         h1{
           color:red;
         }
       }
     }

   }
 }
</style>
