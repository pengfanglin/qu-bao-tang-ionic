<template>
  <div class="bottom_root box-center">
    <div class="bottom_child box-center-column" ref="childDiv" @click="bottomClick(index,item.url)" v-for="(item,index) in bottom">
      <div :style="'background-image:'+item.src" ref="bottomImg" class="img"/>
      <div class="title">{{item.title}}</div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data(){
      return{
        bottom: [],
        nowUrl:''
      }
    },
    beforeMount(){
      this.bottom = [
        {title: '首页', src: require('../../assets/images/home.png'), hover: require('../../assets/images/home_hover.png'), url: '/home'},
        {title: '购物车', src: require('../../assets/images/shop_car.png'), hover: require('../../assets/images/shop_car_hover.png'), url: '/shop_car'},
        {title: '订单', src: require('../../assets/images/order.png'), hover: require('../../assets/images/order_hover.png'), url: '/order'},
        {title: '发现', src: require('../../assets/images/find.png'), hover: require('../../assets/images/find_hover.png'), url: '/find'},
        {title: '我的', src: require('../../assets/images/my.png'), hover: require('../../assets/images/my_hover.png'), url: '/my'}
      ]
      this.nowUrl=this.$route.path;
    },
    mounted(){
      this.$refs.bottomImg[0].style.backgroundImage=this.bottom[0].hover;
    },
    methods:{
      bottomClick(index,url) {
        if(index==0||index==4){
          this.$router.replace(url);
        }else{
          this.$router.push(url);
        }
      }
    },
    watch:{
      nowUrl(){
        this.bottom.forEach((item, index) => {
          this.$refs.bottomImg[index].style.backgroundImage = this.nowUrl == item.url ? 'url('+item.hover+')' : 'url('+item.src+')';
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .bottom_root {
    width:100%;
    flex-shrink: 0;
    background: #eeefff;
    height:1.1rem;
    .bottom_child {
      height:100%;
      flex: 1;
      .img {
        width: 0.5rem;
        height: 0.5rem;
      }
      .title{
        font-size:0.3rem;
      }
    }
  }
</style>
