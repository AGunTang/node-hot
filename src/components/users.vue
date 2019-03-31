<template>
  <div>
    <!-- 面包屑 -->
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 输入框 -->

    <el-row>
      <el-col :span="7">
        <el-input placeholder="请输入内容" @keyup.native.enter="search" v-model="pageData.query" class="input-with-select">
          <el-button slot="append" @click="search" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="7">
        <el-button type="success" plain disabled>成功按钮</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="userList" border style="width: 100%">
      <el-table-column type="index" label="#" width="180"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
      <el-table-column prop="mg_state" label="用户状态" width="180">
        <template slot-scope="scope">
          <el-switch @change="updata(scope.row)" v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="mobile" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
            plain
            icon="el-icon-edit"
            circle
          ></el-button>
          <el-button type="danger" size="mini" plain icon="el-icon-delete" circle></el-button>
          <el-button type="warning" size="mini" plain icon="el-icon-check" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 页码 -->
    <el-pagination
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "users",
  data() {
    return {
      total: 0,
      pageData: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      userList: [],
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index);
      console.log(row);
    },
    async search() {
      //渲染用户列表
      let res = await this.$axios.get("users", {
        params: this.pageData,

      });
      console.log(res);
      this.userList = res.data.data.users;
    },
    async updata(row){
      let res = await this.$axios.put(`users/${row.id}/state/${row.mg_state}`)
      console.log(res);
      
    }
  },
  created() {
    this.search();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.breadcrumb {
  height: 50px;
  background-color: #d3dce6;
  line-height: 50px;
  padding-left: 15px;
}
</style>
