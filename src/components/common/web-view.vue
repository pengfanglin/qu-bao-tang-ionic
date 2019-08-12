<template>
  <div class="root box-between-column width-all">
    <top :center="showTitle" v-if="isShow"/>
    <iframe :src="chain?loadUrl:homeUrl+loadUrl"  class="frame" width="100%" height="100%" scrolling="yes" frameborder="0"></iframe>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      show: {
        type: Boolean,
        default: true
      },
      url: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        content: '',
        loadUrl:this.url,
        showTitle:this.title,
        isShow:this.show,
        chain:false
      }
    },
    beforeMount(){
      if(!this.isNull(this.$route.params.url)){
        this.loadUrl=decodeURIComponent(this.$route.params.url);
      }
      if(!this.isNull(this.$route.params.title)){
        this.showTitle=this.$route.params.title;
      }
      if(!this.isNull(this.$route.params.show)){
        this.isShow=this.$route.params.show;
      }
    },
    watch:{
      loadUrl(){
        if(!this.isNull(this.loadUrl)){
          if(this.loadUrl.indexOf('http')!=-1||this.loadUrl.indexOf('https')!=-1||this.loadUrl.indexOf('www')!=-1){
            this.isShow=true;
            this.chain=true;
          }
        }
      },
      url(){
        this.loadUrl=decodeURIComponent(this.url);
      }
    }
  }
</script>
<style lang="less" scoped>
.root{
  height:100%;
}
</style>
