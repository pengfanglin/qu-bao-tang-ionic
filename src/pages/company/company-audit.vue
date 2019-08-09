<template>
  <div class="root">
    <bread title="审核企业" />
    <div class="search_content">
      <my-input title="企业名称" v-model="params.companyName" />
      <my-select
        title="状态"
        :dataSource="statusList"
        initValue
        v-model="params.status"
        @onChange="statusChange"
      />
    </div>
    <toolbar :toolData="toolData" @toolClick="toolClick" />
    <list
      v-bind="$data"
      @goPage="goPage"
      @sizeChange="sizeChange"
      @operationClick="operationClick"
    />
    <el-dialog title="企业详情" :visible.sync="showCompany" width="30%">
      <div>
        <span class="box_start">
          <h1>企业全称&nbsp;:&nbsp;&nbsp;</h1>
          <h1>{{company.companyName}}</h1>
        </span>
        <span class="box_start dialog_item">
          <h1>企业简称&nbsp;:&nbsp;&nbsp;</h1>
          <h1>{{company.simpleName}}</h1>
        </span>
        <span class="box_start dialog_item">
          <h1>营业执照&nbsp;:&nbsp;&nbsp;</h1>
          <viewer rotatable :images="[imgUrl+company.licenseUrl]">
            <img :src="imgUrl+company.licenseUrl" width="50" height="50px" />
          </viewer>
        </span>
        <span class="box_start dialog_item" v-if="showCompanyType==='audit'">
          <h1>是否通过&nbsp;:&nbsp;&nbsp;</h1>
          <el-select v-model="auditStatus" :clearable="true" size="small">
            <el-option
              v-for="(item,index) in auditStatusList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </span>
        <span class="box_start dialog_item" v-if="showCompanyType==='audit'&&auditStatus==='0'">
          <h1>拒绝原因&nbsp;:&nbsp;&nbsp;</h1>
          <el-select v-model="refuseReason" :clearable="true" placeholder="请选择拒绝原因" size="small">
            <el-option
              v-for="(item,index) in refuseReasonList"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showCompany = false">取 消</el-button>
        <el-button @click="showCompanySuccess" v-if="showCompanyType==='audit'">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import { list } from "../../common";
export default {
  mixins: [list],
  data() {
    return {
      statusList: [],
      auditStatusList: [],
      refuseReasonList: [],
      company: {},
      showCompany: false,
      auditStatus: "1",
      refuseReason: "",
      showCompanyType: "show",
      toolData: [{ name: "搜索" }],
      baseDataSource: [
        [
          { key: "companyId", name: "ID" },
          { key: "companyName", name: "企业名称" },
          { key: "phone", name: "申请人号码" },
          { key: "checkStatusShow", name: "申请状态" },
          { key: "applyAddress", name: "申请城市" },
          { key: "checkDate", name: "审核时间" },
          { key: "checkUser", name: "审核人" },
          { key: "checkReason", name: "拒绝原因" }
        ],
        [
          { key: "companyId", name: "ID" },
          { key: "companyName", name: "企业名称" },
          { key: "phone", name: "申请人号码" },
          { key: "checkStatusShow", name: "申请状态" },
          { key: "applyAddress", name: "申请城市" },
          { key: "checkDate", name: "审核时间" },
          { key: "checkUser", name: "审核人" },
          {
            name: "操作",
            type: "operation",
            data: [{ name: "查看" }]
          }
        ],
        [
          { key: "companyId", name: "ID" },
          { key: "companyName", name: "企业名称" },
          { key: "phone", name: "申请人号码" },
          { key: "checkStatusShow", name: "申请状态" },
          { key: "applyAddress", name: "申请城市" },
          {
            name: "操作",
            type: "operation",
            data: [{ name: "查看" }, { name: "审核" }]
          }
        ]
      ]
    };
  },
  created() {
    this.baseData = this.baseDataSource[1];
    this.statusList = [
      {
        label: "全部",
        value: ""
      },
      {
        label: "待审核",
        value: "2"
      },
      {
        label: "通过",
        value: "1"
      },
      {
        label: "拒绝",
        value: "0"
      }
    ];
    this.auditStatusList = [
      {
        label: "通过",
        value: "1"
      },
      {
        label: "拒绝",
        value: "0"
      }
    ];
    this.refuseReasonList = [
      "营业执照与企业全称不符",
      "非营业执照",
      "营业执照不完整",
      "营业执照不清晰",
      "营业执照未加公章",
      "不明原因，请联络客服"
    ];
    this.getData(1);
  },
  methods: {
    getData(page) {
      this.params.page = page ? page : this.params.page;
      this.params.order = "desc";
      this.loading();
      this.post(this.api.getAuditCompanyList, this.params, data => {
        data.data.forEach(item => {
          let status;
          switch (item.checkStatus) {
            case 0:
              status = "拒绝";
              break;
            case 1:
              status = "通过";
              break;
            case 2:
              status = "待审核";
              break;
            case 3:
              status = "未提交";
              break;
            default:
              status = "未知";
          }
          item.checkStatusShow = status;
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
      switch (index) {
        case 0:
          this.showCompanyType = "show";
          this.company = this.dataSource[rowId];
          this.showCompany = true;
          break;
        case 1:
          this.showCompanyType = "audit";
          this.company = this.dataSource[rowId];
          this.showCompany = true;
          this.auditStatus = "1";
          this.refuseReason = "";
          break;
      }
    },
    showCompanySuccess() {
      if (this.auditStatus === "0" && this.isEmpty(this.refuseReason)) {
        this.$message.error("请选择拒绝原因");
        return;
      }
      let params = {
        companyId: this.company.companyId,
        pass: this.auditStatus === "1",
        reason: this.refuseReason,
        userName: this.$store.getters.systemAccount.username
      };
      this.post(this.api.auditNewCompany, params, () => {
        this.$message.success("审核成功");
        this.showCompany = false;
        this.getData();
      });
    },
    statusChange(value) {
      if (!this.isEmpty(value)) {
        this.baseData = this.baseDataSource[parseInt(value)];
      } else {
        this.baseData = this.baseDataSource[1];
      }
      this.getData(0);
    }
  }
};
</script>
<style scoped lang="less">
.dialog_item {
  margin: 10px 0;
}
.el-tooltip__popper.is-dark {
  width: 300px;
  height: 400px;
}
</style>
