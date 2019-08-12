<template>
  <div class="image-root" :style="options">
    <div class="image-content">
      <img :src="src" @click="beginUp" @error="imgError" :style="options">
      <input type="file" name="file" :accept="isNull(type)||type=='image'?'image/png,image/jpg,image/jpeg,image/gif':''" ref="fileInput" @change="uploadImage" >
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  /**
   * 图片组件（只支持单张上传）
   * initValue:初始值
   * path：图片上传后保存路径，后台代码默认为：/images/others
   * title：组件左侧文本
   * disable:为true时禁用组件
   * filed:所属表单字段名
   * options:json格式，自定义组件宽度高度，默认：{'width':'200px','height':'60px'}
   * hide:为true时隐藏组件
   * type: 文件选择器类型  image:图片，其他全为文件
   */
  export default {
    props:{
      initValue:{
        type:String,
        default:''
      },
      path:{
        type:String
      },
      filed:{
        type:String,
        default:''
      },
      options:{
        type:String,
        default:''
      },
      hide:{
        type:Boolean,
        default:false
      },
      disable:{
        type:Boolean,
        default:true
      },
      type:{
        type:String,
        default:'image'
      }
    },
  data(){
    return{
      src:!this.isNull(this.initValue)?this.homeUrl+this.initValue:this.errorImg
    }
  },
  watch:{
    initValue(){
      this.src=!this.isNull(this.initValue)?this.homeUrl+this.initValue:this.errorImg;
    }
  },
  methods:{
    uploadImage(e) {
      let formData = new FormData();
      formData.append(e.target.value, e.target.files[0]);
      formData.append("path", this.isNull(this.path)?'':this.path);
      if(e.target.value.indexOf('.jpg')>-1||e.target.value.indexOf('.jpeg')>-1||e.target.value.indexOf('.png')>-1||e.target.value.indexOf('.gif')>-1){
        this.photoCompress(e.target.files[0], {
            quality: 0.2
          },(base64Codes)=>{
            formData.append(e.target.name, base64Codes,e.target.value);
          this.ajaxFileUpload(1, formData);
          }
        )
      }else{
        formData.append(e.target.name, e.target.files[0],e.target.value);
        this.ajaxFileUpload(1, formData);
      }
    },
    doSuccess(index, data) {
      this.src=this.homeUrl+data[0];
      this.$emit('change',this.filed,data[0]);
    },
    doFailed(index, error) {
      this.showTip(error);
    },
    imgError(e){
      e.target.src=require("../../assets/images/common/404.png");
    },
    beginUp(){
      this.$emit('click');
      if(!this.disable){
        this.$refs.fileInput.click();
      }
    }
  }
}
</script>
<style scoped>
  .image-content>img{

  }
  input{
    display: none;
  }
</style>
