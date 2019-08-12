<template>
  <div class="root box-between-column">
    <top center="个人资料"></top>
    <group label-width="1.6rem" class="content">
      <x-input v-model="memberBean.member_real_name" title="姓名" placeholder="请填写您的真实姓名" class="input"></x-input>
      <x-input v-model="memberBean.member_nick_name" title="昵称" placeholder="请填写您的昵称" class="input"></x-input>
      <x-input v-model="memberBean.member_age" title="年龄" placeholder="请填写您的年龄" class="input"></x-input>
    </group>
    <div class="bottom theme" @click="ok">保存修改</div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        memberBean:{}
      }
    },
    beforeMount() {
      this.post(1,'memberInterfaces.api?getMemberDetail');
    },
    methods: {
      doSuccess(index, data) {
        switch (index) {
          case 1:
            this.memberBean=data;
            break;
          case 2:
            this.showTip('修改成功');
            break;
        }
      },
      ok(){
        let baseData=[
          {title:'姓名',key:'member_real_name'},
          {title:'昵称',key:'member_nick_name'},
          {title:'年龄',key:'member_age',validate:'int'}
        ]
        let params={};
        params.member_real_name=this.memberBean.member_real_name;
        params.member_nick_name=this.memberBean.member_nick_name;
        params.member_age=this.memberBean.member_age;
        if(!this.validate(baseData,params)){
          return;
        }
        this.post(2,'memberInterfaces.api?updateMemberDetail',params);
      }
    }
  }
</script>
<style lang="less" scoped>
  .root{
    background: #eeefff;
    height:100%;
    .content{
      height:100%;
      width:100%;
      .input{
        height:0.9rem;
        padding-left:0.2rem;
        border-bottom: none;
      }
      .address{
        line-height: 0.8rem;
        padding-right:0.2rem;
      }
    }
    .bottom{
      height:1rem;
      line-height: 1rem;
      text-align: center;
      font-size: 0.3rem;
      color:#fff;
    }
  }
</style>
