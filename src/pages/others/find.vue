<template>
  <div class="root box-between-column">
    <top center="发现" back="no"/>
    <tab active-color="#ff0000" bar-active-color="#329ff9" class="type_div shrink">
      <tab-item @on-item-click="findTypeClick('')" :selected="find_type==''?true:false">全部</tab-item>
      <tab-item @on-item-click="findTypeClick('image')" :selected="find_type=='image'?true:false">图片</tab-item>
      <tab-item @on-item-click="findTypeClick('video')" :selected="find_type=='video'?true:false">视频</tab-item>
    </tab>
    <my-scroller class="content" @scrollBottom="handleScroll('up')" ref="scroller">
      <div v-for="findBean in findBeans" class="find">
        <div class="top">
          <h1>{{findBean.find_content}}</h1>
        </div>
        <div class="images" v-if="findBean.find_type=='image'">
          <my-image class="image" :initValue="image.resource_url" v-for="image in findBean.findResourceBeans" options="width:2.2rem;height:2.2rem;border-radius:0.2rem;" :key="Math.random()"/>
        </div>
        <div class="videos" v-if="findBean.find_type=='video'">
          <video class="video" controls="controls" v-for="video in findBean.findResourceBeans" :key="Math.random()" :poster="findBean.video_img">
            <source :src="homeUrl+video.resource_url" type="video/mp4" />
            <source :src="homeUrl+video.resource_url" type="video/flv" />
            <source :src="homeUrl+video.resource_url" type="video/avi" />
            <source :src="homeUrl+video.resource_url" type="video/mov" />
            <source :src="homeUrl+video.resource_url" type="video/mkv" />
          </video>
        </div>
        <div class="bottom box-start">
          <h1>{{findBean.create_time}}</h1>
        </div>
      </div>
    </my-scroller>
    <home-bottom></home-bottom>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        isSearch:false,
        page:1,
        isClear:false,
        isOver:false,
        find_type:'',
        findBeans:[]
      }
    },
    beforeMount() {
      this.getFindBeans();
    },
    methods: {
      doSuccess(index, data) {
        switch (index) {
          case 1:
            if(this.isClear){
              this.findBeans=[];
              this.isClear=false;
              this.$refs.scroller.toTop();
            }
            if(this.isNull(data)){
              this.isOver=true;
            }
            this.findBeans=this.findBeans.concat(data);
            this.$refs.scroller.pullOver();
            this.isSearch=false;
            break;
        }
      },
      findTypeClick(type){
        this.find_type=type;
        this.clear();
        this.getFindBeans();
      },
      getFindBeans(){
        this.isSearch=true;
        this.post(1,'merchantsInterfaces.api?getFindList',{find_type:this.find_type,page:this.page});
      },
      handleScroll(type){
        if(!this.isSearch&&!this.isOver){
          this.page++;
          this.getFindBeans(false);
        }
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
    background: #eeefff;
    .type_div{
      height: 0.9rem;
      width:100%;
    }
    .find{
      padding:0.1rem 0.2rem;
      margin-top:0.1rem;
      background: #fff;
      .top{

      }
      .images{
        display: flex;
        flex-flow: row wrap;
        .image{
          margin:0.1rem 0 0 0.15rem;
        }
      }
      .videos{
        .video{
          width:100%;
          height:4rem;
        }
      }
      .bottom{
        padding:0.1rem 0;
        color:#777;
      }
    }
  }
</style>
