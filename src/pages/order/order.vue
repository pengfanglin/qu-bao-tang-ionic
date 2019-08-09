<template>
  <div class="root">
    <bread title="订单列表"/>
    <div class="search_content">
      <my-input title="付款人姓名" v-model="params.username"/>
      <my-input title="手机号" v-model="params.mobile"/>
      <my-date title="开始时间" v-model="params.startTime"/>
      <my-date title="结束时间" v-model="params.endTime"/>
      <my-select title="状态" :dataSource="stateList" v-model="params.status" @onChange="getData(0)"/>
    </div>
    <toolbar :toolData="toolData" @toolClick="toolClick"/>
    <list v-bind="$data" @goPage="goPage" @sizeChange="sizeChange" @operationClick="operationClick"/>
  </div>
</template>
<script type="text/ecmascript-6">
  import {list} from '../../common'
  export default {
    mixins: [list],
    data() {
      return {
        toolData: [{name: '搜索'}],
        baseData: [],
        stateList: [],
        params:{
          status:'payOver'
        }
      }
    },
    created() {
      this.baseData = [
        {key: 'companyName', name: '企业名称'},
        {key: 'username', name: '付款人'},
        {key: 'mobile', name: '付款人手机号'},
        {key: 'utcCreated', name: '付款时间'},
        {key: 'skuName', name: '订单名称'},
        {key: 'amount', name: '订单金额'},
        {key: 'startTime', name: '入驻时间'},
        {key: 'endTime', name: '审核时间'},
        {key: 'statusShow', name: '状态'}
      ];
      this.stateList = [
        {
          label: '全部',
          value: ''
        },
        {
          label: '待付款',
          value: 'wait_pay'
        },
        {
          label: '已付款',
          value: 'payOver'
        }
      ];
      this.getData(1);
    },
    methods: {
      getData(page) {
        this.params.page = page ? page : this.params.page;
        this.loading();
        this.post(this.api.getAdminOrderList, this.params, (data) => {
          data.data.forEach(item => {
            let statusShow;
            switch (item.status) {
              case "wait_pay":
                statusShow = '待付款';
                break;
              case "payOver":
                statusShow = '已付款';
                break;
              default:
                statusShow = '未知';
                break;
            }
            item.statusShow = statusShow;
          });
          this.dataSource = data.data;
          this.total = data.total;
        });
      },
      toolClick(index) {
        switch (index) {
          case 0:
            this.getData(1);
            break;
        }
      },
      operationClick(index, rowId) {

      }
    }
  }
</script>
<style scoped lang="less">

</style>
