<template>
  <div class="root">
    <top center="商品详情" class="top" @rightClick="shopCarClick">
      <div class="img"></div>
    </top>
    <div class="content">
      <slider img="img_url" :list="goodsImgBeans" class="slider" :autoHeight="0.8"></slider>
      <div class="goods_name">{{goodsBean.goods_name}}</div>
      <div class="price_sales">
        <h1>￥{{goodsBean.goods_now_price}}</h1>
        <h2>{{goodsBean.total_sales}}人购买</h2>
      </div>
      <div class="service box-between">
        <div class="box-center">
          <div class="img"/>
          <h1>快捷支付</h1>
        </div>
        <div class="box-center">
          <div class="img"/>
          <h1>运费险</h1>
        </div>
        <div class="box-center">
          <div class="img"/>
          <h1>七天无理由退换</h1>
        </div>
      </div>
      <div class="integral box-center" v-if="!isNull(goodsBean.give_integral_value)">
        <div class="box-center">
          <div class="img"/>
          <h1>赠送积分{{goodsBean.give_integral_value}}</h1>
        </div>
      </div>
      <div class="assessment box-center">
        <div class="left">
          <h1>{{(goodsBean.goods_star_total/3).toFixed(2)}}</h1>
        </div>
        <div class="right box-between-column">
          <div class="box-center">
            <h1>商品评价</h1>
            <div>
              <rater :max="5" :value="goodsBean.goods_star1" :disabled="true" :font-size="20" active-color="#ff5000"></rater>
            </div>
          </div>
          <div class="box-center">
            <h1>物流评价</h1>
            <div>
              <rater :max="5" :value="goodsBean.goods_star2" :disabled="true" :font-size="20" active-color="#ff5000"></rater>
            </div>
          </div>
          <div class="box-center">
            <h1>商家评价</h1>
            <div>
              <rater :max="5" :value="goodsBean.goods_star3" :disabled="true" :font-size="20" active-color="#ff5000"></rater>
            </div>
          </div>
        </div>
      </div>
      <div class="show_assessment">
        <div>
          <div @click="showAssessment">查看评价</div>
        </div>
      </div>
      <div class="goods_desc" v-html="urlContent"/>
    </div>
    <div class="bottom box-center">
      <div class="box-center-column">
        <a :href="isNull(goodsBean)?'':'tel:'+goodsBean.merchantsBean.contact_mobile">
          <div class="img customer"/>
        <h1>客服</h1>
        </a>
      </div>
      <div @click="collection" class="box-center-column">
        <div class="img collection" :class="isNull(goodsBean)||isNull(goodsBean.collection_id)?'black_star':'yellow_star'"/>
        <h1>收藏</h1>
      </div>
      <div @click="showSpecification('cart')" class="box-center-column">
        <h1>加入购物车</h1>
      </div>
      <div @click="showSpecification('buy')" class="box-center-column">
        <h1>立即购买</h1>
      </div>
    </div>
    <popup v-model="isShow" height="65%" position="bottom" class="view_root" v-if="!isNull(goodsSpecificationBeans)" >
      <div class="view_top">
        <div class="view_top_left">
          <img :src="isNull(goodsSpecificationBeans)?homeUrl+goodsBean.goods_img:homeUrl+goodsSpecificationBeans[selectIndex].specification_img"/>
        </div>
        <div class="view_top_right">
          <h1>{{goodsBean.goods_name}}</h1>
          <h2>￥{{goodsSpecificationBeans[selectIndex].specification_price}}</h2>
          <h3>库存:{{goodsSpecificationBeans[selectIndex].specification_stock}}</h3>
        </div>
        <div class="view_top_close">
          <div class="img" @click="isShow=false"/>
        </div>
      </div>
      <div class="view_center">
        <div v-for="(parent,parentIndex) in specificationBeans" class="parent">
          <h1>{{parent.specification_name}}</h1>
          <div class="child">
            <div v-for="(child,childIndex) in parent.specificationBeans" @click="specificationClick(parentIndex,child.specification_id)" :class="check.indexOf(child.specification_id)==-1?'not_click':'click theme'">{{child.specification_name}}</div>
          </div>
        </div>
        <div class="buy_div box-between">
          <div class="left">购买数量:</div>
          <div class="right">
            <number :min="1" :max="999" v-model="buyNum"></number>
          </div>
        </div>
      </div>
      <div class="view_bottom theme" @click="viewOk(viewType)">确定</div>
    </popup>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        goodsBean: {},
        goodsImgBeans: [],
        goodsSpecificationBeans:[],
        specificationBeans:[],
        selectIndex:0,
        urlContent: '',
        buyNum:1,
        check:[],
        isShow:false,
        viewType:'cart',
        contentUrl:''
      }
    },
    beforeMount() {
      this.post(1, 'goodsInterfaces.api?getGoodsDetail', {goods_id: this.$route.params.goods_id});
    },
    methods: {
      doSuccess(index, data) {
        switch (index) {
          case 1:
            this.goodsBean = data;
            this.goodsSpecificationBeans=data.goodsSpecificationBeans;
            this.specificationBeans=data.specificationBeans;
            data.specificationBeans.forEach((parent,index)=>{
              this.check[index]=parent.specificationBeans[0].specification_id;
            })
            if (!this.isNull(data.goodsImgBeans)) {
              data.goodsImgBeans.forEach((item) => {
                item.img = this.homeUrl + item.img_url;
              })
              this.goodsImgBeans = data.goodsImgBeans;
            }
            this.post(4,'settingInterfaces.api?getHtmlContent',{
              url:data.goods_url
            });
            break;
          case 2:
            this.showTip('收藏成功');
            this.goodsBean.collection_id=data;
            break;
          case 3:
            this.showTip('加入购物车成功');
            break;
          case 4:
            this.urlContent=data;
            break;
          case 5:
            let shopCarMerchantsBeans=[];
            let shopCarBeans=[];
            shopCarBeans.push(data);
            shopCarMerchantsBeans.push({
              member_id:data.member_id,
              merchants_id:data.merchants_id,
              merchantsBean:this.goodsBean.merchantsBean,
              shopCarBeans:shopCarBeans
            });
            this.$router.push('/confirm_order/'+encodeURIComponent(JSON.stringify(shopCarMerchantsBeans)));
            break;
        }
      },
      showAssessment(){
        this.$router.push('/goods_assessment/'+this.$route.params.goods_id);
      },
      buildStar(index, goodsStar) {
        let img = '/images/others/yellow_star.png';
        if (index <= goodsStar) {
          img = '/images/others/yellow_star.png';
        } else if (index > Math.ceil(goodsStar)) {
          img = '/images/others/black_star.png';
        } else {
          img = '/images/others/yellow_black_star.png';
        }
        return this.homeUrl + img;
      },
      collection(){
        if(this.isNull(this.goodsBean.collection_id)){
          this.post(2,'collectionInterfaces.api?insertCollection',{collection_type:'goods',relation_id:this.goodsBean.goods_id});
        }else{
          this.showTip('已收藏');
        }
      },
      showSpecification(type){
        this.isShow=true;
        this.viewType=type;
      },
      viewOk(type){
        this.isShow=false;
        let params={};
        params.goods_id=this.goodsBean.goods_id;
        params.goods_num=this.buyNum;
        params.specification_id=this.goodsSpecificationBeans[this.selectIndex].specification_id;
        if(type=='cart'){
          this.post(3,'shopCarInterfaces.api?insertShopCar',params);
        }else{
          this.post(5,'shopCarInterfaces.api?insertShopCar',params);
        }
      },
      specificationClick(parentIndex,childId){
        this.$set(this.check,parentIndex,childId);
        this.goodsSpecificationBeans.forEach((item,index)=>{
          if(item.specification_ids==this.check.join(',')){
            this.selectIndex=index;
          }
        })
      },
      shopCarClick(){
        this.$router.push('/shop_car');
      }
    }
  }
