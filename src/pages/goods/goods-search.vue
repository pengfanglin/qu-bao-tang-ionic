<template>
  <div class="root">
    <!--搜索框-->
    <div class="search theme box-between">
      <div class="search_left">
        <div class="back_white" @click="goBack"></div>
      </div>
      <div class="search_center box-start">
        <div class="img"/>
        <input type="text" placeholder="请输入商品名" v-model="goods_name" focus="" @focus="focus(true)" @blur="focus(false)">
      </div>
      <div class="search_right box-center">
        <h1 @click="search(true)">搜索</h1>
      </div>
    </div>
    <!--热门搜索-->
    <div class="hot_search" v-if="isShow">
      <h1>热门搜索</h1>
      <h2 v-for="item in hotSearchBeans" @click="hotClick(item.search_name)">{{item.search_name}}</h2>
    </div>
    <!--排序条件-->
    <tab active-color="#ff0000" bar-active-color="#329ff9" class="order_div" v-if="!isShow">
      <tab-item @on-item-click="orderClick('sales')" :selected="isNull(this.$route.params.order_state)">销量</tab-item>
      <tab-item @on-item-click="orderClick('price')" :selected="this.order=='price'?true:false">价格</tab-item>
      <tab-item @on-item-click="orderClick('assessment')" :selected="this.order=='assessment'?true:false">评价</tab-item>
    </tab>
    <!--搜索商品展示-->
    <my-scroller class="content" @scrollBottom="handleScroll('up')" ref="scroller" v-if="!isShow">
      <div class="goods_div">
        <div v-for="goods in goodsBeans" class="goods" @click="goodsClick(goods.goods_id)">
          <div class="goods_left box-center">
            <my-image :initValue="goods.goods_img" options=" width:2rem;height:1.8rem;border-radius:0.1rem;"/>
          </div>
          <div class="goods_center">
            <h1>{{goods.goods_name}}</h1>
            <h2>库存:{{goods.total_sales}}</h2>
            <h3>￥{{goods.goods_now_price}}</h3>
          </div>
          <div class="goods_right">
            <h1>{{goods.total_sales}}人购买</h1>
          </div>
        </div>
      </div>
      </my-scroller>
  </div>
</template>
<script type="text/ecmascript-6">

  export default {
    data(){
      return{
        hotSearchBeans:[],
        goodsBeans:[],
        goods_name:'',
        params:{},
        isShow:true,
        isSearch:false,
        page:1,
        order:'sales',
        isClear:false,
        isOver:false,
      }
    },
    beforeMount(){
      this.post(1,'goodsInterfaces.api?getHotSearchList',{limit:30});
    },
    methods:{
      doSuccess(index,data){
        switch(index){
          case 1:
            this.hotSearchBeans=data;
            break;
          case 2:
            if(this.isClear){
              this.goodsBeans=[];
              this.isClear=false;
              this.$refs.scroller.toTop();
            }
            if(this.isNull(data)){
              this.isOver=true;
            }
            this.goodsBeans=this.goodsBeans.concat(data);
            this.$refs.scroller.pullOver();
            this.isSearch=false;
            break;
        }
      },
      focus(value){
        this.isShow=value;
      },
      search(type){
        if(type){
          this.clear();
        }
        this.params.page=this.page;
        this.params.goods_name=this.goods_name;
        this.params.order=this.order;
        this.post(2,'goodsInterfaces.api?getGoodsList',this.params);
        this.isShow=false;
        this.isSearch=true;
      },
      hotClick(value){
        this.goods_name=value;
        this.clear();
        this.orderClick('sales');
      },
      goBack(){
        this.$router.back();
      },
      orderClick(order){
        this.order=order;
        this.clear();
        this.search(true);
      },
      handleScroll(type){
        if(!this.isSearch){
          if(type=='up'){
            if(!this.isOver){
              this.page++;
              this.isSearch=true;
              this.search(false);
            }
          }else{
            this.clear();
            this.isSearch=true;
            this.search(true);
          }
        }
      },
      goodsClick(goodsId){
        this.$router.push('./goods_detail/'+goodsId);
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
    display: flex;
    flex-flow: column nowrap;
  }
  .search{
    flex-shrink: 0;
    height:1.0rem;
    padding: 0 0.3rem;
    .search_center{
      background: #ffffff;
      height:0.6rem;
      border-radius: 0.3rem;
      flex: 1;
      margin: 0 0.5rem;
      .img{
        background-image: url(../../assets/images/search.png);
        width:0.5rem;
        height:0.5rem;
      }
      input{
        color:#666;
        font-size: 0.3rem;
        line-height: 0.6rem;
        outline: none;
        border: none;
      }
    }
    .search_right{
      height:100%;
      h1{
        width:100%;
        font-size:0.3rem;
        color:#fff;
      }
    }
  }
  .hot_search{
    flex-shrink: 0;
    >h1{
     margin:0.1rem;
    }
    >h2{
      height:0.6rem;
      line-height: 0.6rem;
      display:inline-block;
      margin: 0.1rem;
      border: 1px #329ff9 solid;
      padding:0 0.3rem;
      border-radius: 0.2rem;
    }
  }
  .order_div{
    flex-shrink: 0;
    height:0.9rem;
    text-align: center;
    border-bottom: 1px #ccc solid;
    background: #eeefff;
    >div{
      flex:1;
      font-size:0.28rem;
    }
  }
  .goods_div{
    background: #fff;
    .goods{
      height:2rem;
      display: flex;
      padding:0.1rem 0.1rem;
      border-bottom: 1px #ddd solid;
      .goods_left{
        flex-shrink:0;
        height:100%;
        >img{
          height:100%;
          width:2rem;
        }
      }
      .goods_center{
        margin-left:0.1rem;
        display: flex;
        flex-flow:column nowrap;
        align-content: space-between;
        justify-content: space-between;
        >h1{
          color:#000;
          margin-top:0.1rem;
        }
        >h2{
          color:#666;
          font-size: 0.25rem;
        }
        >h3{
          color:red;
          margin-bottom:0.1rem;
        }
      }
      .goods_right{
        flex-shrink:0;
        flex-grow:1;
        height:100%;
        display: flex;
        flex-flow: column;
        justify-content: flex-end;
        align-items: flex-end;
        margin-right:0.1rem;
        >h1{
          float:right;
          margin-bottom:0.1rem;
        }
      }
    }
  }
</style>
