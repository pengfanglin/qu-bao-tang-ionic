<template>
  <div class="root">
    <top center="购物车" back="no" @rightClick="saveShopCar">
      <h1 class="save" v-if="isSave">保存</h1>
    </top>
    <my-scroller class="content" ref="scroller">
      <div class="cars" v-if="!isNull(shopCarMerchantsBeans)">
        <div class="car" v-for="(shopCarMerchants,index) in shopCarMerchantsBeans">
          <div class="box-start car-top" @click="checkMerchants(index,shopCarMerchants.merchants_id)">
            <check-icon :value="merchantsCheck.indexOf(shopCarMerchants.merchants_id)==-1?false:true">
              {{shopCarMerchants.merchantsBean.merchants_name}}
            </check-icon>
          </div>
          <div class="goods box-start" v-for="shopCar in shopCarMerchants.shopCarBeans">
            <div class="goods-left box-center-column">
              <div @click="checkShopCar(index,shopCar)">
                <check-icon :value="buildGoodsCheck(shopCar.car_id)" class="goods-check"></check-icon>
              </div>
            </div>
            <div class="goods-center box-center" @click.stop="goodsClick(shopCar.goods_id)">
              <my-image :initValue="isNull(shopCar.specification_img)?shopCar.goods_img:shopCar.specification_img" options=" width:2rem;height:1.8rem;border-radius:0.1rem;"/>
            </div>
            <div class="goods-right">
              <h1>{{shopCar.goods_name}}</h1>
              <h2>规格:{{shopCar.specification_names}}</h2>
              <div class="bottom box-between">
                <h1>￥{{shopCar.specification_price}}</h1>
                <number :min="1" :max="999" v-model="shopCar.goods_num" @change="numberChange"></number>
              </div>
            </div>
          </div>
        </div>
      </div>
    </my-scroller>
    <div>
      <div class="box-between price">
        <div class="box-start price-left">
          <div @click="allCheck">
            <check-icon :value="buildAllCheck">全选</check-icon>
          </div>
          <h1 @click="deleteShopCar">删除</h1>
        </div>
        <div class="box-start price-right">
          <div class="box-center">
            <h1>合计&nbsp;:</h1>
            <h2>￥{{buildPrice}}</h2>
          </div>
          <div class="theme" @click="payCar">去结算</div>
        </div>
      </div>
      <home-bottom/>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        shopCarMerchantsBeans: [],
        isOver: false,
        isSave:false,
        merchantsCheck: [],
        shopCarCheck: []
      }
    },
    beforeMount() {
      this.getShopCarList();
    },
    methods: {
      doSuccess(index, data) {
        switch (index) {
          case 1:
            this.shopCarMerchantsBeans = this.shopCarMerchantsBeans.concat(data);
            break;
          case 2:
            this.showTip('保存成功');
            break;
          case 3:
            this.showTip('删除成功');
            this.shopCarCheck=[];
            this.merchantsCheck=[];
            this.shopCarMerchantsBeans=[];
            this.getShopCarList();
            break;
        }
      },
      getShopCarList() {
        this.post(1, 'shopCarInterfaces.api?getShopCarList');
      },
      allCheck() {
        if (this.merchantsCheck.length != this.shopCarMerchantsBeans.length) {
          this.merchantsCheck = [];
          this.shopCarCheck = [];
          this.shopCarMerchantsBeans.forEach((shopCarMerchants) => {
            this.merchantsCheck.push(shopCarMerchants.merchants_id);
            shopCarMerchants.shopCarBeans.forEach((shopCar) => {
              this.shopCarCheck.push(shopCar);
            })
          })
        } else {
          this.merchantsCheck = [];
          this.shopCarCheck = [];
        }
      },
      checkMerchants(index, merchantsId) {
        if (this.merchantsCheck.indexOf(merchantsId) == -1) {
          this.merchantsCheck.push(merchantsId);
          this.shopCarMerchantsBeans[index]['shopCarBeans'].forEach((shopCar) => {
            this.shopCarCheck.push(shopCar);
          })
        } else {
          this.merchantsCheck = this.merchantsCheck.filter((item) => {
            return item != merchantsId;
          })
          this.shopCarCheck = this.shopCarCheck.filter((item) => {
            return item.merchants_id != merchantsId;
          })
        }
      },
      checkShopCar(index, goods) {
        let have = false;
        this.shopCarCheck.forEach((item) => {
          if (item.car_id == goods.car_id) {
            have = true;
          }
        })
        if (have) {
          this.shopCarCheck = this.shopCarCheck.filter((item) => {
            return goods.car_id != item.car_id;
          })
          this.merchantsCheck = this.merchantsCheck.filter((item) => {
            return item != goods.merchants_id;
          })
        } else {
          this.shopCarCheck.push(goods);
          let allCheck = true;
          this.shopCarMerchantsBeans[index]['shopCarBeans'].forEach((shopCar) => {
            let have = false;
            this.shopCarCheck.forEach((item) => {
              if (item.car_id == shopCar.car_id) {
                have = true;
              }
            })
            if (!have) {
              allCheck = false;
            }
          })
          if (allCheck) {
            this.merchantsCheck.push(goods.merchants_id);
          } else {
            this.merchantsCheck = this.merchantsCheck.filter((item) => {
              return item != goods.merchants_id;
            })
          }
        }
      },
      buildGoodsCheck(goodsId) {
        let have = false;
        this.shopCarCheck.forEach((item) => {
          if (item.car_id == goodsId) {
            have = true;
          }
        })
        return have;
      },
      goodsClick(goodsId) {
        this.$router.push('/goods_detail/' + goodsId);
      },
      payCar() {
       if(this.isNull(this.shopCarCheck)){
         this.showTip('请选择结算的购物车');
       }else{
         let shopCarMerchantsBeans=this.shopCarMerchantsBeans;
         shopCarMerchantsBeans=shopCarMerchantsBeans.filter((shopCarMerchants)=>{
           shopCarMerchants.shopCarBeans=shopCarMerchants.shopCarBeans.filter((shopCar)=>{
             return this.shopCarCheck.indexOf(shopCar)!=-1;
           })
           return !this.isNull(shopCarMerchants.shopCarBeans);
         })
          this.$router.push('/confirm_order/'+encodeURIComponent(JSON.stringify(shopCarMerchantsBeans)));
       }
      },
      numberChange(){
        this.isSave=true;
      },
      saveShopCar(){
        let params=[];
        this.shopCarMerchantsBeans.forEach((shopCarMerchants)=>{
          shopCarMerchants.shopCarBeans.forEach((shopCar)=>{
            let temp={};
            temp.car_id=shopCar.car_id;
            temp.goods_num=shopCar.goods_num;
            params.push(temp);
          })
        })
        this.isSave=false;
        this.post(2,'shopCarInterfaces.api?updateShopCarList',{shop_cars:JSON.stringify(params)});
      },
      deleteShopCar(){
        let params=[];
        this.shopCarCheck.forEach((shopCar)=>{
          if(params.indexOf(shopCar.car_id)==-1){
            params.push(shopCar.car_id);
          }
        })
        if(params.length==0){
          this.showTip('请选择需要删除的购物车');
        }else{
          this.showConfirm('提示','删除后无法恢复，确认删除?',(select)=>{
            if(select){
              this.post(3,'shopCarInterfaces.api?deleteShopCar',{car_ids:params.join(',')});
            }
          })
        }
      }
    },
    computed: {
      buildAllCheck() {
        return (!this.isNull(this.shopCarMerchantsBeans)) && this.merchantsCheck.length == this.shopCarMerchantsBeans.length ? true : false;
      },
      buildPrice() {
        let carIds = [];
        let price = 0;
        this.shopCarCheck.forEach((shopCar) => {
          if (carIds.indexOf(shopCar.car_id) == -1) {
            price += shopCar.specification_price * shopCar.goods_num;
            carIds.push(shopCar.car_id);
          }
        })
        return price;
      }
    }
  }