</script>
<style lang="less" scoped>
  .root {
    background: #eeefff;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    .top{
      .img {
        width: 0.5rem;
        height: 0.5rem;
        background-image: url(../../assets/images/icon_cart.png);
      }
    }
    .content {
      overflow: auto;
      .goods_name {
        background: #fff;
        font-size: 0.3rem;
        padding-top: 0.1rem;
        margin-left: 0.2rem;
      }
      .price_sales {
        padding: 0.1rem 0;
        background: #fff;
        > h1 {
          color: red;
          display: inline;
          margin-left: 0.2rem;
        }
        > h2 {
          float: right;
          display: inline;
          margin-right: 0.2rem;
          color: #777;
        }
      }
      .service {
        padding: 0.1rem 0.1rem;
        background: #fff;
        margin-top: 0.1rem;
        > div {
          .img{
            width:0.28rem;
            height:0.28rem;
            background-image: url(../../assets/images/icon_check.png);
          }
          > h1 {
            display: inline;
            color: #777;
            margin-left: 0.1rem;
          }
        }
      }
      .integral {
        border-top: 1px #ccc solid;
        padding: 0.1rem 0.2rem;
        background: #fff;
        justify-content: center;
        >div{
          .img {
            width: 0.45rem;
            height: 0.45rem;
            display: inline-block;
            background-image: url(../../assets/images/fanli.png);
          }
          h1 {
            display: inline-block;
            margin-left: 0.1rem;
            color: #777;
          }
        }
      }
      .assessment {
        background: #fff;
        height: 2rem;
        margin-top: 0.1rem;
        border-bottom: 1px #ccc solid;
        .left {
          flex: 1;
          > h1 {
            text-align: center;
            color: red;
            font-size: 0.5rem;
          }
        }
        .right {
          flex: 1;
          height: 100%;
          > div {
            width: 100%;
            flex: 1;
            > h1 {
              display: inline;
            }
            > div {
              flex: 1;
              display: flex;
              justify-content: flex-start;
              margin-left: 0.2rem;
              img {
                width: 0.3rem;
                height: 0.3rem;
                margin-left: 0.1rem;
              }
            }
          }
        }
      }
      .show_assessment {
        padding: 0.2rem 0;
        background: #fff;
        > div {
          margin: 0 auto;
          width: 70%;
          border: 1px #419641 solid;
          border-radius: 0.1rem;
          > div {
            color: #419641;
            font-size: 0.3rem;
            padding: 0.15rem;
            width: 100%;
            text-align: center;
          }
        }
      }
    }
    .bottom {
      flex-shrink: 0;
      background: #fff;
      height: 1rem;
      > div {
        height: 100%;
      }
      > div:nth-child(1),> div:nth-child(2){
        flex: 1;
        .customer {
          background-image: url(../../assets/images/customer.png);
          width: 0.4rem;
          height: 0.4rem;
        }
        .collection{
          width: 0.4rem;
          height: 0.4rem;
        }
        h1 {
          font-size: 0.25rem;
          color: #777;
        }
      }
      > div:nth-child(3) {
        flex: 2;
        background-image: -webkit-gradient(linear, 0% 0%, 0% 90%, from(rgba(255, 200, 0, 0.8)), to(rgba(255, 155, 0, 0.9)));
        h1 {
          color: #fff;
        }
      }
      > div:nth-child(4) {
        flex: 2;
        background-image: -webkit-gradient(linear, 0% 0%, 0% 90%, from(rgba(255, 115, 0, 0.8)), to(rgba(255, 80, 0, 0.9)));
        h1 {
          color: #fff;
        }
      }
    }
  }
  .view_root{
    background: #fff;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    .view_top{
      flex-grow:0;
      display: flex;
      flex-flow: row nowrap;
      padding: 0.1rem 0.2rem;
      border-bottom: 1px #eee solid;
      .view_top_left{
        flex-shrink: 0;
        img{
          width:1.5rem;
          height:1.5rem;
          border-radius: 100%;
        }
      }
      .view_top_right{
        margin-left: 0.3rem;
        flex: 2;
        display: flex;
        flex-flow: column;
        justify-content: space-between;
        *{
          flex:1;
        }
        >h1{
          color:#000;
        }
        >h2{
          color:red;
        }
        >h3{
          color:#000;
        }
      }
      .view_top_close{
        .img{
          background-image: url(../../assets/images/close.png);
          width:0.5rem;
          height:0.5rem;
        }
      }
    }
    .view_center{
      flex: 1;
      overflow: auto;
      .parent{
        padding: 0.1rem 0;
        border-bottom: 1px #eee solid;
        >h1{
          font-size: 0.3rem;
          margin-left: 0.3rem;
        }
        .child{
          margin: 0.3rem 0.2rem;
          >div{
            font-size: 0.25rem;
            display: inline;
            padding: 0.15rem 0.4rem;
            margin-right: 0.2rem;
            border-radius: 0.2rem;
          }
        }
      }
      .buy_div{
        padding:0.2rem 0.2rem;
        .left{
          font-size: 0.3rem;
          display: inline;
          color:#666;
        }
      }
    }
    .view_bottom{
      flex-grow:0;
      height:0.9rem;
      color:#fff;
      line-height: 0.9rem;
      text-align: center;
      width:100%;
      font-size: 0.4rem;
    }
  }
  .not_click{
    color:#000;
    background: #ccc;
  }
  .click{
    color:#fff;
  }
  .black_star{
    background-image: url(../../assets/images/black_star.png);
  }
  .yellow_star{
    background-image: url(../../assets/images/yellow_star.png);
  }
</style>
