<template>
  <div class="root box-between-column">
    <top center="收货地址"></top>
    <div class="content">
      <div class="address box-between-column" v-for="(address,index) in addressBeans" @click="addressClick(index)">
        <div class="box-between top">
          <h1>{{address.address_name}}</h1>
          <h1>{{address.address_mobile}}</h1>
        </div>
        <div class="center box-between">
          <h1>{{address.address_province+address.address_city+address.address_district+address.address_detail}}</h1>
          <h1>{{address.address_flag}}</h1>
        </div>
        <div class="box-between bottom">
          <div class="left box-start" @click="setDefaultAddress(address.address_id)">
            <check-icon :value="address.is_default==1?true:false">默认地址</check-icon>
          </div>
          <div class="right box-start">
            <div class="edit box-start" @click="editAddress(address.address_id)">
              <div class="img"/>
              <h1>编辑</h1>
            </div>
            <div class="delete box-start" @click="deleteAddress(address.address_id)">
              <div class="img"/>
              <h1>删除</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom theme" @click="addAddress">添加新地址</div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        addressBeans:[],
        page:1
      }
    },
    beforeMount() {
      this.getAddressList();
    },
    methods: {
      doSuccess(index, data) {
        switch (index) {
          case 1:
            this.addressBeans=data;
            break;
          case 2:
            this.showTip('设置成功');
            this.getAddressList();
            break;
          case 3:
            this.showTip('删除成功');
            this.getAddressList();
            break;
        }
      },
      getAddressList(){
        this.post(1,'addressInterfaces.api?getMemberAddressList',{page:this.page});
      },
      addAddress(){
        this.$router.push('/edit_address/'+0);
      },
      editAddress(addressId){
        this.$router.push('/edit_address/'+addressId);
      },
      deleteAddress(addressId){
        this.showConfirm('提示','确定删除此地址么?',(select)=>{
          if(select){
            this.post(3,'addressInterfaces.api?deleteAddress',{address_id:addressId});
          }
        });
      },
      setDefaultAddress(addressId){
        this.post(2,'addressInterfaces.api?setDefaultAddress',{address_id:addressId});
      },
      addressClick(index){
        let shopCarMerchantsBeans=this.$route.params.shopCarMerchantsBeans;
        if(!this.isNull(shopCarMerchantsBeans)){
          this.$router.replace('/confirm_order/'+encodeURIComponent(shopCarMerchantsBeans)+'/'+encodeURIComponent(JSON.stringify(this.addressBeans[index])));
        }
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
      overflow-y: auto;
      .address{
        background: #fff;
        margin-bottom: 0.1rem;
        .top{
          padding:0.2rem 0.2rem 0 0.2rem;
        }
        .center{
          padding:0.2rem 0.2rem 0.4rem 0.2rem;
          border-bottom: 1px #ddd solid;
        }
        .bottom{
          padding:0.1rem 0.2rem;
          .left{

          }
          .right{
            .edit{
              .img{
                width:0.3rem;
                height:0.3rem;
                background-image: url(../../assets/images/icon_edit.png);
              }
              h1{
                margin-left:0.1rem;
              }
            }
            .delete{
              margin-left:0.3rem;
              .img{
                width:0.3rem;
                height:0.3rem;
                background-image: url(../../assets/images/icon_delete.png);
              }
              h1{
                margin-left:0.1rem;
              }
            }
          }
        }
      }
    }
    >.bottom{
      height:1rem;
      line-height: 1rem;
      text-align: center;
      font-size: 0.3rem;
      color:#fff;
    }
  }
</style>