</script>
<style lang="less" scoped>
  .root {
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    background: #eee;
    .save{
      color:#fff;
      font-size: 0.35rem;
    }
    .content {
      height: 100%;
      overflow-y: auto;
      .cars {
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        .car {
          background: #fff;
          .car-top {
            padding: 0.1rem 0.1rem;
            background: #fff;
            h2 {
              color: red;
            }
          }
          .goods {
            background: #eeefff;
            padding: 0.1rem 0.1rem;
            border-bottom: 1px #ddd solid;
            height: 2rem;
            > div {
              display: inline-block;
              height: 100%;
            }
            .goods-left {
              > div {
                height: 100%;
                display: flex;
                flex-flow: column;
                justify-content: center;
              }
            }
            .goods-center {
              padding: 0 0.2rem;
              h2 {
                color: #777;
              }
            }
            .goods-right {
              width: 100%;
              display: flex;
              flex-flow: column nowrap;
              justify-content: space-between;
              .bottom {
                h1 {
                  color: red;
                  font-size: 0.3rem;
                }
                > div {
                  height: 0.5rem;
                  margin-bottom: 0.1rem;
                }
              }
            }
          }
        }
      }
    }
  }
  .price{
    background: #fff;
    height:0.9rem;
    .price-left{
      span{
        color:red;
      }
      h1{
        margin-left:0.2rem;
        color:#777;
      }
    }
    .price-right{
      height:100%;
      >div:nth-child(1){
        h2{
          color:red;
          margin:0 0.2rem 0 0.1rem;
        }
      }
      >div:nth-child(2){
        height:100%;
        padding:0 0.5rem;
        line-height: 0.9rem;
        color:#fff;
      }
    }
  }
  .goods-check {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
  }
</style>
