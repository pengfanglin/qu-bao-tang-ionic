<template>
  <div>
    <div class="image-content">
      <div class="image-child" v-for="src in images" v-if="!isNull(src)">
        <img  :src="buildSrc(src)" :style="options" @error="imgError"/>
      </div>
      <div class="image-child" @click="beginUp" v-if="images.length<max&&onlyShow==false">
        <div :style="options" class="up-img">
          <div class="img"/>
        </div>
        <input type="file" name="file" ref="fileInput" @change="uploadImage" multiple="multiple" accept="image/*">
      </div>
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
        type:String,
        default:''
      },
      filed:{
        type:String,
        default:''
      },
      options:{
        type:String,
        default:'width:1.7rem;height:1.7rem;border-radius:0.1rem;'
      },
      max:{
        type:Number,
        default:3
      },
      onlyShow:{
        type:Boolean,
        default:false
      }
    },
  data(){
    return{
      images:!this.isNull(this.initValue)?this.initValue.split(','):[]
    }
  },
  watch:{
    initValue(){
      this.images=!this.isNull(this.initValue)?this.initValue.split(','):[];
    }
  },
  methods:{
    uploadImage(e) {
      let formData = new FormData();
      formData.append("path", this.isNull(this.path)?'':this.path);
      for(let i=0;i<e.target.files.length;i++){
        if(e.target.value.indexOf('.jpg')>-1||e.target.value.indexOf('.jpeg')>-1||e.target.value.indexOf('.png')>-1||e.target.value.indexOf('.gif')>-1){
          this.photoCompress(e.target.files[i], {
              quality: 0.2
            },(base64Codes)=>{
              formData.append(e.target.name, base64Codes,e.target.value);
              this.ajaxFileUpload(1, formData);
            }
          )
        }else{
          formData.append(e.target.name, e.target.files[i],e.target.value);
          this.ajaxFileUpload(1, formData);
        }
      }

    },
    doSuccess(index, data) {
      this.images=this.images.concat(data);
      this.$emit('change',this.filed,this.images.join(','));
    },
    doFailed(index, error) {
      this.showTip(error);
    },
    imgError(e){
      e.target.src=require("../../assets/images/common/404.png");
    },
    beginUp(){
      this.$refs.fileInput.click();
    },
    removeImg(id){
      let temp=[];
      this.images.forEach((item,index)=>{
        if(index!=id){
          temp.push(item);
        }
      });
      this.images=temp;
    },
    buildSrc(src){
      if(src.indexOf('.jpg')==-1&&src.indexOf('.png')==-1&&src.indexOf('.jpeg')==-1&&src.indexOf('.gif')==-1){
        return require('../../assets/images/file_default_img.jpg')
      }else{
        return this.homeUrl+src;
      }
    }
  }
}
</script>
<style scoped lang="less">
  .image-content{
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: flex-start;
  }
  .image-child{
    margin:0.1rem 0 0 0.1rem;
    img{

    }
    .up-img{
      background: #eeefff;
      border: 1px #777 dashed;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: center;
      .img{
        background-image: url("../../assets/images/up.png");
        width:50%;
        height:40%;
      }
    }
  }
  input{
    display: none;
  }
</style>
