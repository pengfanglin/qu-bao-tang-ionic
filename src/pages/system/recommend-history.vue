<template>
  <div class="root">
    <bread title="推荐记录"/>
    <div class="search_content">
      <my-select
          title="推荐企业" :dataSource="searchData.recommendCompany" selectValue="id"
          showValue="name" initValue="" v-model="params.recommendCompanyId" :filterable="true"/>
      <my-select
          title="用户" :dataSource="searchData.user" selectValue="id"
          showValue="name" initValue="" v-model="params.userId" :filterable="true"/>
      <my-select
          title="企业" :dataSource="searchData.company" selectValue="id"
          showValue="name" initValue="" v-model="params.companyId" :filterable="true"/>
    </div>
    <toolbar :toolData="toolData" @toolClick="toolClick"/>
    <list v-bind="$data" @goPage="goPage" @sizeChange="sizeChange"/>
  </div>
</template>
<script type="text/ecmascript-6">
  import {list} from '../../common'
  export default {
    mixins: [list],
    data() {
      return {
        searchData: {
          company: [],
          recommendCompany: [],
          user: []
        },
        toolData: [{name: '搜索'},{name:'导出'}]
      }
    },
    created() {
      this.getData(1);
      this.post(2, 'system/recommendAllSearchData');
      this.baseData = [
        {key: 'id', name: 'ID'},
        {key: 'userName', name: '用户名称'},
        {key: 'recommendCompanyName', name: '推荐企业名称'},
        {key: 'companyName', name: '企业名称'},
        {key: 'createTime', name: '推荐时间'}
      ];
    },
    methods: {
      getData(page) {
        this.params.page = page ? page : this.params.page;
        this.loading();
        this.post(1, 'system/recommendHistoryList', this.params, true);
      },
      doSuccess(index, data) {
        switch (index) {
          case 1:
            this.dataSource = data.data;
            this.total = data.total;
            break;
          case 2:
            this.searchData = data;
            break;
        }
      },
      toolClick(index) {
        switch (index) {
          case 0:
            this.getData(1);
            break;
          case 1:
            this.postStream(3,'system/exportRecommendHistoryExcel',this.params);
            break;
        }
      }
    }
  }
</script>
<style scoped>

</style>
