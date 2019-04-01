<template>
  <div>
    <!-- 面包屑 -->
      <bread sectitle="商品管理" threetitle="商品列表"></bread>
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
        <el-button type="success" @click="addUser=true" plain>添加商品</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="userList" border style="width: 100%">
      <el-table-column type="index" label="#" width="180"></el-table-column>
      <el-table-column prop="username" label="商品名称" width="180"></el-table-column>
      <el-table-column prop="email" label="商品价格（元）" width="180"></el-table-column>
      <el-table-column prop="mobile" label="商品重量" width="180"></el-table-column>
      <el-table-column prop="mg_state" label="创建时间" width="180">
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
          <el-button
            type="danger"
            @click="delUser(scope.row)"
            size="mini"
            plain
            icon="el-icon-delete"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 页码 -->
    <el-pagination
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="sizeChange"
      @current-change="currentChange"
    ></el-pagination>

    <!-- 新增用户弹框 -->
    <el-dialog title="新增用户" :visible.sync="addUser" width="30%" :before-close="handleClose">
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
    <el-dialog title="编辑用户" :visible.sync="editUser" width="30%">
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

    <!-- 编辑用户权限弹框 -->
    <el-dialog title="权限设置" :visible.sync="roleUser" width="30%">
      <el-form :model="roleRow" ref="roleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="当前用户" prop="username">{{roleRow.username}}</el-form-item>
        <el-form-item label="请选择角色">
          <el-select v-model="roleRow.role_name" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.roleDesc"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button @click="roleUser = false">取 消</el-button>
          <el-button type="primary" @click="roleEditForm('roleForm')">确 定</el-button>
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
        id: ""
      },
      //编辑用户权限id
      roleRow: {},
      //权限修改是否弹框
      roleUser: false,
      roleForm: {},
      //权限列表
      roleList: []
    };
  },
  methods: {
    //分页功能
    async sizeChange(size) {
      this.pageData.pagesize = size;
      this.search();
    },
    async currentChange(current) {
      this.pageData.pagenum = current;
      this.search();
    },
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
          let res = await this.$axios.put(`users/${this.editForm.id}`, {
            id: this.editForm.id,
            email: this.editForm.email,
            mobile: this.editForm.mobile
          });
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
      this.total = res.data.data.total;
      this.pageData.pagenum = res.data.data.pagenum;
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
    async delUser(row) {
      let res = await this.$axios.delete(`users/${row.id}`);
      console.log(res);
      if (res.data.meta.status == 200) {
        //刷新页面
        this.search();
      } else {
        this.$message.error(res.data.meta.msg);
      }
    },
    //用户权限编辑
    async upRoleUser(row) {
      console.log(row);
      //开启弹框
      this.roleUser = true;
      //绑定用户id
      this.roleRow = row;
      //查询权限列表
      let res = await this.$axios.get("roles");
      this.roleList = res.data.data;
    },
    //权限修改提交
    async roleEditForm(formName) {
      // 关闭窗口
      this.roleUser = false;
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //判断是否修改
          if (typeof this.roleRow.role_name == "number") {
            let res = await this.$axios.put(`users/${this.roleRow.id}/role`, {
              rid: this.roleRow.role_name
            });
            // 刷新页面
            this.search();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  created() {
    this.search();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>

</style>
