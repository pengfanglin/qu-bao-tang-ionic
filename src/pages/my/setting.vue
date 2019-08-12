<template>
  <div class="root box-between-column">
    <top center="设置"/>
    <div class="content">
      <group>
        <cell title="个人资料" :border-intent="false" class="cell" :is-link="true" link="/my_info"/>
        <cell title="相关协议" :border-intent="false" class="cell" :is-link="true"
              :link="'/web_view/'+encodeURIComponent(agreement)+'/相关协议'"/>
        <cell title="关于我们" :border-intent="false" class="cell" :is-link="true"
              :link="'/web_view/'+encodeURIComponent(about_our)+'/关于我们'"/>
      </group>
    </div>
    <div class="bottom box-center shrink theme" @click="exit">
      <h1>退出登录</h1>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        agreement: '',
        about_our: ''
      }
    },
    beforeMount() {
      this.post(1, 'settingInterfaces.api?getHtmlDetail', {html_name: '相关协议'});
      this.post(2, 'settingInterfaces.api?getHtmlDetail', {html_name: '关于我们'});
    },
    methods: {
      doSuccess(index, data) {
        switch (index) {
          case 1:
            this.agreement = data.html_url;
            break;
          case 2:
            this.about_our = data.html_url;
            break;
        }
      },
      exit() {
        localStorage.memberBean=JSON.stringify({});
        this.$router.replace('/home');
      }
    }
  }
</script>
<style lang="less" scoped>
  .root {
    height: 100%;
    background: #eeefff;
    .content {
      height: 100%;
      .cell {
        background: #fff;
        height: 1rem;
        padding: 0 0.2rem;
      }
    }
    .bottom {
      height: 1rem;
      h1 {
        color: #fff;
        font-size: 0.3rem;
      }
    }
  }
</style>
