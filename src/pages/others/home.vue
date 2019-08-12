<template>
  <div class="home_content">
    <div class="search theme width-all">
      <div class="search_div box-start" @click="goSearch">
        <img :src="require('../../assets/images/search.png')">
        <h1>请输入商品名</h1>
      </div>
    </div>
    <div class="content">
      <!--推荐分类-->
      <div class="recommend_class">
        <div class="recommend_class_child">
          <div class="class" @click="classClick(0)">
            <img :src="require('../../assets/images/all_class.png')">
            <div>全部分类</div>
          </div>
        </div>
        <div class="recommend_class_child" v-for="(recommendClass,index) in recommendClassBeans">
          <div class="class" @click="classClick(recommendClass.class_id,index)">
            <img :src="homeUrl+recommendClass.class_img">
            <div>{{recommendClass.class_name}}</div>
          </div>
        </div>
      </div>
      <!--推荐商品-->
      <div class="recommend box-center">
        <div class="img"/>
      </div>
      <div class="recommend_goods">
        <div class="goods box-between-column" v-for="goodsBean in goodsBeans" @click="goodsClick(goodsBean.goods_id)">
          <my-image :initValue="goodsBean.goods_img" options="width:100%;height:45vw;border-radius:0.2rem;"/>
          <div class="center">
            <h1>{{goodsBean.goods_name}}</h1>
          </div>
          <div class="bottom box-between">
            <h1>￥{{goodsBean.goods_min_price}}</h1>
            <h2>{{goodsBean.total_sales}}人付款</h2>
          </div>
        </div>
      </div>
    </div>
    <home-bottom/>
  </div>
</template>
<script type="text/ecmascript-6">

  export default {
    data() {
      return {
        bannerBeans: [],
        recommendClassBeans: [],
        goodsBeans: []
      }
    },
    beforeMount() {
      this.post(1, 'settingInterfaces.api?getBannerList', {banner_position: 'app_home'});
      this.post(2, 'homeInterfaces.api?getRecommendClassList', {limit: 9});
      this.post(3, 'homeInterfaces.api?getRecommendGoodsList', {limit: 6});
    },
    methods: {
      doSuccess(index, data) {
        switch (index) {
          case 1:
            this.bannerBeans = data;
            break;
          case 2:
            this.recommendClassBeans = data;
            break;
          case 3:
            this.goodsBeans = data;
            break;
        }
      },
      classClick(classId, index) {
        this.$router.push('/goods_class/' + classId);
      },
      goodsClick(goodsId) {
        this.$router.push('/goods_detail/' + goodsId);
      },
      sliderClick(index) {
        let bannerType = this.bannerBeans[index].banner_type;
        if (bannerType == 'goods') {
          this.$router.push('./goods_detail/' + this.bannerBeans[index].goods_id);
        } else {
          this.$router.push('/web_view/' + encodeURIComponent(this.bannerBeans[index].banner_url));
        }
      },
      goSearch() {
        this.$router.push('/goods_search');
      }
    }
  }
</script>
<style lang="less" scoped>
  .home_content {
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
  }

  .search {
    flex-shrink: 0;
    height: 1rem;
    display: flex;

    .search_div {
      background: #ffffff;
      height: 0.6rem;
      width: 80%;
      margin: auto auto;
      border-radius: 0.3rem;
      display: flex;

      > img {
        width: 0.5rem;
        height: 0.5rem;
      }

      h1 {
        color: #aaa;
        font-size: 0.3rem;
      }
    }
  }

  .content {
    overflow-y: auto;
    height: 100%;
    background: #eee;
  }

  .recommend_class {
    display: flex;
    flex-flow: row wrap;
    padding: 0.1rem 0;
    background: #eeefff;
  }

  .recommend_class_child {
    width: 20%;
    text-align: center;

    .class {
      img {
        border-radius: 100%;
        width: 80%;
        height: 1.2rem;
      }

      div {
        text-align: center;
        font-size: 0.28rem;
      }
    }
  }

  .recommend {
    width: 100%;
    height: 1rem;
    background: #fff;

    div {
      width: 50%;
      height: 100%;
      background-image: url(../../assets/images/hot_sales.png);
    }
  }

  .recommend_goods {
    background: #eeefff;
    padding: 0 0.1rem;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;

    .goods:nth-child(1), .goods:nth-child(2) {
      margin-top: 0;
    }

    .goods {
      border: 1px #ccc solid;
      border-radius: 0.1rem;
      width: 49%;
      background: #fff;
      margin-top: 0.15rem;

      .center {
        padding: 0.05rem 0.1rem;

        h1 {
          overflow: hidden;
          text-overflow: clip;
          white-space: nowrap;
          width: 100%;
        }
      }

      .bottom {
        padding: 0.1rem 0.1rem;

        h1 {
          color: red;
          font-size: 0.25rem;
        }

        h2 {
          color: #777;
          font-size: 0.25rem;
        }
      }
    }
  }
</style>
