<template>
  <div class="root box-between-column">
    <top center="全部评价"/>
    <my-scroller class="content" @scrollBottom="handleScroll('up')" ref="scroller">
      <div v-for="assessmentBean in assessmentBeans" class="assessment">
        <div class="top box-between">
          <div class="box-start">
            <my-image :initValue="assessmentBean.member_head_image" options="width:0.6rem;height:0.6rem;border-radius:100%;"/>
            <h1>{{assessmentBean.member_nick_name}}</h1>
          </div>
          <rater :max="5" :value="assessmentBean.assessment_star1" :disabled="true" active-color="#ff5000"></rater>
        </div>
        <div class="assessment_content">
          <h1>{{assessmentBean.assessment_desc}}</h1>
        </div>
        <div class="box-between assessment_center">
          <my-image :initValue="assessmentBean.assessment_img1" v-if="!isNull(assessmentBean.assessment_img1)" options="width:2.2rem;height:2.2rem;border-radius:0.2rem"/>
          <my-image :initValue="assessmentBean.assessment_img2" v-if="!isNull(assessmentBean.assessment_img2)" options="width:2.2rem;height:2.2rem;border-radius:0.2rem"/>
          <my-image :initValue="assessmentBean.assessment_img3" v-if="!isNull(assessmentBean.assessment_img3)" options="width:2.2rem;height:2.2rem;border-radius:0.2rem"/>
        </div>
        <div class="bottom box-start">
          <h1>{{assessmentBean.create_time}}</h1>
        </div>
      </div>
    </my-scroller>
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
              assessmentBeans:[]
            }
        },
        beforeMount() {
          this.getAssessmentList();
        },
        methods: {
            doSuccess(index, data) {
                switch (index) {
                    case 1:
                      if(this.isClear){
                        this.assessmentBeans=[];
                        this.isClear=false;
                        this.$refs.scroller.toTop();
                      }
                      if(this.isNull(data)){
                        this.isOver=true;
                      }
                      this.assessmentBeans=this.assessmentBeans.concat(data);
                      this.$refs.scroller.pullOver();
                      this.isSearch=false;
                        break;
                }
            },
          getAssessmentList(){
            this.isSearch=true;
            this.post(1,'goodsInterfaces.api?getAssessmentList',{
              page:this.page,
              goods_id:this.$route.params.goods_id
            });
          },
          handleScroll(type){
            if(!this.isSearch&&!this.isOver){
              this.page++;
              this.getAssessmentList(false);
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
   .content{
     .assessment{
       background: #fff;
       margin-bottom: 0.2rem;
       .top{
         padding:0.1rem 0.2rem;
        h1{
          margin-left: 0.2rem;
        }
         border-bottom: 1px #ddd solid;
       }
       .assessment_content{
         padding:0.1rem 0.2rem;
        h1{
          font-size: 0.3rem;
        }
       }
       .assessment_center{

        padding:0 0.2rem;
       }
       .bottom{
         padding:0.1rem 0.2rem;
       }
     }

   }
 }
</style>
