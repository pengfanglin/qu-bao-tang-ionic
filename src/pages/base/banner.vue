<template>
  <div class="root">
    <bread title="轮播图"/>
    <toolbar :toolData="toolData" @toolClick="toolClick"/>
    <list v-bind="$data" @goPage="goPage" @sizeChange="sizeChange" @operationClick="operationClick"/>
    <el-dialog :title="isEmpty(banner)?'添加轮播图':'修改轮播图'" :visible.sync="showDialog" width="500px" class="center">
      <el-upload
          class="center"
          :action="uploadPath"
          :show-file-list="false"
          :multiple="false"
          accept="image/*"
          name="image"
          :data="{type:'banner'}"
          :before-upload="beforeBannerUpload"
          :on-success="handleBannerSuccess">
        <img
            @error="imgError"
            :src="isEmpty(banner.img)?require('../../assets/images/common/add.jpg'):banner.img"
            style="width:100px;height:100px;border-radius:100%;">
      </el-upload>
      <el-form ref="form" :rules="rules" :model="banner" label-width="80px" style="margin:0 30px;">
        <el-form-item label="跳转链接" prop="url">
          <el-input v-model="banner.url"></el-input>
        </el-form-item>
        <el-form-item label="权重">
          <el-input v-model="banner.sort"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button @click="dialogSuccess">确 定</el-button>
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
        toolData: [{name: '搜索'}, {name: '添加'}],
        banner: {},
        showDialog: false,
        rules: {
          url: [
            {required: true, message: '请输入跳转链接', trigger: 'blur'},
            {min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this.baseData = [
        {key: 'img', name: '图片', type: 'img'},
        {key: 'url', name: '跳转链接'},
        {key: 'sort', name: '权重'},
        {key: 'createTime', name: '创建时间'},
        {
          name: '操作',
          type: 'operation',
          data: [
            {name: '修改'},
            {name: '删除', type: 'confirm', color: 'danger'}
          ]
        }
      ];
      this.getData(1);
    },
    methods: {
      getData(page) {
        this.params.page = page ? page : this.params.page;
        this.loading();
        this.post(this.api.getAdminBannerList, this.params, (data) => {
          data.data.forEach(item => {
            item.img = this.imgUrl + item.img;
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
          case 1:
            this.banner = {};
            this.showDialog = true;
            break;
        }
      },
      operationClick(index, rowId) {
        switch (index) {
          case 0:
            this.banner = this.dataSource[rowId];
            this.showDialog = true;
            break;
          case 1:
            this.post(this.api.deleteBanner, {
              id: this.dataSource[rowId].id
            }, () => {
              this.$message.success('删除成功');
              this.getData();
            });
            break;
        }
      },
      dialogSuccess() {
        this.$refs.form.validate(valid => {
          if (valid) {
            let params = {};
            params.img = this.banner.img.replace(this.imgUrl, '');
            params.sort = this.banner.sort;
            params.url = this.banner.url;
            if (this.isEmpty(this.banner.id)) {
              this.post(this.api.insertBanner, params, () => {
                this.$message.success('添加成功');
                this.showDialog = false;
                this.getData();
              });
            } else {
              params.id = this.banner.id;
              this.post(this.api.updateBanner, params, () => {
                this.$message.success('修改成功');
                this.showDialog = false;
                this.getData();
              });
            }
          }
        });
      },
      imgError(e) {
        e.target.src = this.defaultImg;
      },
      handleBannerSuccess(res) {
        if (res.code === 200) {
          this.$set(this.banner, 'img', this.imgUrl + res.data);
        } else {
          this.$message.error('上传失败');
        }
      },
      beforeBannerUpload(file) {
        if (file.type.indexOf('image') === -1) {
          this.$message.error('头像只能是图片!');
          return false;
        }
        if (file.size / 1024 / 1024 > 1) {
          this.$message.error('头像不能大于1M!');
          return false;
        }
        return true;
      },
    }
  }
</script>
<style scoped lang="less">

</style>
