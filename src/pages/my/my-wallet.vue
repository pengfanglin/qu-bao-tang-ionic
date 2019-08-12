<template>
  <div class="root">
    <top center="我的钱包"/>
    <div class="top box-between-column shrink">
      <h1>余额</h1>
      <h2>{{memberBean.total_balance}}</h2>
      <div class="top_bottom box-between">
        <div class="left box-center width-all center">
          <h1>冻结&nbsp;:&nbsp;</h1>
          <h2>{{memberBean.lock_balance}}</h2>
        </div>
        <div class="right box-center width-all center">
          <h1>可提现&nbsp;:&nbsp;</h1>
          <h2>{{memberBean.cash_balance}}</h2>
        </div>
      </div>
    </div>
    <group class="pay_password">
      <cell title="修改支付密码" :is-link="true" link="/pay_password" :border-intent="false" class="cell"/>
    </group>
    <tab active-color="#ff0000" bar-active-color="#329ff9" class="order_div shrink">
      <tab-item @on-item-click="tabClick('add')" :selected="type=='add'?true:false">获取记录</tab-item>
      <tab-item @on-item-click="tabClick('use')" :selected="type=='use'?true:false">使用记录</tab-item>
    </tab>
    <my-scroller class="balance_history" @scrollBottom="handleScroll('up')" ref="scroller">
      <div v-for="balanceHistory in balanceHistoryBeans" class="history">
        <div class="history_top box-start">
          <h1>{{balanceHistory.title}}</h1>
        </div>
        <div class="box-between center">
          <h1>订单&nbsp;:&nbsp;{{balanceHistory.order_no}}</h1>
          <h2>{{(balanceHistory.type=='add'?'+':'-')+(''+balanceHistory.price)}}</h2>
        </div>
        <div class="bottom box-start">
          <h1>{{balanceHistory.create_time}}</h1>
        </div>
      </div>
    </my-scroller>
    <div class="operation box-between shrink">
      <div @click="recharge">充值</div>
      <div @click="withdrawal">提现</div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        memberBean: {},
        balanceHistoryBeans:[],
        type: 'add',
        page:1,
        isSearch:false,
        isClear:false,
        isOver:false,
      }
    },
    beforeMount() {
      this.post(1, 'memberInterfaces.api?getMemberDetail');
      this.getBalanceHistoryList();
    },
    methods: {
      doSuccess(index, data) {
        switch (index) {
          case 1:
            this.memberBean = data;
            break;
          case 2:
            if(this.isClear){
              this.balanceHistoryBeans=[];
              this.isClear=false;
              this.$refs.scroller.toTop();
            }
            if(this.isNull(data)){
              this.isOver=true;
            }
            this.balanceHistoryBeans=this.balanceHistoryBeans.concat(data);
            this.$refs.scroller.pullOver();
            this.isSearch=false;
            break;
        }
      },
      getBalanceHistoryList(){
        let params={};
        params.page=this.page;
        params.type=this.type;
        this.isSearch=true;
        this.post(2, 'memberInterfaces.api?getBalanceHistoryList',params);
      },
      handleScroll(type){
        if(!this.isSearch){
          if(type=='up'){
            if(!this.isOver){
              this.page++;
              this.isSearch=true;
              this.getBalanceHistoryList();
            }
          }else{
            this.clear();
            this.isSearch=true;
            this.getBalanceHistoryList();
          }
        }
      },
      tabClick(type) {
        this.type = type;
        this.clear();
        this.getBalanceHistoryList();
      },
      clear(){
        this.isClear=true;
        this.isOver=false;
        this.page=1;
      },
      recharge(){
        this.$router.push('/recharge');
      },
      withdrawal(){
        this.$router.push('/withdrawal');
      }
    }
  }
</script>
<style lang="less" scoped>
  .root {
    height: 100%;
    background: #eeefff;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    .top {
      padding: 0.2rem;
      background: #fff;
      text-align: center;
      > h1 {
        font-size: 0.35rem;
      }
      > h2 {
        margin-top: 0.2rem;
        color: red;
        font-size: 0.4rem;
      }
      .top_bottom {
        padding-top: 0.1rem;
        .left {
          border-right: 1px #000 solid;
        }
      }
    }
    .pay_password{
      margin:0.1rem 0;
      .cell{
        height:0.8rem;
        padding: 0 0.2rem;
      }
    }
    .order_div{
      height:0.9rem;
      width:100%;
    }
    .balance_history{
      background: #fff;
      .history{
        padding:0.1rem 0.2rem;
        border-top: 1px #eee solid;
        .history_top{
          h1{
            font-size:0.28rem;
          }
        }
        .center{
          margin:0.1rem 0;
          h2{
            color:red;
          }
        }
        .bottom{
          h1{
            color:#777;
          }
        }
      }
    }
    .operation{
      padding:0.1rem 0.2rem;
      background: #fff;
      div{
        height:0.8rem;
        width:100%;
        color:#fff;
        text-align: center;
        line-height: 0.8rem;
        border-radius: 0.1rem;
      }
      div:nth-child(1){
        background: #329ff9;
      }
      div:nth-child(2){
        background: #419641;
        margin-left: 0.1rem;
      }
    }
  }
</style>
