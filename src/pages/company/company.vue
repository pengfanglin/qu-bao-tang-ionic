<template>
  <div class="root">
    <bread title="企业管理"/>
    <div class="search_content">
      <my-input title="企业名称" v-model="params.companyName"/>
    </div>
    <toolbar :toolData="toolData" @toolClick="toolClick"/>
    <div class="content">
      <div v-for="(company,index) in dataSource">
        <div class="top box_start">
          <img class="logo" :src="imgUrl+company.companyLogo" @error="logoError">
          <div class="top_content">
            <h1>{{company.companyName}}</h1>
            <h2>{{company.checkDate}}</h2>
            <h3>{{isEmpty(company.simpleName)?'无':company.simpleName}}</h3>
          </div>
        </div>
        <div class="box_between count">
          <div class="box_start_column center">
            <h1>在架数</h1>
            <h2>{{company.online}}</h2>
          </div>
          <div class="box_start_column center">
            <h1>下架数</h1>
            <h2>{{company.inline}}</h2>
          </div>
          <div class="box_start_column center">
            <h1>删除数</h1>
            <h2>{{company.delete}}</h2>
          </div>
        </div>
        <div class="license">
          <img :src="imgUrl+company.licenseUrl" v-if="!isEmpty(company.licenseUrl)"
               @click="changeBig(company.licenseUrl)" @error="licenseError" width="100" height="60">
          <h1 v-else>营业执照未上传</h1>
        </div>
        <div class="buttons box_between">
          <el-button type="primary" plain :disabled=!isEmpty(company.vipLevel) @click="openMember(company.companyId)">
            开通会员
          </el-button>
          <el-button type="primary" plain v-if="!company.black" @click="blackCompany(true,company.companyId)">拉黑
          </el-button>
          <el-button type="primary" plain v-else @click="blackCompany(false,company.companyId)">取消拉黑</el-button>
        </div>
      </div>
    </div>
    <el-pagination
        class="page center"
        @current-change="goPage"
        :current-page="params.page"
        :page-sizes="[2,10,50,100,200,500]"
        :page-size="params.limit"
        @size-change="sizeChange"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        :background="true"
        :pager-count="15"></el-pagination>
    <img v-if="isClick" :src="imgUrl+img" @click="changeSmall" @error="licenseError" class="imgClick">
  </div>
</template>
<script type="text/ecmascript-6">
  import {list} from '../../common'
  export default {
    mixins: [list],
    data() {
      return {
        showCompany: false,
        isClick: false,
        img: '',
        toolData: [{name: '搜索'}]
      }
    },
    created() {
      this.getData(1);
    },
    methods: {
      getData(page) {
        this.params.page = page ? page : this.params.page;
        this.loading();
        this.post(this.api.getCompanyList, this.params, (data) => {
          data.data.forEach(item => {

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
      logoError(e) {
        e.target.src = require('../../assets/images/company_logo.png');
      },
      licenseError(e) {
        e.target.src = require('../../assets/images/company_logo.png');
      },
      openMember(companyId) {
        let params = {
          companyId: companyId,
          userId: 1,
          startTime: this.getCurrentTime(),
          endTime: '2019-08-11 00:00:00'
        };
        this.post(this.api.adminOpenMember, params, () => {
          this.$message.success('开通成功');
          this.getData();
        });
      },
      blackCompany(type, companyId) {
        this.post(type ? this.api.blackCompany : this.api.cancelBlackCompany, {
          companyId: companyId
        }, (data) => {
          this.$message.success(data);
          this.getData();
        })
      },
      changeBig(licenseUrl) {
        this.img = licenseUrl;
        this.isClick = !this.isClick;
      },
      changeSmall(e) {
        this.isClick = !this.isClick;
      }
    }
  }
</script>
<style scoped lang="less">
  .content {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;

    > div {
      background-color: #fff;
      width: 300px;
      height: 300px;
      margin: 10px 10px;
      border-radius: 10px;
      overflow: hidden;

      .top {
        padding: 10px 0;
        border-bottom: 1px solid #545c64;

        .logo {
          width: 50px;
          height: 50px;
          border-radius: 100%;
          margin: 0 10px;
        }

        .top_content {
          margin-right: 10px;

          h1 {
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: bold;
          }

          h3 {
            color: #aaa;
          }
        }
      }

      > .count {
        margin: 10px 10px;

        .center {
          h2 {
            margin: 10px 0;
            font-weight: bold;
            color: #999;
          }
        }
      }

      > .license {
        cursor: pointer;

        h1 {
          height: 40px;
        }
      }

      .buttons {
        margin: 10px 20px;
      }
    }
  }

  .imgClick {
    cursor: pointer;
    width: 800px;
    height: 800px;
    border: 1px #2d6da3 solid;
    border-radius: 5px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
  }
</style>
