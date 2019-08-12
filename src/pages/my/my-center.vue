<template>
  <div class="root">
    <div class="top box-between width-all">
      <div class="left icon" @click="showSetting"/>
      <div class="center">个人中心</div>
      <div class="right icon" @click="messageClick"/>
    </div>
    <div class="content">
      <div class="head_div img box-center">
        <div>
          <my-image path="/images/member" filed="member_head_img" :disable="false" :errorImg="errorImg"
                    :initValue="memberBean.member_head_image" options="border-radius:100%;width:1.5rem;height:1.5rem;"
                    @change="memberHeadChange"/>
          <div class="nick_name">{{memberBean.member_nick_name}}</div>
          <div class="sign" :class="memberBean.is_sign==1?'black':'theme'" @click="memberSign">签到</div>
        </div>
      </div>
      <div class="my-order box-center">
        <div class="box-center-column" v-for="item in orderImages" @click="orderClick(item.url)">
          <img class="img" :src="item.icon"/>
          <h1 class="text">{{item.title}}</h1>
        </div>
      </div>
      <div>
        <group>
          <cell :title="cell.title" :is-link="true" :link="cell.url" :border-intent="false" class="cell" v-for="cell in cellData" :key="Math.random()">
            <img slot="icon" :src="cell.icon"/>
          </cell>
          <cell title="联系客服" :border-intent="false" class="cell">
            <img slot="icon" :src="require('../../assets/images/icon_customer.png')"/>
            <a href="tel:15639038767">
              <h1 style="color:#777;">15639038767</h1>
            </a>
          </cell>
        </group>
      </div>
    </div>
    <home-bottom/>
  </div>
</template>
<script type="text/ecmascript-6">

  export default {
    data() {
      return {
        memberBean: {},
        errorImg: require('../../assets/images/default_head.png'),
        orderImages: [],
        cellData:[]
      }
    },
    beforeMount() {
      this.orderImages = [
        {title: '全部', icon: require('../../assets/images/all_order.png'), number: 0, url: '/order'},
        {title: '待付款', icon: require('../../assets/images/wait_pay.png'), number: 0, url: '/order/wait_pay'},
        {title: '待发货', icon: require('../../assets/images/wait_send.png'), number: 0, url: '/order/wait_send'},
        {title: '待收货', icon: require('../../assets/images/wait_receive.png'), number: 0, url: '/order/wait_receive'},
        {
          title: '待评价',
          icon: require('../../assets/images/wait_assessment.png'),
          number: 0,
          url: '/order/wait_assessment'
        },
      ]
      this.cellData=[
        {title:'我的钱包',icon:require('../../assets/images/icon_wallet.png'),url:'/my_wallet'},
        {title:'我的售后',icon:require('../../assets/images/icon_refund.png'),url:'/my_refund'},
        // {title:'银行卡',icon:require('../../assets/images/icon_bank.png'),url:'/my_bank'},
        {title:'收货地址',icon:require('../../assets/images/icon_address.png'),url:'/goods_address'},
        {title:'我的收藏',icon:require('../../assets/images/icon_collection.png'),url:'/my_collection'},
        // {title:'签到足迹',icon:require('../../assets/images/icon_sign.png'),url:'/sign'},
        {title:'我的积分',icon:require('../../assets/images/icon_integral.png'),url:'/integral'}
      ]
      this.post(1, 'memberInterfaces.api?getMemberDetail');
    },
    methods: {
      doSuccess(index, data) {
        switch (index) {
          case 1:
            this.memberBean = data;
            break;
          case 2:
            this.showTip('修改成功');
            break;
          case 3:
            this.showTip('获得'+data+'积分');
            this.memberBean.is_sign=1;
            break;
        }
      },
      showSetting(){
        this.$router.push('/setting');
      },
      orderClick(url) {
        this.$router.push(url);
      },
      memberHeadChange(key, value) {
        this.post(2, 'memberInterfaces.api?updateMemberDetail', {member_head_image: value});
      },
      memberSign(){
        if(this.memberBean.is_sign==1){
          this.showTip('今日已签到');
        }else{
          this.post(3,'signInterfaces.api?insertSign');
        }
      },
      messageClick(){
        this.$router.push('/message');
      }
    }
  }
</script>
<style lang="less" scoped>
  .root {
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    .top {
      background-image: -webkit-gradient(linear, 0% 0%, 0% 90%, from(rgba(29, 98, 240, 0.8)), to(rgba(25, 213, 253, 0.9)));
      height: 1rem;
      padding: 0 0.2rem;
      .left {
        background-image: url(../../assets/images/setting.png);
      }
      .center {
        color: #fff;
        font-size: 0.3rem;
      }
      .right {
        background-image: url(../../assets/images/message.png);
      }
    }
    .content {
      height: 100%;
      overflow-y: auto;
      .head_div {
        background-image: url(../../assets/images/center_top.jpg);
        height: 3rem;
        > div {
          img {
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 100%;
          }
          .nick_name{
            font-size:0.3rem;
            color:#fff;
            text-align: center;
            margin:0.1rem 0;
          }
          .sign{
            color:#fff;
            font-size:0.3rem;
            text-align: center;
            border-radius: 0.2rem;
            padding:0.1rem 0;
          }
        }
      }
      .my-order {
        height: 1.2rem;
        border-top: 1px #eee solid;
        border-bottom: 1px #eee solid;
        > div {
          flex: 1;
          .img {
            width: 0.5rem;
            height: 0.5rem;
          }
          h1 {
            font-size: 0.25rem;
          }
        }
      }
    }
  }
  .cell {
    height: 1rem;
    padding: 0 0.2rem;
    img {
      width: 0.6rem;
      height: 0.6rem;
      margin-right: 0.1rem;
    }
  }
  .black{
    background:#888;
  }
</style>
