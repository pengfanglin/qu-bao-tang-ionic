<template>
  <div class="root box-between-column">
    <div ref="top">
      <top center="商品分类"/>
    </div>
    <div class="content box-between">
      <div class="left box-start-column" ref="left">
        <div v-for="(goodsClassBean,index) in goodsClassBeans" ref="parentClass" :class="index==selectIndex?'select':''" class="parent shrink box-center" @click="selectIndex=index">
          <h1>{{goodsClassBean.class_name}}</h1>
        </div>
      </div>
      <div class="right">
        <div class="childs">
          <div v-for="goodsClassBean in childClassBeans" class="child box-between-column shrink" @click="childClassClick(goodsClassBean)">
            <div class="top box-center">
              <my-image :initValue="goodsClassBean.class_img" options="width:2rem;height:2rem;border-radius:0.2rem;"/>
            </div>
            <div class="center">{{goodsClassBean.class_name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        selectIndex:-1,
        goodsClassBeans:[],
        childClassBeans:[]
      }
    },
    beforeMount() {
      this.post(1,'goodsInterfaces.api?getGoodsClassListCache');
    },
    methods: {
      doSuccess(index, data) {
        switch (index) {
          case 1:
            this.goodsClassBeans=data;
            data.forEach((item,index)=>{
              if(item.class_id==this.$route.params.class_id){
                this.selectIndex=index;
                this.childClassBeans=item.goodsClassBeans;
              }
            });
            if(this.$route.params.class_id==0){
              this.selectIndex=0;
            }
            break;
        }
      },
      childClassClick(goodsClassBean){
        this.$router.push('/goods_by_class/'+goodsClassBean.class_id+'/'+goodsClassBean.class_name);
      }
    },
    watch:{
      selectIndex(){
        this.$nextTick(function(){
          let top=this.$refs.parentClass[this.selectIndex].getBoundingClientRect().top+this.$refs.top.clientHeight;
          let scrollHeight=this.$refs.left.clientHeight;
          while(top>scrollHeight){
            top-=10;
            this.$refs.left.scrollTop+=10;
          }
        })
        this.childClassBeans=this.goodsClassBeans[this.selectIndex].goodsClassBeans;
      }
    }
  }
</script>
<style lang="less" scoped>
.root{
  height:100%;
  background: #fff;
  .content{
    height:100%;
    .left{
      background: #329ff9;
      height:100%;
      overflow-y: auto;
      width:25%;
      .parent{
        .select_slider{
          background: red;
          width:0.1rem;
        }
        h1{
          margin:0.15rem 0;
          color:#fff;
          font-size: 0.35rem;
        }
      }
      .select{
        border-left: 0.1rem red solid;
        background: #fff;
        h1{
          color:red;
        }
      }
    }
    .right{
      width:75%;
      height:100%;
      background: #eeefff;
      overflow-y: auto;
      .childs{
        display: flex;
        flex-flow: row wrap;
        align-items: flex-start;
        .child{
          width:50%;
          margin-top:0.2rem;
          padding:0 0.1rem;
          .center{
            margin-top:0.1rem;
          }
        }
      }
    }
  }
}
</style>
