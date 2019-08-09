<template>
  <div class="root">
    <bread title="岗位列表" />
    <div class="search_content">
      <my-input title="岗位名称" v-model="params.postName" />
      <my-input title="企业名称" v-model="params.companyName" />
      <my-select title="类别" :dataSource="typeList" v-model="params.type" @onChange="getData(0)" />
      <my-select title="状态" :dataSource="stateList" v-model="params.state" @onChange="getData(0)" />
    </div>
    <toolbar :toolData="toolData" @toolClick="toolClick" />
    <list
      v-bind="$data"
      @goPage="goPage"
      @sizeChange="sizeChange"
      @operationClick="operationClick"
    />
  </div>
</template>
<script type="text/ecmascript-6">
import { list } from "../../common";

export default {
  mixins: [list],
  data() {
    return {
      toolData: [{ name: "搜索" }],
      baseData: [],
      stateList: [],
      typeList: []
    };
  },
  created() {
    this.baseData = [
      { key: "postName", name: "岗位名称", width: "100px" },
      { key: "posttype", name: "岗位类别", width: "80px" },
      { key: "companyName", name: "企业名称" },
      { key: "userName", name: "招聘人" },
      { key: "mobile", name: "申请人号码", width: "95px" },
      { key: "money", name: "薪资/结算", width: "95px" },
      { key: "workContent", name: "工作内容", type: "tooltip" },
      {
        key: "workLocation",
        name: "工作地址",
        type: "workLocation"
      },
      { key: "stateShow", name: "状态" },
      { key: "gmtCreate", name: "发布时间" },
      {
        name: "操作",
        type: "operation",
        data: [
          {
            name: "下架",
            type: "confirm",
            color: "danger",
            message: "确定下架该岗位?"
          },
          {
            name: "永久下架",
            type: "confirm",
            color: "danger",
            message: "确定下架该岗位?"
          },
          {
            name: "上架",
            type: "confirm",
            color: "success",
            message: "确定上架该岗位?"
          }
        ]
      }
    ];
    this.typeList = [
      {
        label: "全部",
        value: ""
      },
      {
        label: "兼职",
        value: "0"
      },
      {
        label: "全职",
        value: "1"
      }
    ];
    this.stateList = [
      {
        label: "全部",
        value: ""
      },
      {
        label: "上架",
        value: "0"
      },
      {
        label: "下架",
        value: "1"
      },
      {
        label: "未付款",
        value: "2"
      },
      {
        label: "平台下架",
        value: "3"
      },
      {
        label: "永久下架",
        value: "4"
      },
      {
        label: "待审核",
        value: "5"
      },
      {
        label: "上架申请拒绝",
        value: "6"
      }
    ];
    this.getData(1);
  },
  methods: {
    getData(page) {
      this.params.page = page ? page : this.params.page;
      this.loading();
      this.post(this.api.getPostList, this.params, data => {
        data.data.forEach(item => {
          let status;
          switch (item.state) {
            case "0":
              status = "上架";
              break;
            case "1":
              status = "下架";
              break;
            case "2":
              status = "未付款";
              break;
            case "3":
              status = "平台下架";
              break;
            case "4":
              status = "永久下架";
              break;
            case "5":
              status = "待审核";
              break;
            case "6":
              status = "上架申请拒绝";
              break;
            default:
              status = "未知";
          }
          item.stateShow = status;
          //薪资结算
          let unit;
          switch (item.basicInfoModel.settlementMethod) {
            case "0":
              unit = "天";
              break;
            case "1":
              unit = "周";
              break;
            case "2":
              unit = "月";
              break;
            case "3":
              unit = "次";
              break;
            default:
              unit = "";
          }
          item.posttype = item.basicInfoModel.type === 0 ? "兼职" : "全职";
          item.money = item.basicInfoModel.salary + "元/" + unit;
          item.postName = item.basicInfoModel.name;
          item.workContent = item.basicInfoModel.workContent;
        });
        console.log(data.data);
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
      let post = this.dataSource[rowId];
      switch (index) {
        case 0:
          this.post(
            this.api.soldOutPost,
            {
              id: post.id,
              refuseNote: ""
            },
            () => {
              this.$message.success("下架成功");
              this.getData();
            }
          );
          break;
        case 1:
          this.post(
            this.api.permanentSoldOutPost,
            {
              id: post.id,
              refuseNote: ""
            },
            () => {
              this.$message.success("下架成功");
              this.getData();
            }
          );
          break;
        case 2:
          this.post(
            this.api.putawayPost,
            {
              id: post.id
            },
            () => {
              this.$message.success("上架成功");
              this.getData();
            }
          );
          break;
      }
    }
  }
};
</script>
<style scoped lang="less">
</style>
