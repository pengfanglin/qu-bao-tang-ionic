<template>
  <div class="root box-between-column">
    <top center="我的收藏" @rightClick="isShow=isShow==true?false:true">
      <div class="top_right">{{isShow?'完成':'编辑'}}</div>
    </top>
    <my-scroller class="content" @scrollBottom="handleScroll('up')" ref="scroller">
      <div class="box-start-column">
        <div v-for="collection in collectionBeans" class="goods box-start">
          <div @click="checkCollection(collection.collection_id)" class="box-center" v-if="isShow">
            <check-icon :value="checkCollectionIds.indexOf(collection.collection_id)!=-1?true:false"/>
          </div>
          <div class="goods-left" @click="goodsClick(collection.goods_id)">
            <my-image :initValue="collection.goodsBean.goods_img" options=" width:2rem;height:1.8rem;border-radius:0.1rem;"/>
          </div>
          <div class="goods-center box-between-column">
            <h1>{{collection.goodsBean.goods_name}}</h1>
            <h2>库存:{{collection.goodsBean.goods_stock}}</h2>
            <h3>￥{{collection.goodsBean.goods_now_price}}</h3>
          </div>
          <div class="goods-right box-end-column">
            <h1>{{collection.goodsBean.total_sales}}人购买</h1>
          </div>
        </div>
      </div>
    </my-scroller>
    <div class="bottom box-between shrink" v-if="isShow">
      <div @click="allCheck" class="box-center">
        <check-icon :value="checkCollectionIds.length==collectionBeans.length?true:false">全选</check-icon>
      </div>
      <div class="right theme" @click="deleteCollection">
        <h1>删除</h1>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        isShow: false,
        checkCollectionIds:[],
        isSearch: false,
        page: 1,
        isClear: false,
        isOver: false,
        collectionBeans: []
      }
    },
    beforeMount() {
      this.getCollectionList();
    },
    methods: {
      doSuccess(index, data) {
        switch (index) {
          case 1:
            if (this.isClear) {
              this.collectionBeans = [];
              this.isClear = false;
              this.$refs.scroller.toTop();
            }
            if (this.isNull(data)) {
              this.isOver = true;
            }
            this.collectionBeans = this.collectionBeans.concat(data);
            this.$refs.scroller.pullOver();
            this.isSearch = false;
            break;
          case 2:
            this.showTip('取消收藏成功');
            this.clear();
            this.getCollectionList();
            break;
        }
      },
      deleteCollection(){
        if(this.isNull(this.checkCollectionIds)){
          this.showTip('未选择收藏');
        }else{
          this.post(2,'collectionInterfaces.api?cancelCollection',{
            collection_ids:this.checkCollectionIds.join(',')
          });
        }
        this.isShow=false;
      },
      checkCollection(collectionId){
        if(this.checkCollectionIds.indexOf(collectionId)!=-1){
          this.checkCollectionIds.filter((item)=>{
            return item!=collection_id;
          })
        }else{
          this.checkCollectionIds.push(collectionId);
        }
      },
      goodsClick(goodsId){
        this.$router.push('/goods_detail/'+goodsId);
      },
      allCheck(){
        if(this.checkCollectionIds.length==this.collectionBeans.length){
          this.checkCollectionIds=[];
        }else{
          this.collectionBeans.forEach((item)=>{
            if(this.checkCollectionIds.indexOf(item.collection_id)==-1){
              this.checkCollectionIds.push(item.collection_id);
            }
          })
        }
      },
      getCollectionList() {
        this.isSearch = true;
        this.post(1, 'collectionInterfaces.api?getCollectionList', {page: this.page});
      },
      handleScroll(type) {
        if (!this.isSearch && !this.isOver) {
          this.page++;
          this.getCollectionList(false);
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
    .top_right {
      color: #fff;
    }
    .content {
      .goods {
        background: #fff;
        padding: 0.1rem 0.2rem;
        height: 2rem;
        margin-bottom: 0.1rem;
        > div {
          height: 100%;
        }
        .goods-left {
          margin:0 0.2rem;
        }
        .goods-center {
          flex: 1;
          padding:0.1rem 0;
          h2{
            color:#777;
          }
          h3{
            color:red;
          }
        }
        .goods-right {
          h1{
            color:#777;
          }
        }
      }
    }
    .bottom{
      height:1rem;
      background: #fff;
      .right{
        line-height: 1rem;
        text-align: center;
        width:2rem;
        height:100%;
        color:#fff;
      }
    }
  }
</style>
