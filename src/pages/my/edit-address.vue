<template>
  <div class="root box-between-column">
    <top :center="title"></top>
    <group label-width="1.6rem" class="content">
      <x-input v-model="addressBean.address_flag" title="标签" placeholder="选填" class="input"></x-input>
      <x-input v-model="addressBean.address_name" title="收货人" placeholder="请输入您的姓名" class="input"></x-input>
      <x-input v-model="addressBean.address_mobile" title="联系方式" placeholder="请输入您的联系方式" class="input"></x-input>
      <x-address @on-hide="addressClose" :raw-value="true" @on-shadow-change="addressChange" v-model="addressBean.selectAddress" :list="cityBeans" title="选择地区" placeholder="请选择地区" class="input address" value-text-align="left" ></x-address>
      <x-input v-model="addressBean.address_detail" title="详细地址" placeholder="如街道，楼层，门牌号等" class="input"></x-input>
      <x-input v-model="addressBean.address_zip_code" title="邮政编码" placeholder="选填" class="input"></x-input>
    </group>
    <div class="bottom theme" @click="ok">确定</div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        title:'添加地址',
        addressBean:{},
        cityBeans:ChinaAddressV4Data,
        selectAddress:[]
      }
    },
    beforeMount() {
      this.addressBean.address_id=this.$route.params.address_id;
      if(this.addressBean.address_id==0){
        this.title='添加地址';
      }else{
        this.title='修改地址';
        this.post(1,'addressInterfaces.api?getAddressDetail',{address_id:this.addressBean.address_id});
      }
    },
    methods: {
      doSuccess(index, data) {
        switch (index) {
          case 1:
            let address=[];
            address.push(data.address_province);
            address.push(data.address_city);
            address.push(data.address_district);
            data.selectAddress=address;
            this.addressBean=data;
            break;
          case 2:
            this.showTip('添加成功');
            this.$router.back();
            break;
          case 3:
            this.showTip('修改成功');
            this.$router.back();
            break;
        }
      },
      ok(){
        if(!this.isNull(this.selectAddress)){
          this.addressBean.address_province=this.selectAddress[0];
          this.addressBean.address_city=this.selectAddress[1];
          this.addressBean.address_district=this.selectAddress[2];
          this.addressBean.address=this.selectAddress[0]+this.selectAddress[1]+this.selectAddress[2];
        }
        let params=[
          {title:'收货人',key:'address_name',validate:'null'},
          {title:'联系方式',key:'address_mobile',validate:'phone'},
          {title:'省市区',key:'address',validate:'null'},
          {title:'详细地址',key:'address_detail',validate:'null'},
          {title:'邮政编码',key:'address_zip_code'}
        ]
        if(!this.validate(params,this.addressBean)){
          return;
        }
        if(this.addressBean.address_id==0){
          this.post(2,'addressInterfaces.api?insertAddress',this.addressBean);
        }else{
          this.post(3,'addressInterfaces.api?updateAddress',this.addressBean);
        }
      },
      addressClose(value){
        if(!value){
          this.selectAddress=[];
        }
      },
      addressChange(ids,names){
        this.selectAddress=names;
      }
    }
  }
</script>
<style lang="less" scoped>
  .root{
    background: #fff;
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
