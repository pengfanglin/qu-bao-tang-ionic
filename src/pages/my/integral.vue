<template>
  <div class="root box-between-column">
    <top center="我的积分"/>
    <div class="top img box-center shrink">
      <div class="bg"></div>
      <div class="text box-center">
        <h1>{{total_integral}}</h1>
      </div>
    </div>
    <tab active-color="#ff0000" bar-active-color="#329ff9" class="type_div shrink">
      <tab-item @on-item-click="signTypeClick('add')" :selected="state=='add'?true:false">获取记录</tab-item>
      <tab-item @on-item-click="signTypeClick('use')" :selected="state=='use'?true:false">使用记录</tab-item>
    </tab>
    <my-scroller class="content" @scrollBottom="handleScroll('up')" ref="scroller">
      <div v-for="integralBean in integralBeans" class="integral box-between">
        <div class="left box-between-column">
          <h1>{{integralBean.integral_type_show}}</h1>
          <h2>{{integralBean.create_time}}</h2>
        </div>
        <div class="right box-center">
          <h1>{{integralBean.state=='add'?('+'+integralBean.integral_value):('-'+integralBean.integral_value)}}</h1>
        </div>
      </div>
    </my-scroller>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        isSearch: false,
        total_integral: 0,
        page: 1,
        isClear: false,
        isOver: false,
        state: 'add',
        integralBeans: []
      }
    },
    beforeMount() {
      this.getMemberIntegralList();
    },
    methods: {
      doSuccess(index, data) {
        switch (index) {
          case 1:
            if (this.isClear) {
              this.integralBeans = [];
              this.isClear = false;
              this.$refs.scroller.toTop();
            }
            if (this.isNull(data.memberIntegralBeans)) {
              this.isOver = true;
            }
            this.integralBeans = this.integralBeans.concat(data.memberIntegralBeans);
            this.$refs.scroller.pullOver();
            this.isSearch = false;
            this.total_integral = data.total_integral;
            break;
        }
      },
      signTypeClick(type) {
        this.state = type;
        this.clear();
        this.getMemberIntegralList();
      },
      getMemberIntegralList() {
        this.isSearch = true;
        this.post(1, 'memberInterfaces.api?getMemberIntegralList', {
          state: this.state,
          page: this.page
        });
      },
      handleScroll(type) {
        if (!this.isSearch && !this.isOver) {
          this.page++;
          this.getMemberIntegralList(false);
        }
      },
      clear() {
        this.isClear = true;
        this.page = 1;
        this.isOver = false;
      }
    }
  }
</script>
<style lang="less" scoped>
  .root {
    height: 100%;
    background: #eeefff;
    .type_div{
      width:100%;
      height: 0.9rem;
    }
    .top{
      position: relative;
      .bg{
        position: absolute;
        width:100%;
        height:100%;
        background-image: url(../../assets/images/center_top.jpg);
      }
      height: 3rem;
      .text{
        z-index: 55555;
        h1{
          font-size: 0.5rem;
          color:#fff;
        }
      }
    }
    .integral {
      margin: 0.2rem 0.2rem;
      background: #fff;
      border-radius: 0.2rem;
      padding:0.2rem;
      .left {
        h1{

        }
        h2{
          color: #777;
          margin-top:0.1rem;
        }
      }
      .right {
        h1{
          color:red;
        }
      }
    }
  }
</style>
