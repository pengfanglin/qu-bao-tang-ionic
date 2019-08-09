<template>
  <div class="root">
    <bread title="企业"/>
    <div class="search_content">
      <my-input title="名称" v-model="params.name"></my-input>
    </div>
    <toolbar :toolData="toolData" @toolClick="toolClick"/>
    <list v-bind="$data" @operationClick="operationClick" @check="check" @goPage="goPage" @sizeChange="sizeChange"/>
    <el-dialog :title="type==='insert'?'添加企业':'修改企业'" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :rules="rules" :model="company" label-width="80px" style="width:80%;">
        <el-form-item label="名称" prop="name">
          <el-input v-model="company.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import {list} from '../../common'
  export default {
    mixins: [list],
    data() {
      return {
        dialogVisible: false,
        company: {},
        type: 'insert',
        toolData: [{name: '搜索'}, {name: '添加'},{name:'导出'}],
        rules: {
          name: [
            {required: true, message: '请输入企业名称', trigger: 'blur'},
            {min: 1, max: 20, message: '长度在 1 到 50 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this.getData(1);
      this.baseData = [
        {key: 'id', name: 'ID'},
        {key: 'name', name: '企业名称'},
        {key: 'visitCount', name: '访问人数'},
        {key: 'registerUserCount', name: '注册用户数'},
        {key: 'registerCompanyCount', name: '注册企业数'},
        {key: 'createTime', name: '创建时间'},
        {key: 'updateTime', name: '修改时间'},
        {
          name: '操作',
          type: 'operation',
          data: [
            {name: '推荐码'},
            {name: '重新生成'},
            {name: '修改'},
            {name: '删除', type: 'confirm', color: 'danger', message: '确定删除？'}
          ]
        },
      ];
    },
    methods: {
      getData(page) {
        this.params.page = page ? page : this.params.page;
        this.loading();
        this.post(1, 'system/companyList', this.params, true);
      },
      doSuccess(index, data) {
        switch (index) {
          case 1:
            this.dataSource = data.data;
            this.total = data.total;
            break;
          case 2:
            this.$message.success('操作成功');
            this.getData();
            this.dialogVisible = false;
            break;
          case 3:
            this.$message.success('生成成功');
            let name = data.substring(data.lastIndexOf('.'), data.length);
            this.download(this.homeUrl + data, '小程序码' + name);
            this.getData();
            break;
        }
      },
      operationClick(index, rowId) {
        switch (index) {
          case 0:
            let code = this.dataSource[rowId].code;
            if (this.isEmpty(code)) {
              this.post(3, 'system/createCode', {
                companyId: this.dataSource[rowId].id
              });
            }
            let name = code.substring(code.lastIndexOf('.'), code.length);
            this.download(this.homeUrl + code, '小程序码' + name);
            break;
          case 1:
            this.post(3, 'system/createCode', {
              companyId: this.dataSource[rowId].id
            });
            break;
          case 2:
            this.type = 'update';
            this.dialogVisible = true;
            this.company = this.dataSource[rowId];
            break;
          case 3:
            this.post(2, 'system/deleteCompany', {companyId: this.dataSource[rowId].id});
            break;
        }
      },
      toolClick(index) {
        switch (index) {
          case 0:
            this.getData(1);
            break;
          case 1:
            this.company = {};
            this.type = 'insert';
            this.dialogVisible = true;
            break;
          case 2:
            this.postStream(4,'system/exportRecommendCompanyExcel',this.params);
            break;
        }
      },
      dialogClick() {
        this.$refs.form.validate(valid => {
          if (valid) {
            let params = {};
            params.name = this.company.name;
            if (this.isEmpty(this.company.id)) {
              this.post(2, 'system/insertCompany', params);
            } else {
              params.id = this.company.id;
              this.post(2, 'system/updateCompany', params);
            }
          }
        });
      }
    }
  }
</script>
<style scoped>

</style>
