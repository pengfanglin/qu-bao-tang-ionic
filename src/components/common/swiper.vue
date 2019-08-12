<template>
  <div class="slider-show" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
    <div class="img_div">
      <a :href="item[href]" v-for="(item,index) in dataSource">
        <img :src="item[src]" class="slider-img" :title="item[title]">
      </a>
    </div>
    <div class="slider-footer">
      <div class="slider_index" v-for="(item,index) in dataSource" @click="changeIndex(index)" :style="nowIndex==index?{background:'#000'}:{background:'#fff'}"></div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  /**
   * 轮播图
   * dataSource:数据源
   * src：图片取值字段
   * href：跳转链接字段
   * title：图片提示文本
   */
  export default {
    props:[
      'dataSource','src','href','title'
    ],
    data(){
      return {
        nowIndex:0,
        isChange:false,
        startX:0,
        startY:0,
        endX:0,
        endY:0
      }
    },
    methods:{
      changeIndex(index) {
        if (index === '<') {
          this.nowIndex = this.nowIndex <= 0 ? this.dataSource.length - 1 : --this.nowIndex;
        } else if (index === '>') {
          this.nowIndex = this.nowIndex >= this.dataSource.length - 1 ? 0 : ++this.nowIndex;
        } else {
          this.nowIndex = index;
        }
        this.isChange=true;
      },
      touchStart(event) {
        let touch = event.targetTouches[0];
        this.startX = touch.pageX;
        event.preventDefault();
      },
      touchMove(event) {
        let touch = event.targetTouches[0];
        this.endX = (this.startX - touch.pageX);
      },
      touchEnd(event) {
        if (this.endX > 10){
          this.nowIndex = this.nowIndex <= 0 ? this.dataSource.length - 1 : --this.nowIndex;
        }else if (this.endX < -10){
          this.nowIndex = this.nowIndex >= this.dataSource.length - 1 ? 0 : ++this.nowIndex;
        }
        this.endX =this.startX = 0;
        this.isChange=true;
      }
    },
    mounted(){
      // setInterval(()=>{
      //   if(!this.isChange){
      //     this.nowIndex=this.nowIndex>=this.dataSource.length-1?0:++this.nowIndex;
      //   }else{
      //     this.isChange=false;
      //   }
      // },1500);
    },
    beforeDestory(){
      this.clearImmediate;
    }
  }
</script>
<style scoped>
  .slider-show{
    position: relative;
    width:375px;
    height:500px;
  }
  .slider-footer{
    position: absolute;
    bottom:0.1rem;
    opacity: 0.6;
    width:100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
  }
  .slider_index{
    width:0.1rem;
    height:0.1rem;
    border-radius: 100%;
    background: #fff;
    margin-left:0.1rem;
  }
  .img_div{
    float:left;
    display: inline;
  }
</style>
