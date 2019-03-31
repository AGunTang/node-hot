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
        <el-input
          placeholder="请输入内容"
          @keyup.native.enter="search"
          v-model="pageData.query"
          class="input-with-select"
        >
          <el-button slot="append" @click="search" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="7">
        <el-button type="success" @click="addUser=true" plain>添加用户</el-button>
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
          <el-switch
            @change="updata(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
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
          <el-button type="danger" @click="delUser(scope.row)" size="mini" plain icon="el-icon-delete" circle></el-button>
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

    <!-- 新增用户弹框 -->
    <el-dialog title="提示" :visible.sync="addUser" width="30%" :before-close="handleClose">
      <el-form
        :model="addForm"
        :rules="rules"
        ref="addForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="addUser = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
          <el-button @click="resetForm('addForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 编辑用户弹框 -->
    <el-dialog title="提示" :visible.sync="editUser" width="30%">
      <el-form :model="editForm" ref="editForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="editUser = false">取 消</el-button>
          <el-button type="primary" @click="addEditForm('editForm')">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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
      //是否显示新增用户表单
      addUser: false,
      // 新增用户
      addForm: {
        username: "张三",
        password: "123456",
        email: "",
        mobile: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      },
      //编辑弹框
      editUser: false,
      //编辑用户数据
      editForm: {
        username: "",
        email: "",
        mobile: "",
        id:'',
      }
    };
  },
  methods: {
    handleEdit(index, row) {
      //开启编辑弹框
      this.editUser = true;
      console.log(row);

      this.editForm.username = row.username;
      this.editForm.email = row.email;
      this.editForm.mobile = row.mobile;
      this.editForm.id = row.id;
    },
    //编辑更新用户资料
    addEditForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //关闭窗口
          this.editUser = false;
          //发送请求
          let res = await this.$axios.put(`users/${this.editForm.id}`,{
            id:this.editForm.id,
            email:this.editForm.email,
            mobile:this.editForm.mobile
          } );
          console.log(res);
          //判断响应状态
          if (res.data.meta.status == 200) {
            //重新渲染页面
            this.search();
          } else {
            this.$message.error(res.data.meta.msg);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async search() {
      //渲染用户列表
      let res = await this.$axios.get("users", {
        params: this.pageData
      });
      this.userList = res.data.data.users;
    },
    async updata(row) {
      let res = await this.$axios.put(`users/${row.id}/state/${row.mg_state}`);
    },
    //添加用户
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //关闭窗口
          this.addUser = false;
          //发送请求
          let res = await this.$axios.post("users", this.addForm);
          console.log(res);
          //判断响应状态
          if (res.data.meta.status == 201) {
            //重新渲染页面
            this.search();
          } else {
            this.$message.error(res.data.meta.msg);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //删除用户
    async delUser(row){
      let res = await this.$axios.delete(`users/${row.id}`)
      console.log(res);
      if(res.data.meta.status==200){
        //刷新页面
        this.search()
      } else {
        this.$message.error(res.data.meta.msg);
      }

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
